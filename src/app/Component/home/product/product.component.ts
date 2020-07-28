import { Component, OnInit, Input, Output, ɵɵqueryRefresh } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/Model/product';
import { EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Cart } from 'src/app/Model/cart';
import { element } from 'protractor';
import { Subject, from } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {

  cart = []
  auth: string
  cartlist: Cart[]
  message: string
  totalSum: number = 0;
  products: Product[] = [];
x: any;

  @Input() public product;

  @Output() productAddToCart: EventEmitter<Product> = new EventEmitter<Product>();
  constructor(private http: HttpClient, public api: ApiService, public router: Router, public location:Location) { }

  ngOnInit() {
    this.getData();
  }


  getData() {
    this.auth = this.api.getToken();
    this.api.getCartItems(this.auth).subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist = this.cartlist.filter(order => order.orderId === 0)
      this.cartlist.forEach(element => {
        this.cart.push(element.productId)

      })
      console.log("oooo" + this.cart)
      this.x = this.cartlist.length
localStorage.setItem("value", this.x);
    });
  }


  productcart(productId) {
    if (this.cart.includes(productId)) {
      return true;
    }
    return false;
  }
  

  addToCart() {
    this.productAddToCart.emit(this.product);
    this.router.navigate(['/menu']);
    this.router.routerState
  Swal.fire("Product added to cart");
  }

}
