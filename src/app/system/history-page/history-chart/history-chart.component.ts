import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Category} from "../../shared/models/category.model";

@Component({
  selector: 'wfm-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {

  constructor() { }

  @Input() data;

  view: any[] = [545, 355];

  ngOnInit() {

  }

}
