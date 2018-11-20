import {Component, OnDestroy, OnInit} from '@angular/core';


import {BillService} from "../shared/services/bill.service";
import {EventsService} from "../shared/services/events.service";
import {CategoriesService} from "../shared/services/categories.service";
import {Bill} from "../shared/models/bill.model";
import {WFMEvent} from "../shared/models/event.model";
import {Category} from "../shared/models/category.model";
import {combineLatest} from "rxjs/internal/observable/combineLatest";
import {Subscription} from "rxjs/Subscription";
import {MoneySpent} from "../shared/models/moneyspent.model";

@Component({
  selector: 'wfm-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})



export class PlaningPageComponent implements OnInit,OnDestroy {


  bill : Bill;
  events : WFMEvent [] = [];
  categories : Category [] = [];
  isLoaded = false;
  sub : Subscription;
  //moneySpentByCategory : MoneySpent [];

  constructor(private billService : BillService,
              private eventService : EventsService,
              private categoriesService : CategoriesService) { }

  ngOnInit() {
    let billObservable = this.billService.getBill();
    let eventObservable = this.eventService.getEvents();
    let categoriesObservable = this.categoriesService.getCategories();
    this.sub = combineLatest(billObservable,eventObservable,categoriesObservable)
      .subscribe((result : [Bill,WFMEvent[],Category[]]) => {
        this.bill = result[0];
        this.events = result[1];
        this.categories = result[2];
        // this.moneySpentByCategory = new Array(this.categories.length);
        // for(let i = 0;i < this.categories.length;i++){
        //   this.moneySpentByCategory[i] = new MoneySpent();
        // }
        // for(let event of this.events){
        //     this.getMoneySpentByCategory(event);
        // }
        // for(let category of this.categories){
        //   this.getPercantageSpentByCategory(category);
        // }
        // console.log(this.moneySpentByCategory);
        this.isLoaded = true;
      })
  }

  getCategoryCost(category : Category) : number{
     let cost : number;
     let events : WFMEvent [] = this.events.filter((event : WFMEvent) => {
        if(event.category === category.id && event.type === 'outcome'){
          return event;
        }
    });
    cost = events.reduce((accum,event) => {
      return accum + event.amount;
    },0);
    return cost;
  }

  getCategoryPercent(category : Category) : string{
    let categoryTotal = this.getCategoryCost(category);
    return (categoryTotal / category.capacity * 100).toString();
  }

  getCategoryClass(category : Category) : string{
    let catPercent = +this.getCategoryPercent(category);
    return catPercent > 0 && catPercent < 60 ? 'success' :
      catPercent >= 60 && catPercent < 100 ? 'warning' : 'danger';
  }

  // getMoneySpentByCategory(event : WFMEvent){
  //   this.moneySpentByCategory[event.category - 1].money += event.amount;
  // }
  // getPercantageSpentByCategory(category : Category){
  //   let percent = this.moneySpentByCategory[category.id - 1].money /
  //     this.categories[category.id - 1].capacity * 100;
  //   this.moneySpentByCategory[category.id - 1].percentage =  percent > 100 ? 100 : percent;
  // }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
