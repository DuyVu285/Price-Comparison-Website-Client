import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/api/products.service';
import { UnfiteredProductsService } from 'src/app/services/api/unfiltered-products.service';
import { ModelsService } from 'src/app/services/api/models.service';
import { ScrapeService } from 'src/app/services/api/scrape.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-summary-dashboard',
  templateUrl: './summary-dashboard.component.html',
  styleUrls: ['./summary-dashboard.component.css'],
})
export class SummaryDashboardComponent {
  productsSummary: any;
  unfilteredProductsSummary: any;
  modelsSummary: any;
  scrapingInProgress: boolean = false;
  totalProducts = 0;

  constructor(
    private readonly unfilteredProductsService: UnfiteredProductsService,
    private readonly productsService: ProductsService,
    private readonly ModelsService: ModelsService,
    private readonly scrapeService: ScrapeService,
    private notification: NzNotificationService
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

  scrapeAll() {
    this.scrapingInProgress = true;
    this.scrapeService.scrapeAllSites().subscribe({
      next: (data: any) => {
        console.log(data);
        for (const item of data) {
          this.totalProducts += item.totalItems;
        }
        this.showScrapeNotification(
          'Scraping Finished',
          'All sites have been scraped. A total of ' +
            this.totalProducts +
            ' products have been scraped.'
        );
        this.scrapingInProgress = false;
        this.totalProducts = 0;
      },
      error: (error: any) => {
        console.log(error);
        this.showScrapeNotification(
          'Scraping Error',
          'There was an error during scraping.'
        );
        this.scrapingInProgress = false;
        this.totalProducts = 0;
      },
    });
  }

  showScrapeNotification(title: string, content: string): void {
    this.notification
      .blank(title, content, { nzPlacement: 'bottom' })
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }
}
