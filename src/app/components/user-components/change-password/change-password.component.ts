import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private notification: NzNotificationService
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  changePassword() {
    console.log(this.changePasswordForm.value);
    if (this.changePasswordForm.invalid) {
      this.showNotification('Error', 'Please fill in all fields correctly');
      return;
    }

    if (
      this.changePasswordForm.value.newPassword !==
      this.changePasswordForm.value.confirmPassword
    ) {
      this.showNotification('Error', 'New passwords do not match');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.showNotification('Error', 'User not logged in');
      return;
    }

    this.usersService
      .changePassword(
        userId,
        this.changePasswordForm.value.currentPassword,
        this.changePasswordForm.value.newPassword
      )
      .subscribe({
        next: () => {
          this.showNotification('Success', 'Password changed successfully');
          this.changePasswordForm.reset();
        },
        error: (error: any) => {
          this.showNotification('Error', 'Failed to change password');
          console.error('Change password failed', error);
        },
      });
  }

  showNotification(title: string, content: string): void {
    this.notification.blank(title, content).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }
}
