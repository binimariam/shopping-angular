import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Model/cart';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2'

//import { DialogTemplateComponent } from '../../dialog-template/dialog-template.component';
//import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
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
  constructor(private api: ApiService, private route: Router, public dialog: MatDialog) {

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
    Swal.fire('Updated successfully!!!')
  }


  deleteconfirm(id){
  Swal.fire({
    title: 'Are you sure you want to delete?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      
      this.delete(id); 
      this.route.navigate(['/menu'])
      Swal.fire(
        'Deleted!',
        '',
        'success'
      )
      
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        '',
        'error'
      )
    }
  })
}

  delete(id) {
    this.totalSum = 0;
    this.api.delCart(this.auth, id.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist = this.cartlist.filter(order => order.orderId === 0)
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
      this.route.navigate(['/home/cart'])
    });

  }


  place() {
    this.api.place(this.auth).subscribe(res => {
      this.cartlist = res.oblist;
this.route.navigate(['menu']);
    });
    Swal.fire('Your order is placed successfully!!!')
    this.route.navigate(['/home']);
  }

}
