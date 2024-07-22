import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AdminGuard } from './services/functions/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'category/:name', component: CategoryComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'authentication', component: AuthenticationComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
