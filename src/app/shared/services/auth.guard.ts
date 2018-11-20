import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";


import {AuthService} from "./auth.service";

@Injectable()
// implement CanActivate & CanActivateChild for guard to work
export class AuthGuard implements CanActivate, CanActivateChild{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLogedIn()){
      return true;
    }
    else {
      this.router.navigate(['/login'], {
        queryParams: {
          accessDenied : true
        }
      });
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute,state);
  }
  constructor(private authService : AuthService ,private router : Router){

  }
}
