import { Component, Input, OnInit} from '@angular/core';
import {Bill} from "../../shared/models/bill.model";

@Component({
  selector: 'wfm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements  OnInit{

  @Input('bill') bill : Bill;
  @Input('currency') currency : any;

  dollar : number;
  euro : number;

  constructor() { }

  ngOnInit() {
    const {rates} = this.currency;
    this.dollar = +(this.bill.value / (rates['RUB'] / rates['USD']));
    this.euro = +(this.bill.value / rates['RUB']);
    console.log(this.currency);
  }

}
