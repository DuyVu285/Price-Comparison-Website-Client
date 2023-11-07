import { Component } from '@angular/core';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.css']
})
export class ProductsListingComponent {
  products = [
    "Product 1",
    "Product 2",
    "Product 3",
    "Product 4",
    "Product 5",
    "Product 6",
    "Product 7",
    "Product 8",
    "Product 9",
    "Product 10",
    "Product 11",
  ];

  productsToDisplay: string[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  totalIndex = (this.products.length / this.itemsPerPage) * 10;

  ngOnInit() {
    this.loadProducts();
  }

  onPageChange(newPageIndex: number) {
    this.currentPage = newPageIndex;
    this.loadProducts();
  }

  loadProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.productsToDisplay = this.products.slice(startIndex, endIndex);
  }
}
