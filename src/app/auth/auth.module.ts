import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";


import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {AuthComponent} from "./auth.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [ // Components declare in declarations
    LoginComponent,
    RegistrationComponent,
    AuthComponent
  ],
  // you should import CommonModule to every non root
  // module (non root = app.module.ts) to have basic angular
  // abilities like *ngIf,*ngFor....
  imports: [ // modules declare in imports
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [ // in exports declare what you wont to bring outside the module
    //AuthComponent
  ]
})

export class AuthModule {

}

