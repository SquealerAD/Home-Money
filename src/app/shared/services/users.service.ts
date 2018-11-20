// this service works with servers data base so you need to inject Http
// to it. to do this declare @Injectable() decorator in service

import {Injectable} from "@angular/core";
import {Http, Response,Headers} from "@angular/http";
import {Observable} from "rxjs/internal/Observable";

import {User} from "../models/user.model";


@Injectable()
export class UsersService {
  constructor(private http : Http){

  }
  getUserByEmail(email) : Observable<User>{

     return this.http.get(`http://localhost:3000/users?email=${email}`)
       .map((response : Response) => { // use map method from Observable to return parsed object from JSON
         // import Response object from Http to use .json method
         return response.json();
       })
       .map((user : User[]) => {
          return user[0] ? user[0] : undefined;
       })
  }
  createNewUser(user) : Observable<User>{
    return this.http.post('http://localhost:3000/users',user)
      .map((response : Response) => {
        return response.json();
      })
  }
}
