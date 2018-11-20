import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest} from "rxjs/internal/observable/combineLatest";
import {Subscription} from "rxjs/Subscription";

import {BillService} from "../shared/services/bill.service";
import {Bill} from "../shared/models/bill.model";
import {CategoriesService} from "../shared/services/categories.service";


@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit,OnDestroy {

  subscription1 : Subscription;
  subscription2 : Subscription;
  bill : Bill;
  currency : any;
  isLoaded = false;

  constructor(private billService : BillService,
              private catService : CategoriesService) { }

  ngOnInit() {
    this.subscription1 = combineLatest(this.billService.getBill(),
      this.billService.getCurrency('RUB'))
      .subscribe((result : [Bill,any]) => { // after : data structure definition with which data types it accept
          this.bill = result[0];
          this.currency = result[1];
          console.log(this.currency);
          this.isLoaded = true;
      })
  }

  onRefresh(){
    this.isLoaded = false;
    this.subscription2 = this.billService.getCurrency('RUB')
      .subscribe((currency : any) => {
            this.currency = currency;
            this.isLoaded = true;
        });
  }

  ngOnDestroy(){ // this.subscription.unsubscribe(); // unsubscribe from Observable to prevent memory leakage
   // do it in ngOnDestroy life cycle i.e when you access other component(page)
    this.subscription1.unsubscribe(); // unsubscribe from Observable to prevent memory leakage
    if(this.subscription2){
      this.subscription2.unsubscribe();
    }
    this.isLoaded = false;
  }
}
