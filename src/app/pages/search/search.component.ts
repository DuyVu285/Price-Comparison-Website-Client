import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/api/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResults: any[] = [];
  searchQuery: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private readonly productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.searchQuery = params['query'];
      console.log('Search query:', this.searchQuery);
    });

    if (this.searchQuery) {
      this.searchProducts(this.searchQuery);
    }
  }

  searchProducts(query: string): void {
    this.productsService
      .searchProducts(query)
      .subscribe((data) => (this.searchResults = data));
  }
}
