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
import { ProductsComponent } from './products/products.component';
import { RoleGuard } from './role.guard';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch : 'full'},
	{path: 'products', component: ProductsComponent},
	{path: 'shopping-cart', component: ShoppingCartComponent,pathMatch: 'full',canActivate:[AuthGuard]},
	{path: 'my-orders', component: MyOrdersComponent},
	{path: 'check-out', component: CheckOutComponent},
	{path: 'order-success', component: OrderSuccessComponent},
	{path: 'check-out', component: CheckOutComponent},
	{path: 'login', component: LoginComponent},
	{path: 'admin/products', component: AdminProductsComponent,canActivate:[AuthGuard,RoleGuard]},
	{path: 'admin/products/new', component: ProductFormComponent,canActivate:[AuthGuard,RoleGuard]},
	{path: 'admin/orders', component: AdminOrdersComponent},
	{path: 'home', component: HomepageComponent},
	{path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
