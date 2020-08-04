import { Component, OnInit, forwardRef } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';

import { NavigationExtras, Router } from '@angular/router';

import Swal from 'sweetalert2'
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpEvent, HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ImageFile } from 'src/app/Model/ImageFile';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AdminComponent), multi: true }]
})
export class AdminComponent implements OnInit {


  files: Array<ImageFile>;
  filesx: Array<ImageFile>;
  products: Product[] = [];
  fileToUpload: File = null;
  showAdd = false;
  auth: string;
  imageUrl: string = "/assets/images/noimage.png";
  croppedImage: string = "/assets/images/noimage.png";


  constructor(private api: ApiService, private router: Router, private http:HttpClient) { }

  ngOnInit() {
    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken();
      this.api.getProducts(this.auth).subscribe(
        res => {
          this.products = res.oblist;
        }
      );
      this.fileInfos = this.api.getFiles();
    }
    this.api.getFile(this.productId).subscribe(
  
      response => {
        console.log("dfghj")
        this.handleSuccessfulResponse(response)
        console.log("dfghj" + response)
      })
  }

  handleSuccessfulResponse(response)
  {
    this.files = new Array<ImageFile>();
    this.filesx = response;
    for (const file of this.filesx) {

      const xx = new ImageFile();
      xx.id = file.id;
      xx.productid = file.productid;
      xx.data = file.data;
      this.files.push(xx);
      console.log("llll" + xx)
    }
    
  }
  show() {
    this.showAdd = true;
  }
  hide() {
    this.showAdd = false;
  }

  urls = [];
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.urls.push(event.target.result); 
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  


productId =6;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;


  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;
  this.productId =6;
    this.currentFile = this.selectedFiles.item(0);
    this.api.upload(this.currentFile,this.productId).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.api.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
  
    this.selectedFiles = undefined;
  }
   


  msg: any;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  addProd(quan, price, prodname, image) {
    this.api.addProduct(this.auth, quan.value, price.value, prodname.value, this.fileToUpload).subscribe(res => {
      if (res.status == "200") {
        
        this.products = res.oblist;
        this.showAdd = false;
        console.log("responseeee" + res)
        Swal.fire('Added succesfully');
      }
      else if (res.status == "400") {
        console.log("eeeeeee" + res.message);
        this.msg = res.message
      }
      else if (res.status = "500") {
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
        "product": prodid.value
      }
    };
    this.router.navigate(["admin/edit"], navigationExtras);

  }
}
