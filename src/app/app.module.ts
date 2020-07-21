import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Component/home/home.component';
import { AdminComponent } from './Component/admin/admin.component';
import { MenuComponent } from './Component/menu/menu.component';
import { EditItemComponent } from './Component/admin/edit-item/edit-item.component';
import { OrderItemComponent } from './Component/admin/order-item/order-item.component';
import { CartItemComponent } from './Component/home/cart-item/cart-item.component';
import { ProductComponent } from './Component/home/product/product.component';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './Component/home/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    MenuComponent,
    EditItemComponent,
    OrderItemComponent,
    CartItemComponent,
    ProductComponent,
    OrdersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
