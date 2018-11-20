import {Component, Input, OnInit, ViewChild} from '@angular/core';


import {Category} from "../../shared/models/category.model";
import {WFMEvent} from "../../shared/models/event.model";
import {Router} from "@angular/router";

@Component({
  selector: 'wfm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input('categories') categories : Category [] = [] ;
  @Input('events') events : WFMEvent [] = [];

  searchValue : string = '';
  searchPlaceholder : string = 'Сумма';
  searchField = 'amount';

  eventTypeDictionaryRus = {
    "outcome":"Расход",
    "income":"Доход"
  };
  eventTypeClassName = {
    "outcome":"danger",
    "income":"success"
  };
  placeholderNamesRus = {
    "amount":"Сумма",
    "type":"Тип",
    "date":"Дата",
    "category":"Категория"
  };

  constructor(private r : Router) { }

  ngOnInit() {
    this.events.forEach((event) => {
      event.cName = this.categories.find((cat) => {
        return cat.id === event.category
      }).name;
    })
  }
  getEventClass(event : WFMEvent){
    return {
      'label':true,
      'label-danger' : event.type === 'outcome',
      'label-success' : event.type === 'income'
    }
  }

  changeCreteria(field : string){
    this.searchPlaceholder = this.placeholderNamesRus[field];
    this.searchField = field;
  }

  Test(){
    console.log(this.searchValue);
  }


}
