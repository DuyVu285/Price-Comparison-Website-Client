import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/api/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.getProductById(productId);
      }
    });
  }

  getProductById(productId: string) {
    this.productsService.getProductById(productId).subscribe({
      next: (data: any) => {
        console.log('Get successfully', data);
        this.product = data;
      },
      error: (error: any) => {
        console.log('Get failed', error);
      },
    });
  }
}
