import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';


import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthComponent} from "./auth.component";



const routes: Routes = [
  {path : '', component: AuthComponent, children: [
      {path : 'login',component: LoginComponent},
      {path : 'registration',component: RegistrationComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // forChild method used for child pages routes
  // it gets routes array as param
  exports: [RouterModule]
})
export class AuthRoutingModule {

  constructor(router : Router){

  }
}
