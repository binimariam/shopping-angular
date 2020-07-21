import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public loggedType: string;
  constructor(private auth: ApiService, private route: Router) {

    if (this.auth.getAuthType() == null) {
      this.loggedType = "home";
    } else {
      if (this.auth.getAuthType() == "user") {
        this.loggedType = "user";
        console.log("user  " + this.loggedType)
      } else if (this.auth.getAuthType() == "admin") {
        this.loggedType = "admin";
        console.log("admin  " + this.loggedType)
      }
    }
  }

  ngOnInit() {
    //console.log(this.auth.getAuthType());

  }
  logout() {
    this.loggedType = "home";
    this.auth.removeToken();
    this.route.navigate(['/login']);
  }

}
