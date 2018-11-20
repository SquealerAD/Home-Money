import {
  Component,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';

@Component({
  selector: 'wfm-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit,OnChanges{

  @Input('currency') currency : any;
  currencies : string[] = ['USD','EUR'];
  base : string = 'RUB';

  constructor() {}

  ngOnInit(): void {

  }
  ngOnChanges(change){
    console.log(change);
  }
}
