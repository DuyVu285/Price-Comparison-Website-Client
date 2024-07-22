import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ValidatorFn,
  AbstractControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent {
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    username: FormControl<string>;
  }>;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.usersService.register(this.validateForm.value).subscribe(
        (response) => {
          this.notification.create('success', 'Success', 'User created');
          console.log(response);
          this.validateForm.reset();
          this.reloadPage();
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
    this.notification.create(type, title, content);
  }

  reloadPage(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
