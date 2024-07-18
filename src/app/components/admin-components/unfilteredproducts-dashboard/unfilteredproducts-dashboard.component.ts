import { ModelsService } from 'src/app/services/api/models.service';
import { Component} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UnfiteredProductsService } from 'src/app/services/api/unfiltered-products.service';
import { ProductsService } from 'src/app/services/api/products.service';
@Component({
  selector: 'app-unfilteredproducts-dashboard',
  templateUrl: './unfilteredproducts-dashboard.component.html',
  styleUrls: ['./unfilteredproducts-dashboard.component.css'],
})
export class UnfilteredproductsDashboardComponent {
  editCache: {
    [key: string]: {
      edit: boolean;
      modelExists: boolean;
      data: any;
    };
  } = {};
  unfilteredProducts: any[] = [];
  displayedProducts: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  searchValue = '';
  visible = false;

  constructor(
    private readonly unfilteredProductsService: UnfiteredProductsService,
    private readonly productsService: ProductsService,
    private readonly modelsService: ModelsService
  ) {}

  ngOnInit() {
    this.getUnfilteredProducts();
  }

  onModelAdded(){
    this.getUnfilteredProducts();
  }

  getUnfilteredProducts() {
    this.unfilteredProductsService.getAllUnfilteredProducts().subscribe({
      next: (data: any) => {
        console.log('Get successfully', data);
        this.unfilteredProducts = data;
        this.updateEditCache();
        this.checkModels();
        this.updateDisplayedProducts();
      },
      error: (error: HttpErrorResponse) => {
        console.log('Get failed', error);
      },
    });
  }

  updateEditCache(): void {
    this.unfilteredProducts.forEach((item) => {
      this.editCache[item._id] = {
        edit: false,
        data: { ...item },
        modelExists: false,
      };
    });
  }

  updateDisplayedProducts(): void {
    this.displayedProducts = this.unfilteredProducts.slice(
      (this.pageIndex - 1) * this.pageSize,
      this.pageIndex * this.pageSize
    );
  }

  filterRow(id: string): void {
    const productData = this.editCache[id].data;

    this.productsService.filterAndStoreProduct(productData).subscribe({
      next: () => {
        this.unfilteredProductsService
          .deleteUnfilteredProductById(id)
          .subscribe({
            next: () => {
              this.unfilteredProducts = this.unfilteredProducts.filter(
                (item) => item._id !== id
              );
              delete this.editCache[id];
              this.updateDisplayedProducts();
            },
            error: (error: HttpErrorResponse) => {
              console.error('Delete failed', error);
            },
          });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Filter and store failed', error);
      },
    });
  }

  checkModels(): void {
    this.unfilteredProducts.forEach((item) => {
      this.modelsService
        .checkModels(this.editCache[item._id].data.productName)
        .subscribe({
          next: (data: boolean) => {
            console.log('Check model successfully', data);
            this.editCache[item._id].modelExists = data;
          },
          error: (error: HttpErrorResponse) => {
            console.error('Check model failed', error);
          },
        });
    });
  }

  deleteRow(id: string): void {
    this.unfilteredProducts = this.unfilteredProducts.filter(
      (item) => item._id !== id
    );
    this.unfilteredProductsService.deleteUnfilteredProductById(id).subscribe({
      next: () => {
        delete this.editCache[id];
        this.updateDisplayedProducts();
      },
    });
  }

  deleteAll(): void {
    this.unfilteredProductsService
      .deleteAllUnfilteredProducts()
      .subscribe(() => {
        this.unfilteredProducts = [];
        this.updateEditCache();
        this.updateDisplayedProducts();
      });
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateDisplayedProducts();
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    if (this.searchValue) {
      const filteredProducts = this.unfilteredProducts.filter(
        (item) =>
          item.productName &&
          item.productName
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase()) !== -1
      );
      this.displayedProducts = filteredProducts.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    } else {
      this.updateDisplayedProducts();
    }
  }
}
