import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AuthGuard } from './auth.guard';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { RoleGuard } from './role.guard';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SignupFormComponent } from './signup-form/signup-form.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch : 'full'},
	{path: 'products', component: ProductsComponent},
	{path: 'shopping-cart', component: ShoppingCartComponent,pathMatch: 'full',canActivate:[AuthGuard]},
	{path: 'my-orders', component: MyOrdersComponent,pathMatch: 'full',canActivate:[AuthGuard]},
	{path: 'check-out', component: CheckOutComponent,pathMatch: 'full',canActivate:[AuthGuard]},
	{path: 'order-success', component: OrderSuccessComponent,canActivate:[AuthGuard]},
	{path: 'login', component: LoginComponent},
	{path: 'productdetail/:id', component: ProductDetailComponent},
	{path: 'register', component: SignupFormComponent},
	{path: 'admin/products', component: AdminProductsComponent,canActivate:[AuthGuard,RoleGuard]},
	{path: 'admin/products/new', component: ProductFormComponent,canActivate:[AuthGuard,RoleGuard]},
	{path: 'admin/orders', component: AdminOrdersComponent,canActivate:[AuthGuard,RoleGuard]},
	{path: 'home', component: HomepageComponent},
	{path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
