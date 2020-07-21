import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Model/cart';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  private auth: string;
  orderlist: any
  cartlist: Cart[]
  message: string
  totalSum: number = 0;
  constructor(private api: ApiService, private route: Router) {

  }

  ngOnInit() {
    this.auth = this.api.getToken();
    this.api.getCartItems(this.auth).subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist = this.cartlist.filter(order => order.orderId === 0)
      console.log("cart " + this.cartlist)
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });

    });

  }
  update(id, quantity) {
    this.totalSum = 0;
    this.api.updateCart(this.auth, id.value, quantity.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.message = res.message
      console.log(this.message)
      this.cartlist = this.cartlist.filter(order => order.orderId === 0)
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });
  }


  
  
  delete(id) {
    this.totalSum = 0;
    
    this.api.delCart(this.auth, id.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist = this.cartlist.filter(order => order.orderId === 0)
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });

  }


  place() {
    this.api.place(this.auth).subscribe(res => {
      this.cartlist = res.oblist;

    });

    this.route.navigate(['/home']);
  }

}
