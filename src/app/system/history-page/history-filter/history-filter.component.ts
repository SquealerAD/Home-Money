import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../shared/models/category.model";

@Component({
  selector: 'wfm-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Input('visibility') visibility;
  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input('categories') categories : Category;
  selectedPeriod = 'd';
  selectedTypes : string [] = [];
  selectedCategories = [];
  types = [
    {type:'income',label:'Доход'},
    {type:'outcome',label:'Расход'}
  ];

  public timePeriods = [
    {
      type:'d',label:'День'
    },
    {
      type:'M',label:'Месяц'
    },
    {
      type:'y',label:'Год'
    }
  ] ;

  constructor() { }

  onCloseClick(){
    //console.log('clicked');
    this.selectedCategories = [];
    this.selectedTypes = [];
    this.selectedPeriod = 'd';
    this.visibility = false;
    this.onFilterCancel.emit(this.visibility);
  }
  applyFilter(){
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

  private calculateInputParams(field : string, target : HTMLInputElement){
    if(target.checked){
      this[field].push(target.value);
    }
    else{
      this[field].splice(this[field].indexOf(target.value),1)
    }
  }
  handleChangeType(target){
    this.calculateInputParams('selectedTypes',target);
    // if(target.checked){
    //   this.selectedTypes.push(target.value);
    // }
    // else{
    //   this.selectedTypes.splice(this.selectedTypes.indexOf(target.value),1)
    // }
  }

  handleChangeCategory(target){
    this.calculateInputParams('selectedCategories',target);
    // if(target.checked){
    //   this.selectedCategories.push(target.value);
    // }
    // else{
    //   this.selectedCategories.splice(this.selectedCategories.indexOf(target.value),1)
    // }
    //console.log(this.selectedCategories);
  }

  ngOnInit() {

  }
}
