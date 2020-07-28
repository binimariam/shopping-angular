import { Component, OnInit, forwardRef } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AdminComponent), multi: true }]
})
export class AdminComponent implements OnInit {

  products: Product[] = [];
  fileToUpload: File = null;
  showAdd = false;
  auth: string;
  imageUrl: string = "/assets/img/noimage.png";

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken();
      this.api.getProducts(this.auth).subscribe(
        res => {
          this.products = res.oblist;
        }
      );
    }
  }


  show() {
    this.showAdd = true;
  }
  hide() {
    this.showAdd = false;
  }

  // onChange = (value: string) => { };
  // onTouched: () => {};
  // model: string;

  // writeValue(value) {
  //   this.model = value;
  // }
  // registerOnChange(fn) {
  //   this.onChange = fn;
  // }
  // registerOnTouched(fn) {
  //   this.onTouched = fn;
  // }

  // imageCropped(event: ImageCroppedEvent) {
  //   this.model = event.base64;
  //   this.onChange(this.model);
  // }

  // imageLoaded(e) {

  // }

  // loadImageFailed() {

  // }

  msg: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  // fileChangeEvent(event: any): void {
  //     this.imageChangedEvent = event;
  // }

  
  fileChangeEvent(file: FileList) {
    this.imageChangedEvent = event
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageChangedEvent = event;
    }
    reader.readAsDataURL(this.fileToUpload);
}



  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }




  // handleFileInput(file: FileList) {
  //   this.fileToUpload = file.item(0);
  //   var reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imageUrl = event.target.result;
  //   }
  //   reader.readAsDataURL(this.fileToUpload);
  // }

  addProd(quan, price, prodname, image) {
    this.api.addProduct(this.auth, quan.value, price.value, prodname.value, this.fileToUpload).subscribe(res => {    
      if (res.status == "200") {
        this.products = res.oblist;
      this.showAdd = false;
      console.log("responseeee" + res)
      Swal.fire('Added succesfully');
      }
      else if (res.status == "400") 
        {
        console.log("eeeeeee" +res.message);
        this.msg  = res.message
      }
      else if (res.status = "500")
      {
        console.log("500" + res.message)
      }
    });
    
  }

  deleteconfirm(prodid) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.delProd(prodid);
        Swal.fire(
          'Deleted!',
          '',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    })
  }
  delProd(prodid) {

    this.api.delProduct(this.auth, prodid.value).subscribe(res => {
      this.products = res.oblist;
    });

  }
  edit(prodid) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "user": prodid.value
      }
    };
    this.router.navigate(["admin/edit"], navigationExtras);

  }


}
