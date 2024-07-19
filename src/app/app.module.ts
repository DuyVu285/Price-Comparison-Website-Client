import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/page-components/header/header.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { FooterComponent } from './components/page-components/footer/footer.component';
import { SearchBoxComponent } from './components/page-components/search-box/search-box.component';
import { CategoryMenuComponent } from './components/page-components/category-menu/category-menu.component';
import { BannerComponent } from './components/home-components/banner/banner.component';
import { HomeComponent } from './pages/home/home.component';
import { FeaturedProductsComponent } from './components/home-components/featured-products/featured-products.component';
import { ProductsListingComponent } from './components/product-components/products-listing/products-listing.component';
import { ProductCardComponent } from './components/product-components/product-card/product-card.component';
import { SideMenuComponent } from './components/page-components/side-menu/side-menu.component';
import { FeaturedDealsComponent } from './components/home-components/featured-deals/featured-deals.component';
import { ScrollTopComponent } from './components/page-components/scroll-top/scroll-top.component';
import { SearchComponent } from './pages/search/search.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailComponent } from './components/product-components/product-detail/product-detail.component';
import { ProductComponent } from './pages/product/product.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductsDashboardComponent } from './components/admin-components/products-dashboard/products-dashboard.component';
import { ModelsDashboardComponent } from './components/admin-components/models-dashboard/models-dashboard.component';
import { SummaryDashboardComponent } from './components/admin-components/summary-dashboard/summary-dashboard.component';
import { AddProductComponent } from './components/admin-components/add-product/add-product.component';
import { AddModelComponent } from './components/admin-components/add-model/add-model.component';
import { UnfilteredproductsDashboardComponent } from './components/admin-components/unfilteredproducts-dashboard/unfilteredproducts-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoryListingComponent } from './components/product-components/category-listing/category-listing.component';
import { CustomCurrencyPipe } from './custom-currency.pipe';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    CategoryMenuComponent,
    BannerComponent,
    HomeComponent,
    FeaturedProductsComponent,
    ProductsListingComponent,
    ProductCardComponent,
    SideMenuComponent,
    FeaturedDealsComponent,
    ScrollTopComponent,
    SearchBoxComponent,
    CategoryComponent,
    ProductDetailComponent,
    ProductComponent,
    AdminComponent,
    ProductsDashboardComponent,
    ModelsDashboardComponent,
    SummaryDashboardComponent,
    AddProductComponent,
    AddModelComponent,
    UnfilteredproductsDashboardComponent,
    LoginComponent,
    CategoryListingComponent,
    CustomCurrencyPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzIconModule,
    NzMenuModule,
    NzButtonModule,
    NzCarouselModule,
    NzLayoutModule,
    NzSwitchModule,
    NzGridModule,
    NzPaginationModule,
    NzCardModule,
    NzBackTopModule,
    NzBreadCrumbModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzTabsModule,
    NzListModule,
    NzTableModule,
    NzPopconfirmModule,
    NzDropDownModule,
    NzModalModule,
    NzFormModule,
    NzStatisticModule,
    NzNotificationModule,
    NzPageHeaderModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
