import { Component, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/api/products.service';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css'],
})
export class CategoryListingComponent {
  @Input() category: string = 'Category Name';
  products: any[] = [];
  displayedProducts: any[] = [];
  loadAmount = 15;
  currentIndex = 0;
  hasMoreProducts = true;

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit() {
    this.getProductsByCategory();
  }

  getProductsByCategory() {
    this.productsService.getProductsByCategory(this.category).subscribe({
      next: (data: any) => {
        console.log('Get successfully category', data);
        this.products = data;
        this.displayedProducts = this.products.slice(0, this.loadAmount);
      },
    });
  }

  loadMore(): void {
    this.currentIndex += this.loadAmount;
    const nextProducts = this.products.slice(
      this.currentIndex,
      this.currentIndex + this.loadAmount
    );
    this.displayedProducts = [...this.displayedProducts, ...nextProducts];
    this.checkForMoreProducts();
  }

  checkForMoreProducts(): void {
    this.hasMoreProducts =
      this.currentIndex + this.loadAmount < this.products.length;
  }
}
