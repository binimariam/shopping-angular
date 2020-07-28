import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import { Order } from 'src/app/Model/Order';
import Swal from 'sweetalert2'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogTemplateComponent } from '../../dialog-template/dialog-template.component';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  searchText;
  auth: string;
  orderlist: Order;
  orderid
  constructor(private route: Router, private api: ApiService, private modalService: NgbModal, private activatedRoute:ActivatedRoute) {
    // this.orderid = this.activatedRoute.snapshot.queryParamMap.get('order');
    // console.log(this.orderid)
    // if(this.orderid)
    // {

    // }
   }

  ngOnInit() {
    this.auth = this.api.getToken();
    this.getOrderList();
   
  }

  // approve(orderid) {
  //   let order = {
  //     "orderId": orderid,
  //     "orderStatus": "APPROVED"
  //   }
  //   this.api.update(this.auth, order).subscribe(res => {
  //     this.getOrderList();
  //   });
    
  // }

  // decline(orderid) {
  //   let order = {
  //     "orderId": orderid,
  //     "orderStatus": "DECLINED"
  //   }
  //   this.api.update(this.auth, order).subscribe(res => {
  //     this.getOrderList();
  //   });
  // }

  getOrderList() {
    this.api.getOrders(this.auth).subscribe(res => {
      this.orderlist = res.orderlist;
      
      console.log("list " +this.orderlist.products);
    });
  }
  
  viewdetails(order: Order) {
    const modalRef = this.modalService.open(DialogTemplateComponent);
    modalRef.componentInstance.order = order;
    console.log("value" + order.orderId);
  }

  // view(orderid){
  //   Swal.fire({
  //     title: 'Order Details',
  //     text: 'Order Id: ' + orderid,
  //     showCancelButton: true,
  //     confirmButtonText: 'Approve',
  //     cancelButtonText: 'Decline'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.approve(orderid);
  //       Swal.fire(
  //         'Approved',
  //         '',
  //         'success'
  //       )
     
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       this.decline(orderid) 
  //       Swal.fire(
  //         'Declined',
  //         '',
  //         'error'
  //       )
  //     }
  //   })
  // }
}

