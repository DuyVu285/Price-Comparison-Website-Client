import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ModelsService } from 'src/app/services/api/models.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css'],
})
export class AddModelComponent {
  validateForm: FormGroup<{
    brand: FormControl<string | null>;
    series: FormControl<string | null>;
    line: FormControl<string | null>;
  }> = this.fb.group({
    brand: ['', [Validators.required]],
    series: ['', [Validators.required]],
    line: [''],
  });
  isModalVisible = false;

  constructor(
    private readonly modelsService: ModelsService,
    private fb: FormBuilder
  ) {}

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
      this.modelsService.createModel(this.validateForm.value).subscribe({
        next: (response) => console.log('Model created:', response),
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
