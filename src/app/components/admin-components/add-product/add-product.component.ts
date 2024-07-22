import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ProductsService } from 'src/app/services/api/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  @Output() productAdded: EventEmitter<void> = new EventEmitter<void>();
  validateForm: FormGroup;
  isModalVisible = false;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null | undefined;

  constructor(
    private readonly productsService: ProductsService,
    private fb: FormBuilder
  ) {
    this.validateForm = this.fb.group({
      productName: ['', [Validators.required]],
      description: this.fb.array([this.createDescriptionControl()]),
      productCode: ['', [Validators.required]],
      modelType: this.fb.group({
        brand: ['', [Validators.required]],
        series: ['', [Validators.required]],
        line: [''],
      }),
      prices: this.fb.array([this.createPriceGroup()]),
      imageId: [''],
    });
  }

  createDescriptionControl(): FormControl {
    return this.fb.control('', [Validators.required]);
  }

  createPriceGroup(): FormGroup {
    return this.fb.group({
      key: ['', [Validators.required, Validators.pattern(/https?:\/\/[^\s]+/)]],
      value: ['', [Validators.required]],
    });
  }

  get description() {
    return this.validateForm.get('description') as FormArray;
  }

  addDescription(): void {
    this.description.push(this.createDescriptionControl());
  }

  removeDescription(index: number): void {
    this.description.removeAt(index);
  }

  get prices() {
    return this.validateForm.get('prices') as FormArray;
  }

  addPrice(): void {
    this.prices.push(this.createPriceGroup());
  }

  removePrice(index: number): void {
    this.prices.removeAt(index);
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  handleModalSubmit(): void {
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      this.isModalVisible = false;
    } else {
      this.validateForm.markAllAsTouched();
    }
  }

  handleModalCancel(): void {
    this.isModalVisible = false;
  }

  onSubmit(): void {
    if (this.validateForm.valid) {
      const formData = new FormData();
      formData.append('product', JSON.stringify(this.validateForm.value));
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }
      this.productsService.createProduct(formData).subscribe({
        next: (response) => {
          console.log('Product created:', response);
          this.productAdded.emit();
          this.validateForm.reset();
          this.imagePreview = null;
          this.isModalVisible = false;
        },
        error: (err) => console.error('HTTP Error:', err),
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result; // Set image preview
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }
}
