import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductsService } from 'src/app/services/api/products.service';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-profile-bookmarks',
  templateUrl: './profile-bookmarks.component.html',
  styleUrls: ['./profile-bookmarks.component.css'],
})
export class ProfileBookmarksComponent implements OnInit {
  bookmarks: { bookmark: string }[] = [];
  products: any[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
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
        this.bookmarks = data.bookmarks;
        this.getProducts();
      },
      error: (error: any) => {
        console.log('Get profile failed', error);
      },
    });
  }

  getProducts() {
    console.log(this.bookmarks);
    if (this.bookmarks.length === 0) {
      this.products = [];
      return;
    }

    const productPromises = this.bookmarks.map((bookmark) =>
      this.productsService.getProductById(bookmark.bookmark).toPromise()
    );

    Promise.all(productPromises)
      .then((products) => {
        this.products = products;
        console.log(this.products);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  }

  removeBookmark(bookmarkId: string) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.showNotification('Error', 'User not logged in');
      return;
    }

    this.usersService.deleteBookmark(bookmarkId, userId).subscribe({
      next: () => {
        this.bookmarks = this.bookmarks.filter(
          (b) => b.bookmark !== bookmarkId
        );
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
        this.showNotification('Success', 'Bookmark deleted successfully');
        this.getProducts();
      },
      error: (error) => {
        this.showNotification('Error', 'Failed to delete bookmark');
        console.error('Delete bookmark failed', error);
      },
    });
  }

  showNotification(title: string, content: string): void {
    this.notification.blank(title, content).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }
}
