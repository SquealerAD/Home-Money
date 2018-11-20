import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Meta, Title} from "@angular/platform-browser";

import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";




@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form : FormGroup;
  constructor(private usersService : UsersService,
              private router : Router,
              private title : Title,
              private meta : Meta) {
              // title & meta is for seting meta tag in head & title tag

              title.setTitle('Регистрация');
              //meta.removeTag('name="keywords"');

  }

  ngOnInit() {
    this.form = new FormGroup({
      'email' : new FormControl(null,[Validators.required,Validators.email],[this.mailExists.bind(this)]),
      'password' : new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'name' : new FormControl(null,[Validators.required]),
      'agree' : new FormControl(false,[Validators.required,this.trueValidator])
    })
  }
  onSubmit(){
    //console.log(this.u);
    const {email,password,name} = this.form.value;
    const user = new User(email,password,name);
    this.usersService.createNewUser(user).subscribe((user : User) => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
    })
  }

  trueValidator(control : FormControl){
    if(control.value === false){
      return {
        truthError: true
      }
    }
    else{
      return null;
    }
  }

  mailExists(control : FormControl) : Observable<any>{
    return this.usersService.getUserByEmail(control.value).map((value) => {
      if(value.email === this.form.value.email){
        return {
          mailExists : true
        }
      }
      else{
        return null;
      }
    });
    // return new Promise<any>((resolve,reject) => {
    //     this.usersService.getUserByEmail(control.value).subscribe((value) => {
    //         if(!value){
    //           resolve(null);
    //         }
    //         else{
    //           console.log(this.form);
    //           resolve({
    //             mailExists: true
    //           })
    //         }
    //       }
    //     )
    // })
  }
}
