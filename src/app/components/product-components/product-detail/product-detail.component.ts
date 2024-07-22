import { Component, Input, SimpleChanges } from '@angular/core';
import { ImagesService } from 'src/app/services/api/images.service';
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

  constructor(
    private readonly imagesService: ImagesService,
    private recentlyViewedProductsService: RecentlyViewedProductsService
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

  getLowestPrice(prices: { key: string; value: number }[]): number {
    return Math.min(...prices.map((price) => price.value));
  }

  findBestPrice(): void {
    if (this.product?.prices) {
      this.bestPrice = this.product.prices.reduce(
        (prev: { value: number }, current: { value: number }) =>
          prev.value < current.value ? prev : current
      );
      this.bestWebsiteName = this.extractWebsiteName(this.bestPrice?.key || '');
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

  ngOnDestroy(): void {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }
}
