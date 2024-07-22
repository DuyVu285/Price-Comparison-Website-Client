import { Component, Input, SimpleChanges } from '@angular/core';
import { ProductsService } from 'src/app/services/api/products.service';

@Component({
  selector: 'app-search-products-listing',
  templateUrl: './search-products-listing.component.html',
  styleUrls: ['./search-products-listing.component.css'],
})
export class SearchProductsListingComponent {
  @Input() products: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {}
}
