import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css'],
})
export class UsersDashboardComponent {
  editCache: {
    [key: string]: {
      edit: boolean;
      data: any;
    };
  } = {};
  users: any[] = [];
  displayedUsers: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  searchValue = '';
  visible = false;

  constructor(
    private readonly usersService: UsersService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        this.updateEditCache();
        this.updateDisplayedUsers();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  onUserAdded() {
    this.getUsers();
  }

  updateEditCache(): void {
    this.users.forEach((item) => {
      this.editCache[item._id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  updateDisplayedUsers(): void {
    this.displayedUsers = this.users.slice(
      (this.pageIndex - 1) * this.pageSize,
      this.pageIndex * this.pageSize
    );
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  saveEdit(id: string): void {
    const index = this.users.findIndex((item) => item._id === id);
    if (
      JSON.stringify(this.users[index]) !==
      JSON.stringify(this.editCache[id].data)
    ) {
      Object.assign(this.users[index], this.editCache[id].data);
      this.usersService.updateUser(id, this.users[index]).subscribe({
        next: () => {
          this.showNotification('Success', 'User updated');
          this.editCache[id].edit = false;
          this.updateDisplayedUsers();
        },
      });
    } else {
      this.editCache[id].edit = false;
    }
  }

  cancelEdit(id: string): void {
    const index = this.users.findIndex((item) => item._id === id);
    this.editCache[id] = {
      data: { ...this.users[index] },
      edit: false,
    };
    this.updateDisplayedUsers();
  }

  deleteRow(id: string): void {
    this.users = this.users.filter((item) => item._id !== id);
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.showNotification('Success', 'User deleted');
        delete this.editCache[id];
        this.updateDisplayedUsers();
      },
    });
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateDisplayedUsers();
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    if (this.searchValue) {
      const filteredUsers = this.users.filter(
        (item) =>
          item.username &&
          item.username
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase()) !== -1
      );
      this.displayedUsers = filteredUsers.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    } else {
      this.updateDisplayedUsers();
    }
  }

  showNotification(title: string, content: string): void {
    this.notification.blank(title, content).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }
}
