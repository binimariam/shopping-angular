import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Service/api.service';
import { ImageFile } from 'src/app/Model/ImageFile';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  constructor(private api: ApiService) { }


  files: Array<ImageFile>;
  filesx: Array<ImageFile>;
x: any
  auth: string
  ngOnInit(): void {
    this.fileInfos = this.api.getFiles();
    this.auth = this.api.getToken();
    this.api.getProduct(this.auth,this.productId).subscribe(res => {
     console.log("hiiiiiiii" +res.proddetails.productName)
    })
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

      const bookRetrievednew = new ImageFile();
      bookRetrievednew.id = file.id;
      bookRetrievednew.productid = file.productid;
      bookRetrievednew.data = file.data;
      this.files.push(bookRetrievednew);
      console.log("llll" + bookRetrievednew)
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



}
