import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecentlyViewedProductsService {
  private readonly storageKey = 'recentlyViewedProducts';
  private maxItems = 4;

  constructor() {}

  getRecentlyViewedProducts(): any[] {
    const products = localStorage.getItem(this.storageKey);
    return products ? JSON.parse(products) : [];
  }

  addProduct(product: any): void {
    if (!product || !product._id) {
      console.error('Invalid product:', product);
      return;
    }

    console.log('Adding product:', product);

    let products = this.getRecentlyViewedProducts();
    products = products.filter((p) => p._id !== product._id);
    console.log('Recently viewed products:', products);
    products.unshift(product);

    if (products.length > this.maxItems) {
      products.pop();
    }

    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  clearRecentlyViewedProducts(): void {
    localStorage.removeItem(this.storageKey);
  }
}
