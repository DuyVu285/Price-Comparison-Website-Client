import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ImagesService } from 'src/app/services/api/images.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
})
export class FeaturedProductsComponent implements OnChanges {
  @Input() products: any[] = [];
  imagesUrl: { [key: string]: string } = {};

  constructor(private readonly imagesService: ImagesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && changes['products'].currentValue) {
      console.log('Featured products updated:', this.products);
      this.loadAllImages();
    }
    console.log('Featured Images:', this.imagesUrl);
  }

  loadAllImages(): void {
    this.products.forEach((product) => {
      this.loadImages(product.imageId);
    });
  }

  loadImages(imageId: string): void {
    this.imagesService.getImageById(imageId).subscribe(
      (blob) => {
        const imageUrl = URL.createObjectURL(blob);
        this.imagesUrl[imageId] = imageUrl;
      },
      (error) => {
        console.error('Failed to load image for product:', imageId, error);
      }
    );
  }
}
