import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { HomeComponent } from './Component/home/home.component';
import { CartItemComponent } from './Component/home/cart-item/cart-item.component';
import { AuthguardService } from './Service/authguard.service';
import { OrdersComponent } from './Component/home/orders/orders.component';
import { MenuComponent } from './Component/menu/menu.component';
import { OrderItemComponent } from './Component/order-item/order-item.component';
import { AdminComponent } from './Component/admin/admin.component';
import { EditItemComponent } from './Component/edit-item/edit-item.component';
import { ProductdetailsComponent } from './Component/productdetails/productdetails.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthguardService]} ,
  { path: 'admin', component: AdminComponent , canActivate: [AuthguardService]},
  { path: 'home/cart', component: CartItemComponent, canActivate: [AuthguardService] },
  { path: 'admin/edit', component: EditItemComponent, canActivate: [AuthguardService] },
  { path: 'admin/order', component: OrderItemComponent, canActivate: [AuthguardService] },
  { path: 'home/orders', component: OrdersComponent, canActivate: [AuthguardService] },
  { path: 'menu', component: MenuComponent , canActivate: [AuthguardService] },
  { path: 'productdetails', component: ProductdetailsComponent , canActivate: [AuthguardService] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
 // { path: 'admin/**', canActivate: [AuthguardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

