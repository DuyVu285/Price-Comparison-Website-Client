import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ImagesService } from 'src/app/services/api/images.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: any;
  imageUrl: any;
  lowestPrice: number | undefined;

  constructor(
    private router: Router,
    private readonly imagesService: ImagesService
  ) {}

  ngOnInit(): void {
    this.loadImage(this.product.imageId);
    if (this.product?.prices) {
      this.lowestPrice = this.getLowestPrice(this.product.prices);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  getLowestPrice(prices: { key: string; value: number }[]): number {
    return Math.min(...prices.map((price) => price.value));
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

  ngOnDestroy(): void {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }
}
