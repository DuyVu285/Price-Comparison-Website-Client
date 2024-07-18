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
  productsSummary: any;
  unfilteredProductsSummary: any;
  modelsSummary: any;

  constructor(
    private readonly unfilteredProductsService: UnfiteredProductsService,
    private readonly productsService: ProductsService,
    private readonly ModelsService: ModelsService
  ) {}

  ngOnInit() {
    this.getSummary();
  }

  getSummary() {
    this.getProductsSummary();
    this.getUnfilteredProductsSummary();
    this.getModelsSummary();
  }

  getProductsSummary() {
    this.productsService.getSummary().subscribe({
      next: (data: any) => {
        this.productsSummary = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getUnfilteredProductsSummary() {
    this.unfilteredProductsService.getSummary().subscribe({
      next: (data: any) => {
        this.unfilteredProductsSummary = data;
        console.log(this.unfilteredProductsSummary);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getModelsSummary() {
    this.ModelsService.getSummary().subscribe({
      next: (data: any) => {
        this.modelsSummary = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
