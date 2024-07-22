import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { UsersService } from 'src/app/services/api/users.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private usersService: UsersService,
    private router: Router,
    private notification: NzNotificationService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.loadRememberedCredentials();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const { userName, password, remember } = this.validateForm.value;

      this.usersService
        .login(userName || '', password || '')
        .pipe(
          tap((response: any) => {
            if (response) {
              this.createNotification('success', 'Success', 'Login successful');
              localStorage.setItem('access_token', response.access_token);
              localStorage.setItem('isLoggedIn', 'true');
              const decodedToken = this.usersService.decodeToken(
                response.access_token
              );
              localStorage.setItem('role', decodedToken.isAdmin);
              localStorage.setItem('username', decodedToken.username);
              localStorage.setItem('userId', decodedToken.userId);
              localStorage.setItem(
                'bookmarks',
                JSON.stringify(decodedToken.bookmarks)
              );
              console.log(decodedToken);
              if (remember) {
                localStorage.setItem('userName', userName || '');
                localStorage.setItem('password', password || '');
              } else {
                localStorage.removeItem('userName');
                localStorage.removeItem('password');
              }

              history.back();
            }
          }),
          catchError((error) => {
            this.createNotification('error', 'Error', 'Login failed');
            console.error('Login failed', error);
            return of(null);
          })
        )
        .subscribe();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  private loadRememberedCredentials(): void {
    const userName = localStorage.getItem('userName');
    const password = localStorage.getItem('password');

    if (userName && password) {
      this.validateForm.patchValue({
        userName,
        password,
        remember: true,
      });
    }
  }

  createNotification(type: string, title: string, content: string): void {
    this.notification.create(type, title, content, {
      nzPlacement: 'bottomRight',
    });
  }
}
