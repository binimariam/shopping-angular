import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Order } from 'src/app/Model/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {


  auth: string;
  //orderlist: any[] = [];
  orderlist: Order
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.auth = this.api.getToken();
    this.viewOrderList();
  }


  viewOrderList() {
    this.api.viewOrders(this.auth).subscribe(res => {
      console.log("response " + res)
      this.orderlist = res.orderlist

      console.log("list user  " + this.orderlist.totalCost);
      console.log("list user1  " + this.orderlist.orderBy);
      console.log("list user2  " + this.orderlist.orderId);
      console.log("list user3  " + this.orderlist.orderStatus);

    });
  }
}

