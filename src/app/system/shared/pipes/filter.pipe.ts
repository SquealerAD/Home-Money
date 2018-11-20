import {Pipe, PipeTransform} from "@angular/core";
import {Category} from "../models/category.model";

@Pipe({
  name:'wfmFilter'
})

export class FilterPipe implements PipeTransform{
  transform(items: any, value : any, field : string,categories : Category[] = []) : any {
    if(items.length === 0 || value === ''){return items;}
    if(field === 'type'){
      value = 'Доход'.indexOf(value) === 0 ? 'income' : 'Расход'.indexOf(value) === 0 ? 'outcome' : -1;
    }
    else if(field === 'category'){
      value = categories.find((c) => {
        let name = c.name.toLowerCase();
        return name.lastIndexOf(value.toLowerCase()) === 0;
      });
      if(!value){
        value = -1;
      }
      else{
        value = value.id;
      }
    }
    else if(field === 'amount'){
      //value = +value;
    }

    return items.filter((item) => {
        return item[field].toString().toLowerCase().indexOf(value) === 0;
    })
  }
}
