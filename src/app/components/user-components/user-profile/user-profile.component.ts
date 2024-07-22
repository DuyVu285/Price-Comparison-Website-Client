import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/api/users.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  profile: any;
  editCache: {
    edit: boolean;
    data: any;
  } = { edit: false, data: {} };

  constructor(
    private readonly usersService: UsersService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return;
    }
    this.usersService.getProfile(userId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.profile = data;
        this.updateEditCache();
      },
      error: (error) => {
        console.log('Get failed', error);
      },
    });
  }

  updateEditCache(): void {
    if (this.profile) {
      this.editCache = {
        edit: false,
        data: { ...this.profile },
      };
    }
  }

  startEdit(): void {
    this.editCache.edit = true;
  }

  cancelEdit(): void {
    this.updateEditCache();
  }

  saveChanges(): void {
    Object.assign(this.profile, this.editCache.data);
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.usersService.updateProfile(userId, this.profile).subscribe({
        next: () => {
          this.updateEditCache();
          this.showNotification('Success', 'Profile updated successfully');
          console.log('Profile updated');
          window.location.reload();
        },
        error: (error) => {
          console.log('Update failed', error);
        },
      });
    }
  }

  showNotification(title: string, content: string): void {
    this.notification.blank(title, content).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }
}
