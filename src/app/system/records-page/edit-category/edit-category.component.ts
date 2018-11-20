import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {NgForm} from "@angular/forms";

import {Category} from "../../shared/models/category.model";
import {CategoriesService} from "../../shared/services/categories.service";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit,OnDestroy,OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }


  @Input('categories') categories : Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  currentCategoryId = 1;
  currentCategory : Category;
  message : Message;
  sub : Subscription;

  constructor(private categoriesService : CategoriesService) { }

  ngOnInit() {
    this.onCategoryChange(event);
    this.message = new Message('success','');
  }

  onSubmit(form : NgForm){
    console.log(form);
    const id = +this.currentCategoryId;
    let {capacity,name} = form.value;
    if(capacity < 0) {capacity = capacity * -1;}
    this.sub = this.categoriesService.updateCategory({capacity,name,id})
      .subscribe((category : Category) => {
          this.onCategoryEdit.emit(category);
          this.message.text = 'Категория успешно отредактированна';
          setTimeout(() => {
            this.message.text = '';
          },5000);
          //console.log('Updated OK:',category);
      })
  }

  onCategoryChange(event){
    //let target = event.target;
    //this.currentCategoryId = target.value;
    //console.log(this.currentCategoryId);
    this.currentCategory = this.categories.find((c) => {
      return +c.id === +this.currentCategoryId;
    });
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
}
