import { Component } from '@angular/core';
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
  validateForm: FormGroup<{
    productName: FormControl<string | null>;
    description: FormArray<FormControl<string | null>>;
    productCode: FormControl<string | null>;
    modelType: FormGroup<{
      brand: FormControl<string | null>;
      series: FormControl<string | null>;
      line: FormControl<string | null>;
    }>;
    prices: FormArray<
      FormGroup<{
        key: FormControl<string | null>;
        value: FormControl<string | null>;
      }>
    >;
  }> = this.fb.group({
    productName: ['', [Validators.required]],
    description: this.fb.array([this.createDescriptionControl()]),
    productCode: ['', [Validators.required]],
    modelType: this.fb.group({
      brand: ['', [Validators.required]],
      series: ['', [Validators.required]],
      line: [''],
    }),
    prices: this.fb.array([this.createPriceGroup()]),
  });
  isModalVisible = false;

  constructor(
    private readonly productsService: ProductsService,
    private fb: FormBuilder
  ) {}

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
      this.productsService.createProduct(this.validateForm.value).subscribe({
        next: (response) => console.log('Product created:', response),
        error: (err) => console.error('HTTP Error:', err),
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }
}
