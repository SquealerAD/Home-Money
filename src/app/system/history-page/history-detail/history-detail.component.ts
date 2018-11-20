import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {WFMEvent} from "../../shared/models/event.model";
import {EventsService} from "../../shared/services/events.service";
import {Category} from "../../shared/models/category.model";
import {CategoriesService} from "../../shared/services/categories.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit,OnDestroy {

  constructor(private route : ActivatedRoute,
              private eventService : EventsService,
              private categoriesService : CategoriesService) { }

  id;
  event : WFMEvent;
  category : Category;
  isLoaded = false;
  sub : Subscription;
  typeRus = {
    "income":"Доход",
    "outcome":"Расход"
  };

  ngOnInit() {

    this.sub = this.route.params
      .mergeMap((params : Params) => {
        this.id = params.id;
        return this.eventService.getEventById(params.id);
      })
      .mergeMap((event : WFMEvent) => {
        this.event = event[0];
        console.log(this.event);
        return this.categoriesService.getCategoryById(this.event.category);
      })
      .subscribe((cat : Category) => {

          this.category = cat;
          this.isLoaded = true;
      });

  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
