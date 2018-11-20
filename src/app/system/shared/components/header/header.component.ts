import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {User} from "../../../../shared/models/user.model";
import {AuthService} from "../../../../shared/services/auth.service";


@Component({
  selector: 'wfm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService : AuthService,
              private router : Router) { }

  date : Date = new Date();
  user : User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

}
