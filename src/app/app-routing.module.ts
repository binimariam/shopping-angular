import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { HomeComponent } from './Component/home/home.component';
import { AdminComponent } from './Component/admin/admin.component';
import { CartItemComponent } from './Component/home/cart-item/cart-item.component';
import { AuthguardService } from './Service/authguard.service';
import { OrderItemComponent } from './Component/admin/order-item/order-item.component';
import { EditItemComponent } from './Component/admin/edit-item/edit-item.component';
import { OrdersComponent } from './Component/home/orders/orders.component';



const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent},
  {path:'home/cart',component: CartItemComponent,canActivate:[AuthguardService]},
  {path:'admin/edit',component: EditItemComponent,canActivate:[AuthguardService]},
  {path:'admin/order',component: OrderItemComponent,canActivate:[AuthguardService]},
  {path:'home/orders',component: OrdersComponent,canActivate:[AuthguardService]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
