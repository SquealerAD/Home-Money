import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";

// user defined imports
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Message} from "../../shared/models/message.model";
import {AuthService} from "../../shared/services/auth.service";
import {fadeStateTrigger} from "../../shared/animations/fade.animation";

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit,OnChanges {

  constructor(
              private userService : UsersService,
              private authService : AuthService,
              private router : Router,
              private route : ActivatedRoute,
              private title : Title, // for CEO title optimization
              private meta : Meta
  ) {
      title.setTitle('Вход в систему'); // sets title of the page
      meta.addTags([
        {
          name: 'keywords',
          content: 'логин,вход,система'
        },
        {
          name: 'description',
          content: 'Страница для входа в систему'
        }
      ]);
  }


  form : FormGroup; // define FormGroup class field for reactive
  // (using js) approach
  message : Message;

  ngOnChanges(changes : SimpleChanges){
    debugger;
    console.log(changes);
  }
  ngOnInit() {

    this.form = new FormGroup({
        // to use angular build in Validators use Validators object

        'email' : new FormControl(null,[Validators.required,Validators.email]),
        'password' : new FormControl(null,[Validators.required,Validators.minLength(6)])

        // define here form controls as FormControl
        // class instances use string field names in controls object for FormControl,
        // FormControl constructor get initial value as first param (may be of any type),
        // second param is array of validator, third param is array of async validators

    });
    this.message = new Message('danger','');
    this.route.queryParams
      .subscribe((params : Params) => {
        if(params['nowCanLogin']){
          this.showMessage('Теперь вы можете зайти в систему','success');
        }
        else if(params['accessDenied']){
          this.showMessage('Для работы с системой вам нужно залогиниться','warning');
        }
      });
  }

  private showMessage(text : string, type : string = 'danger'){
    this.message.setMessage(type,text);
    setTimeout(() => {
      this.message.text = '';
      //this.router.navigate(['/login'])
    }, 5000);
  }

  onSubmit(){
    const formData = this.form.value; // form.value have all form fields values as object with
    // names defined in formControlName directives

    this.userService.getUserByEmail(formData.email).subscribe((user : User) => {
      // getUserByEmail uses http.get method which returns Observable so you need to subscribe to it the response from server
      if(user){
        if(user.password === formData.password){
          this.message.text = '';
          localStorage.setItem('user',JSON.stringify(user));
          this.authService.login();
          this.router.navigate(['./system','bill']);
        }
        else{
          this.showMessage('Пароль не верный!');
        }
      }
      else{
        this.showMessage('Такого пользователя нет!');
      }
    });
  }

  onInput(){
    //console.log(this.form);
  }

}
