import { Component, Input, SimpleChanges } from '@angular/core';
import { ImagesService } from 'src/app/services/api/images.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  @Input() product: any;
  imageUrl: any;

  constructor(private readonly imagesService: ImagesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      // Product has received new data
      console.log('Product data received:', this.product);

      // Load image if product has an imageId
      if (this.product.imageId) {
        this.loadImage(this.product.imageId);
      }
    }
  }

  loadImage(imageId: string): void {
    this.imagesService.getImageById(imageId).subscribe(
      (blob) => {
        this.imageUrl = URL.createObjectURL(blob);
        console.log(this.imageUrl);
      },
      (error) => {
        console.error('Error loading image', error);
      }
    );
  }

  ScrollIntoView(divId: string) {
    console.log(divId);
    let element = document.getElementById(divId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnDestroy(): void {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }
}
