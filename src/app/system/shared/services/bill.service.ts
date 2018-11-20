import {Injectable} from "@angular/core";
import {Http,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Bill} from "../models/bill.model";
import {BaseApi} from "../../../shared/core/base-api";


@Injectable()

export class BillService extends BaseApi{

  constructor(public http : Http) { // need to define param as public for
    // class super to work with passed param
    super(http);
  }

  // getBill() : Observable<Bill>{
  //   return this.http.get('http://localhost:3000/bill')
  //     .map((response : Response) => {
  //       return response.json();
  //     })
  // }

  getBill() : Observable<Bill>{
    return this.get('bill');
  }

  getCurrency(base : string = 'RUB') : Observable<any>{
    return this.http.get(`http://data.fixer.io/api/latest?access_key=28923b87ce5d2fb27c8e725e24b72e35`)
      .map((response : Response) => {
        return response.json();
      });
  }

  updateBill(bill : Bill) : Observable<Bill>{
      return this.http.put('http://localhost:3000/bill',bill)
        .map((response : Response) => {
          return response.json();
        })
  }

}
