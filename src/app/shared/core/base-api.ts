import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";


export class BaseApi {

  private baseUrl = 'http://localhost:3000/';

  constructor(public http : Http){

  }

  private getUrl(url : string = '') : string{
    return this.baseUrl + url;
  }

  public get(url : string = '') : Observable<any>{
    return this.http.get(this.getUrl(url))
      .map((response : Response) => {
          return response.json();
      });
  }

  public post(url : string = '',data : any = {}) : Observable<any>{
    return this.http.post(this.getUrl(url),data)
      .map((response : Response) => {
        return response.json();
      });
  }

  public put(url : string = '',data : any = {}) : Observable<any>{
    return this.http.put(this.getUrl(url),data)
      .map((response : Response) => {
        return response.json();
      });
  }
}
