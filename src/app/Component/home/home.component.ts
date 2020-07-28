import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';
import { Cart } from 'src/app/Model/cart';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  private auth_token: string;
  public loggedType: string;
  ordernumber: any;
  authentication: string;
  cartlist: Cart[]
  totalSum: number = 0;
  x: any;
  
  constructor(private auth: ApiService, private route: Router) { }

  ngOnInit() {
    if (this.auth.isAuthenticated) {
      this.auth_token = this.auth.getToken();
      this.auth.getProducts(this.auth_token).subscribe(
        res => {
          this.products = res.oblist;
        }
      );
    }
    localStorage.getItem("valuex");
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
this.route.navigate(['/home'])
    });
  }
  addToCart(e){
    this.auth.addCartItems(e, this.auth_token).subscribe(res => {
      console.log(res);
         })
    this.orderItem()
  
    //localStorage.setItem("value", this.x);
    //window.location.reload();
  }
}
