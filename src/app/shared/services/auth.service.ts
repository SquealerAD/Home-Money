export class AuthService {

  private isAuthenticated = false;

  login(){
    this.isAuthenticated = true;
  }

  logout(){
    this.isAuthenticated = false;
    localStorage.clear();
  }

  isLogedIn() : boolean{
    return this.isAuthenticated;
  }
}
