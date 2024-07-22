import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductsService } from 'src/app/services/api/products.service';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.css'],
})
export class ProductsDashboardComponent {
  editCache: {
    [key: string]: {
      edit: boolean;
      expand: boolean;
      editNested: { [key: string]: boolean };
      data: any;
    };
  } = {};
  products: any[] = [];
  displayedProducts: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  searchValue = '';
  visible = false;

  constructor(
    private readonly productsService: ProductsService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  onProductAdded() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (data: any) => {
        console.log('Get successfully', data);
        this.products = data;
        this.updateEditCache();
        this.updateDisplayedProducts();
      },
      error: (error: HttpErrorResponse) => {
        console.log('Get failed', error);
      },
    });
  }

  updateEditCache(): void {
    this.products.forEach((item) => {
      this.editCache[item._id] = {
        edit: false,
        expand: false,
        editNested: {},
        data: { ...item },
      };
      item.prices.forEach((price: { key: string }) => {
        this.editCache[item._id].editNested[price.key] = false;
      });
    });
  }

  updateDisplayedProducts(): void {
    this.displayedProducts = this.products.slice(
      (this.pageIndex - 1) * this.pageSize,
      this.pageIndex * this.pageSize
    );
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  startEditNested(productId: string, priceKey: string): void {
    this.editCache[productId].editNested[priceKey] = true;
  }

  expandRow(id: string): void {
    this.editCache[id].expand = !this.editCache[id].expand;
  }

  cancelEdit(id: string): void {
    const index = this.products.findIndex((item) => item._id === id);
    this.editCache[id] = {
      data: { ...this.products[index] },
      edit: false,
      expand: false,
      editNested: {},
    };
    this.products[index].prices.forEach((price: { key: string }) => {
      this.editCache[id].editNested[price.key] = false;
    });
    this.updateDisplayedProducts();
  }

  cancelEditNested(productId: string, priceKey: string): void {
    const productIndex = this.products.findIndex(
      (item) => item._id === productId
    );
    const priceIndex = this.products[productIndex].prices.findIndex(
      (price: { key: string }) => price.key === priceKey
    );
    this.editCache[productId].data.prices[priceIndex] = {
      ...this.products[productIndex].prices[priceIndex],
    };
    this.editCache[productId].editNested[priceKey] = false;
    this.updateDisplayedProducts();
  }

  saveEdit(id: string): void {
    const index = this.products.findIndex((item) => item._id === id);
    if (
      JSON.stringify(this.products[index]) !==
      JSON.stringify(this.editCache[id].data)
    ) {
      Object.assign(this.products[index], this.editCache[id].data);
      this.productsService.updateProduct(id, this.products[index]).subscribe({
        next: () => {
          this.editCache[id].edit = false;
          this.updateDisplayedProducts();
          this.showNotification('Success', 'Product updated');
        },
      });
    } else {
      this.editCache[id].edit = false;
    }
  }

  saveEditNested(productId: string, priceKey: string): void {
    const productIndex = this.products.findIndex(
      (item) => item._id === productId
    );
    const priceIndex = this.products[productIndex].prices.findIndex(
      (price: { key: string }) => price.key === priceKey
    );
    if (
      JSON.stringify(this.products[productIndex].prices[priceIndex]) !==
      JSON.stringify(this.editCache[productId].data.prices[priceIndex])
    ) {
      Object.assign(
        this.products[productIndex].prices[priceIndex],
        this.editCache[productId].data.prices[priceIndex]
      );
      this.productsService
        .updateProduct(productId, this.products[productIndex])
        .subscribe({
          next: () => {
            this.editCache[productId].editNested[priceKey] = false;
            this.updateDisplayedProducts();
            this.showNotification('Success', 'Price updated');
          },
        });
    } else {
      this.editCache[productId].editNested[priceKey] = false;
    }
  }
  deleteRow(id: string): void {
    this.products = this.products.filter((item) => item._id !== id);
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        delete this.editCache[id];
        this.updateDisplayedProducts();
        this.showNotification('Success', 'Product deleted');
      },
    });
  }

  deleteNested(id: string, priceKey: string): void {
    const productIndex = this.products.findIndex((item) => item._id === id);
    const priceIndex = this.products[productIndex].prices.findIndex(
      (price: { key: string }) => price.key === priceKey
    );
    this.products[productIndex].prices.splice(priceIndex, 1);
    this.productsService
      .updateProduct(id, this.products[productIndex])
      .subscribe({
        next: () => {
          delete this.editCache[id].editNested[priceKey];
          this.updateDisplayedProducts();
          this.showNotification('Success', 'Price deleted');
        },
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
      const filteredProducts = this.products.filter(
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

  showNotification(title: string, content: string): void {
    this.notification.blank(title, content).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }
}
