import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Model/cart';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  public loggedType: string;
  ordernumber: any;
  authentication: string;
  cartlist: Cart[]
  totalSum: number = 0;
  x: any;

  constructor(private auth: ApiService, private route: Router) {

    if (this.auth.getAuthType() == null) {
      this.loggedType = "home";
    } else {
      if (this.auth.getAuthType() == "user") {
        this.loggedType = "user";
        console.log("user  " + this.loggedType)
      } else if (this.auth.getAuthType() == "admin") {
        this.loggedType = "admin";
        console.log("admin  " + this.loggedType)
      }
    }
  }

  ngOnInit() {
    this.orderItem();
    localStorage.getItem("value");
  }

  orderItem() {
    this.authentication = this.auth.getToken();
    this.auth.getCartItems(this.authentication).subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist = this.cartlist.filter(order => order.orderId === 0)

      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
      this.x = this.cartlist.length
    });
  }
  logout() {
    this.loggedType = "home";
    this.auth.removeToken();
    this.route.navigate(['/login']);
  }

}
