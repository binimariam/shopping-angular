import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: any;
  error = false;
  msg = " ";
returnUrl: string


  constructor(private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {

  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }
  login(): void {
    this.apiService.userLogin(this.loginForm.value).
      subscribe(res => {
        if (res.status == "200") {
          this.apiService.storeToken(res.auth_TOKEN, "user");
          this.router.navigate(['/home']);
          this.error = false;
        } else if (res.status == "500") {
          this.apiService.adminLogin(this.loginForm.value).
            subscribe(res => {
              if (res.status == "200") {
                this.apiService.storeToken(res.auth_TOKEN, "admin");
                // this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
                // this.router.navigateByUrl(this.returnUrl);
                this.router.navigate(['/admin']);
              } else {
                this.msg = "Bad credentials"
               
              }
              this.error = false;
            },
              err => {
                console.log(err);
              });
        }
      },
        err => {
          console.log(err);
        });
  }
}

