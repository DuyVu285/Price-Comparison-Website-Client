import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ModelsService } from 'src/app/services/api/models.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css'],
})
export class AddModelComponent {
  @Output() modelAdded: EventEmitter<void> = new EventEmitter<void>();

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
    private fb: FormBuilder,
    private notification: NzNotificationService
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
    console.log(this.validateForm.value);
    if (this.validateForm.valid) {
      this.modelsService.createModel(this.validateForm.value).subscribe({
        next: (response) => {
          console.log('Model created:', response);
          this.showNotification('Success', 'Model created');
          this.modelAdded.emit();
          this.validateForm.reset();
          this.isModalVisible = false;
        },
        error: (err) => {console.error('HTTP Error:', err),
          this.showNotification('Error', 'Model creation failed');
        },

      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }

  showNotification(title: string, content: string): void {
    this.notification.blank(title, content).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }
}
