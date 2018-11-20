import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

import {CategoriesService} from "../../shared/services/categories.service";
import {Category} from "../../shared/models/category.model";
import {Subscription} from "rxjs/Subscription";
import {Message} from "../../../shared/models/message.model";


@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy,OnInit{
  ngOnInit(): void {
    this.message = new Message('','');
  }

  @Output() onCategoryAdd = new EventEmitter<Category>();
  sub1 : Subscription;
  sub2 : Subscription;
  message : Message;
  constructor(private categoriesService : CategoriesService) { }

  onSubmit(form : NgForm){ // to use template approach define the type of the form
    // that is NgForm

    //console.log(form);
    let isCategoryExists : boolean = false;
    let {name,capacity} = form.value;
    if(capacity < 0) {capacity *= -1;}


    this.sub2 = this.categoriesService.getCategories()
      .map((categories : Category[]) => {
          if(categories.find((category : Category) => {
            return category.name === name
          })){
            isCategoryExists = true;
          }
          else{
            isCategoryExists = false;
          }
          return isCategoryExists;
      })
      .subscribe(() => {
        if(isCategoryExists === false){
          this.sub1 = this.categoriesService.addCategory(new Category(name,capacity))
            .subscribe((category : Category) => {
              //form.resetForm({name : '',capacity: 1})
              form.reset();
              form.form.patchValue({capacity: 1});
              this.onCategoryAdd.emit(category);
            })
        }
        else{
          this.message = new Message('danger','Такая категория уже существует!');
          setTimeout(() => {
            this.message.text = '';
          },5000);
          form.reset();
          form.form.patchValue({capacity: 1});
        }
      });
  }

  ngOnDestroy(): void {
    if(this.sub1){
      this.sub1.unsubscribe();
    }
    if(this.sub2){
      this.sub2.unsubscribe();
    }
  }

}
