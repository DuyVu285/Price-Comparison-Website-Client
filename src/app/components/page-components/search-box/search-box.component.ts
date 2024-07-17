import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/api/products.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  searchQuery: string = '';

  constructor(private router: Router,
    private productsService: ProductsService) {}

  onSearch() {
    this.productsService.searchProducts(this.searchQuery).subscribe(
      (data) => {
        console.log('Search results:', data);
        this.router.navigate(['/search'], { queryParams: { results: JSON.stringify(data) } });
      },
      (error) => {
        console.error('Error while searching:', error);
      }
    );
  }
}
