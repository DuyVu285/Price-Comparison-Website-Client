import { RecentlyViewedProductsService } from './../../../services/functions/recently-viewed-products.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recently-viewed-products',
  templateUrl: './recently-viewed-products.component.html',
  styleUrls: ['./recently-viewed-products.component.css'],
})
export class RecentlyViewedProductsComponent {
  recentlyViewedProducts: any[] = [];

  constructor(
    private recentlyViewedProductsService: RecentlyViewedProductsService
  ) {}

  ngOnInit(): void {
    this.recentlyViewedProducts =
      this.recentlyViewedProductsService.getRecentlyViewedProducts();
  }
}
