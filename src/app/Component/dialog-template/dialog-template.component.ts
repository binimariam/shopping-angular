import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/Model/Order';
import { ApiService } from 'src/app/Service/api.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls:['./dialog-template.component.css']
})
export class DialogTemplateComponent implements OnInit  {


  constructor(public activeModal: NgbActiveModal,private api: ApiService,private route:Router,private activatedRoute:ActivatedRoute) { }
  @Input() order: Order;
  orderlist: Order;
  auth: string;
  

  ngOnInit() {
    this.auth = this.api.getToken();
   
    this.getOrderList();
    console.log("order list is" + this.getOrderList())

  }
  getOrderList() {
    this.api.getOrders(this.auth).subscribe(res => {
      this.orderlist = res.orderlist;
      console.log("listsssssssssssss " +this.orderlist);
    });
   
  }

  approve(orderid) {
    let order = {
      "orderId": orderid,
      "orderStatus": "APPROVED"
    }
    this.api.update(this.auth, order).subscribe(res => {
console.log("seeee" + res.status)

// console.log("ecccccc" + this.orderid)
      this.auth = this.api.getToken();

      this.api.viewOrder(this.auth, this.order.orderId).subscribe(res => {
        this.order = res
        console.log("ecccccc" + this.order.orderId)
       this.route.navigate(['admin'])
      })
      console.log("logerrrr" + this.getOrderList())
    });
    Swal.fire("Approved")
   
   
  }

  decline(orderid) {
    let order = {
      "orderId": orderid,
      "orderStatus": "DECLINED"
    }
    this.api.update(this.auth, order).subscribe(res => {
      this.getOrderList();
     
    });
    
    Swal.fire("Declined")
  
  }
}
