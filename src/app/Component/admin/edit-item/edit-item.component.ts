import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  product: Product = {
    productid: 0,
    price: 0,
    productName: '',
    quantity: 0,
    image: null
  };
  products: Product[] = [];
  fileToUpload: File = null;
  auth: string;
  prodid: string;
  imageUrl: string = "/assets/img/noimage.png";

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken();
      this.api.getProducts(this.auth).subscribe(
        res => {
          res.oblist.forEach(pro => {
            if (pro.productid == this.prodid) {
              this.product = pro;
              this.fileToUpload = pro.image;
            }
          });
        }
      );
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.prodid = params["user"];
    });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  updateProd(quan, price, prodname, image) {
    this.api.updateProduct(this.auth, quan.value, price.value, prodname.value, this.fileToUpload, this.product.productid).subscribe(res => {
      console.log(res);
      this.router.navigate(['/admin']);
    });
  }

}
