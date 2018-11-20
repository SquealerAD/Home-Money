import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest} from "rxjs/internal/observable/combineLatest";
import {Subscription} from "rxjs/Subscription";
import * as moment from "moment";

import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";
import {Category} from "../shared/models/category.model";
import {WFMEvent} from "../shared/models/event.model";



@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit,OnDestroy {


  categories : Category [] = [];
  events : WFMEvent [] = [];
  filteredEvents : WFMEvent [] = [];
  isLoaded = false;
  s1 : Subscription;
  chartData = [];
  isFilterVisible = false;

  constructor(private categoriesServies : CategoriesService,
              private eventsService : EventsService) { }

  ngOnInit() {
    combineLatest(this.categoriesServies.getCategories(),
                  this.eventsService.getEvents())
      .subscribe((data : [Category [],WFMEvent []]) => {
          this.events = data[1];
          this.categories = data[0];
          this.setOriginalEvents();
          this.fillChartData(this.categories,this.filteredEvents);
          this.isLoaded = true;
          console.log(this.chartData);
      });
  }

  fillChartData(categories : Category [], events : WFMEvent []){
    this.chartData = [];
    categories.forEach((category) => {
      this.chartData.push({'name' : category.name,'value': 0});
      events.forEach((event) => {
        if(category.id === event.category){
          this.chartData[this.chartData.length - 1]['value'] += event.type === 'outcome' ? event.amount : 0;
        }
      })
    })
  }

  private toggleFilterVisibility(direction : boolean){
    this.isFilterVisible = direction;
  }

  openFilter(){
    this.toggleFilterVisibility(true);
  }

  onFilterCancel(openState){
    this.toggleFilterVisibility(openState);
    this.setOriginalEvents();
    this.fillChartData(this.categories,this.filteredEvents);
  }

  onFilterApply(filterData){

    const startPeriod = moment().startOf(filterData['period']).startOf('d');
    const endPeriod = moment().endOf(filterData['period']).startOf('d');

    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.filteredEvents = this.filteredEvents.filter((e) => {
      if(filterData['types'].length === 0){
        return this.filteredEvents;
      }
      return filterData['types'].indexOf(e.type) >= 0;
    })
      .filter((e) => {
        if(filterData['categories'].length === 0){
          return this.filteredEvents;
        }
        return filterData['categories'].indexOf(e.category.toString()) >= 0;
      })
      .filter((e) => {
        //const momentDate = moment(e.date,'DD.MM.YYYY HH:mm:ss');
        //return momentDate.isBetween(startPeriod,endPeriod);
        // new Date(year,month,day);
        switch (filterData['period']){
          case 'd':
            return +this.getDateParts(e.date,'.','DD.MM.YYYY').day === new Date(Date.now()).getDate() &&
              +this.getDateParts(e.date,'.','DD.MM.YYYY').year === new Date(Date.now()).getFullYear();
          case 'y':
            return +this.getDateParts(e.date,'.','DD.MM.YYYY').year === new Date(Date.now()).getFullYear();
          case 'M':
            return +this.getDateParts(e.date,'.','DD.MM.YYYY').year === new Date(Date.now()).getFullYear() &&
             +this.getDateParts(e.date,'.','DD.MM.YYYY').month === new Date(Date.now()).getMonth() + 1;
        }
      });
    this.fillChartData(this.categories,this.filteredEvents);

    //console.log(this.getDateParts(this.events[0].date,'.','DD.MM.YYYY'));
  }

  private getDateParts(date : string,separator : string, format : string){
    date = date.substr(0,date.indexOf(' '));
    let parts = date.split(separator);
    let dateObj = {
      month:'',
      day:'',
      year:''
    };
    let formatParts = format.split(separator);
    Array.from(formatParts).forEach((part,index) => {
        if(part.toLowerCase() === 'mm' || part.toLowerCase() === 'm'){
          if(part.toLowerCase() === 'm'){
            if(+parts[index] < 10){
              dateObj.month = '0' + parts[index];
            }
          }
          else {
            dateObj.month = parts[index];
          }
        }
        else if(part.toLowerCase() === 'dd' || part.toLowerCase() === 'd'){
          if(part.toLowerCase() === 'd'){
            if(+parts[index] < 10){
              dateObj.day = '0' + parts[index];
            }
          }
          else {
            dateObj.day = parts[index];
          }
        }
        else if(part.toLowerCase() === 'yyyy' || part.toLowerCase() === 'yy'){
          if(part.toLowerCase() === 'yy'){
            dateObj.year = parts[index].substr(3,2);
          }
          else {
            dateObj.year = parts[index];
          }
        }
    });
    return dateObj;
  }

  private setOriginalEvents(){
    this.filteredEvents = Object.assign([],this.events);
  }

  ngOnDestroy(): void {
    if(this.s1){
      this.s1.unsubscribe();
    }
  }

}
