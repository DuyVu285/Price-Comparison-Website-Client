import { Component, Input, SimpleChanges } from '@angular/core';
import { ProductsService } from 'src/app/services/api/products.service';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css'],
})
export class SimilarProductsComponent {
  @Input() product: any;
  similarProducts: any[] = [];

  constructor(private readonly productsService: ProductsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      console.log('Product data received:', this.product);

      this.getSimilarProducts(this.product?.productName);
    }
  }

  getSimilarProducts(productName: string) {
    this.productsService.searchSimilarProducts(productName).subscribe({
      next: (data) => {
        console.log('Get successfully', data);
        this.similarProducts = data;
      },
      error: (error) => {
        console.log('Get failed', error);
      },
    });
  }
}
