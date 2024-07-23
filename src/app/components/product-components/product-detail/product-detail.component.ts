import { Component, Input, SimpleChanges } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ImagesService } from 'src/app/services/api/images.service';
import { UsersService } from 'src/app/services/api/users.service';
import { RecentlyViewedProductsService } from 'src/app/services/functions/recently-viewed-products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  @Input() product: any;
  imageUrl: any;
  isDisplayed = false;
  lowestPrice: number | undefined;
  websiteNames: string[] = [];
  bestPrice: { key: string; value: number } | undefined;
  bestWebsiteName: string | null | undefined;
  isBookmarked = false;
  websiteImages: { [key: string]: string } = {
    gearvn: 'gearvn.png',
    xgear: 'xgear.png',
    anphatpc: 'anphat.png',
    cellphones: 'cellphones.png',
    laptopaz: 'laptopaz.png',
  };
  constructor(
    private readonly imagesService: ImagesService,
    private recentlyViewedProductsService: RecentlyViewedProductsService,
    private readonly usersService: UsersService,
    private notification: NzNotificationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      console.log('Product data received:', this.product);

      if (this.product.imageId) {
        this.loadImage(this.product.imageId);
      }

      this.websiteNames = this.product?.prices
        .map((price: { key: string }) => this.extractWebsiteName(price.key))
        .filter((name: string | null) => name !== null) as string[];

      if (this.product.prices) {
        this.lowestPrice = this.getLowestPrice(this.product.prices);
        this.findBestPrice();
      }

      this.extractWebsiteName(this.product?.url);
      this.checkBookmark();

      if (this.product) {
        this.recentlyViewedProductsService.addProduct(this.product);
      } else {
        console.error('Invalid product object:', this.product);
      }
    }
  }

  loadImage(imageId: string): void {
    this.imagesService.getImageById(imageId).subscribe(
      (blob) => {
        this.imageUrl = URL.createObjectURL(blob);
      },
      (error) => {
        console.error('Error loading image', error);
      }
    );
  }

  getLowestPrice(prices: { key: string; value: number }[]): number | undefined {
    const validPrices = prices.filter((price) => price.value > 0);

    return validPrices.length > 0
      ? Math.min(...validPrices.map((price) => price.value))
      : undefined;
  }

  findBestPrice(): void {
    if (this.product?.prices) {
      const validPrices = this.product.prices.filter(
        (price: any) => price.value > 0
      );

      if (validPrices.length > 0) {
        this.bestPrice = validPrices.reduce(
          (prev: { value: number }, current: { value: number }) =>
            prev.value < current.value ? prev : current
        );
        this.bestWebsiteName = this.extractWebsiteName(
          this.bestPrice?.key || ''
        );
      } else {
        this.bestPrice = undefined;
        this.bestWebsiteName = 'No valid prices available';
      }
    }
  }

  ScrollIntoView(divId: string) {
    console.log(divId);
    let element = document.getElementById(divId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.isDisplayed = !this.isDisplayed;
  }

  extractWebsiteName(url: string): string | null {
    try {
      const { hostname } = new URL(url);
      const domainParts = hostname.split('.');

      if (domainParts[0] === 'www') {
        return domainParts[1];
      }

      return domainParts[0];
    } catch (e) {
      return null;
    }
  }

  getImageForWebsite(websiteName: string | null | undefined): string {
    if (!websiteName) {
      return 'assets/logo/logo.gif';
    }
    const imageFileName = this.websiteImages[websiteName];
    return imageFileName
      ? `assets/logo/${imageFileName}`
      : 'assets/logo/logo.gif';
  }

  ngOnDestroy(): void {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }

  checkBookmark() {
    const bookmarks = localStorage.getItem('bookmarks');
    if (bookmarks) {
      const parsedBookmarks = JSON.parse(bookmarks);
      this.isBookmarked = parsedBookmarks.includes(this.product._id);
    }
  }

  createBookmark(bookmark: string) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.showNotification('Error', 'User not logged in');
      return;
    }

    this.usersService.createBookmark(bookmark, userId).subscribe({
      next: (response) => {
        const existingBookmarks = JSON.parse(
          localStorage.getItem('bookmarks') || '[]'
        );

        if (!existingBookmarks.includes(bookmark)) {
          existingBookmarks.push(bookmark);

          localStorage.setItem('bookmarks', JSON.stringify(existingBookmarks));
          this.checkBookmark();
          this.showNotification('Success', 'Bookmark created successfully');
        } else {
          this.showNotification('Info', 'Bookmark already exists');
        }
      },
      error: (error) => {
        this.showNotification('Error', 'Failed to create bookmark');
        console.error('Create bookmark failed', error);
      },
    });
  }

  deleteBookmark(bookmark: string) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.showNotification('Error', 'User not logged in');
      return;
    }

    this.usersService.deleteBookmark(bookmark, userId).subscribe({
      next: () => {
        // Remove bookmark from local state and storage
        const existingBookmarks = JSON.parse(
          localStorage.getItem('bookmarks') || '[]'
        );
        const updatedBookmarks = existingBookmarks.filter(
          (b: string) => b !== bookmark
        );
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        this.checkBookmark();
        this.showNotification('Success', 'Bookmark deleted successfully');
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
