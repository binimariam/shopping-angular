import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import { Order } from 'src/app/Model/Order';
import Swal from 'sweetalert2'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';



@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  searchText;
  auth: string;
  orderlist: any;
  orderid
  order: Order
authtype: string;

  constructor(private route: Router, private api: ApiService, private modalService: NgbModal, private activatedRoute: ActivatedRoute) {
    this.orderid = this.activatedRoute.snapshot.queryParamMap.get('order');
    console.log("orderid getting" + this.orderid)

    if (this.orderid != null) {
      console.log("ecccccc" + this.orderid)
      this.auth = this.api.getToken();
      this.authtype = this.api.getAuthType();
      console.log("authtypeee" + this.authtype)
      if(this.authtype === "admin")
      {
      this.api.viewOrder(this.auth,this.orderid).subscribe(res => {
        this.order = res
        console.log("ecccccc" + this.order.orderId)
        this.viewdetails(this.order);
      })
    }   else
    {
           this.route.navigate(['login'])
      // this.route.navigateByUrl('http://localhost:4200/admin/order?order='+ this.orderid)
    }
    }
  }
  returnUrl: string;
  ngOnInit() {
    this.auth = this.api.getToken();
    this.getOrderList();
    // this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    // this.route.navigateByUrl(this.returnUrl);
  }


  getOrderList() {
    this.api.getOrders(this.auth).subscribe(res => {
      this.orderlist = res.orderlist;

      console.log("list " + this.orderlist.products);
    });
  }

  viewdetails(order: Order) {
       const modalRef = this.modalService.open(DialogTemplateComponent);
    modalRef.componentInstance.order = order;
    console.log("value" + order);
  }
}

