import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/api/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  topExpensiveProducts: any[] = [];

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (data: any) => {
        console.log('Get successfully', data);
        this.products = data;
        this.findTheMostExpensive();
      },
      error: (error: HttpErrorResponse) => {
        console.log('Get failed', error);
      },
    });
  }

  findTheMostExpensive() {
    const sortedProducts = this.products
      .map((product) => {
        const maxPrice = Math.max(
          ...product.prices.map((price: any) => price.value)
        );
        return { ...product, maxPrice };
      })
      .sort((a, b) => b.maxPrice - a.maxPrice)
      .slice(0, 4);

    this.topExpensiveProducts = sortedProducts;
    console.log('Most expensive products:', this.topExpensiveProducts);
  }
}
