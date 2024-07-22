import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.css'],
})
export class ProductsListingComponent implements OnChanges {
  @Input() products: any[] = [];

  productsToDisplay: any[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  totalIndex = 0;

  ngOnChanges() {
    this.loadProducts();
    this.totalIndex = (this.products.length / this.itemsPerPage) * 10;
  }

  onPageChange(newPageIndex: number) {
    this.currentPage = newPageIndex;
    this.loadProducts();
  }

  loadProducts() {
    console.log(this.products);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.productsToDisplay = this.products.slice(startIndex, endIndex);
    console.log(this.productsToDisplay);
  }
}
