import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
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

import { FooterComponent } from './components/footer/footer.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { BannerComponent } from './components/banner/banner.component';
import { HomeComponent } from './pages/home/home.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsListingComponent } from './components/products-listing/products-listing.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { FeaturedDealsComponent } from './components/featured-deals/featured-deals.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { SearchComponent } from './pages/search/search.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './pages/product/product.component';

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
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
    NzListModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
