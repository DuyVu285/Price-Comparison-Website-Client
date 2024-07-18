import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/api/products.service';
import { UnfiteredProductsService } from 'src/app/services/api/unfiltered-products.service';
import { ModelsService } from 'src/app/services/api/models.service';

@Component({
  selector: 'app-summary-dashboard',
  templateUrl: './summary-dashboard.component.html',
  styleUrls: ['./summary-dashboard.component.css'],
})
export class SummaryDashboardComponent {

  constructor(
    private readonly unfilteredProductsService: UnfiteredProductsService,
    private readonly productsService: ProductsService,
    private readonly ModelsService: ModelsService
  ) {}
}
