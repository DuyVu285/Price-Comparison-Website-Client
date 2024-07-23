import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  @Output() userAdded: EventEmitter<void> = new EventEmitter<void>();
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    username: FormControl<string>;
  }>;
  isModalVisible = false;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.usersService.register(this.validateForm.value).subscribe(
        (response) => {
          this.notification.create('success', 'Success', 'User created');
          console.log(response);
          this.userAdded.emit();
          this.isModalVisible = false;
          this.validateForm.reset();
        },
        (error) => {
          this.notification.create('error', 'Error', 'User creation failed');
          console.error(error);
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: NonNullableFormBuilder,
    private readonly usersService: UsersService,
    private notification: NzNotificationService,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      username: ['', [Validators.required]],
    });
  }

  createNotification(type: string, title: string, content: string): void {
    this.notification.create(type, title, content, {
      nzPlacement: 'bottomRight',
    });
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  handleModalCancel(): void {
    this.isModalVisible = false;
  }
}
