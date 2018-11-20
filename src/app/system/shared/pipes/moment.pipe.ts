import {Pipe, PipeTransform} from "@angular/core";
import * as moment from 'moment';

@Pipe({
  name: 'wfmMoment'
})

export class MomentPipe implements PipeTransform{

  //, formatFrom : string
  //transform(value: string,formatFrom : string, formatTo : string = 'MM.DD.YYYY'): string {

  FormatError(){
    console.log('test');
    throw new Error('pipe format error! Get Lost');
  }
  //transform(value : string, format : string = 'MM.DD.YYYY', separator : string = '/'){
  transform(value: string,formatFrom : string, formatTo : string = 'MM.DD.YYYY'): string {
      let alternativeDateUsingMoment = moment(value,formatFrom).format(formatTo);
      return alternativeDateUsingMoment;

      // let template = format.match(/\w{1,4}/gi);
      // let tSeparator = format.match(/\W{1}/gi);
      // let output = '';
      // //let t1 = //value.match(/\w{1,4}/gi);
      // //let d1 = //value.match(/\W{1}/gi);
      // let day = new Date(value).getDate().toString();
      // let month = new Date(value).getMonth().toString();
      // let year = new Date(value).getFullYear().toString();
      // if(isNaN(+day) || isNaN(+year) || isNaN(+month)){
      //   //let sep = value.match(/\D{1,}/gi);
      //   let date = value.match(/\d{1,}/gi);
      //   year = date[2];
      //   day = date[0];
      //   month = date[1];
      // }
      // let dcnt = 0;
      // let mcnt = 0;
      // let ycnt = 0;
      // let scnt = 0;
      // let cnt = 0;
      // //let formatSplited = format.split(format.match(/\D{1,}/gi)[0]);
      //
      // let separators = ['/','.','-'];
      //
      // template.forEach(function (elem,index) {
      //   if(this[index].toLowerCase() === 'mm'){
      //     output += +month < 10 ? '0' + +month : month;
      //     cnt++;
      //   }
      //   else if(this[index].toLowerCase() === 'm'){
      //     output += +month < 10 ? +month : month;
      //     cnt++;
      //   }
      //   else if(this[index].toLowerCase() === 'dd'){
      //     output += +day < 10 ? '0' + +day : day;
      //     cnt++;
      //   }
      //   else if(this[index].toLowerCase() === 'd'){
      //     output += +day < 10 ? +day : day;
      //     cnt++;
      //   }
      //   else if(this[index].toLowerCase() === 'mm'){
      //     output += +month < 10 ? '0' + +month : month;
      //     cnt++;
      //   }
      //   else if(this[index].toLowerCase() === 'm'){
      //     output += +month < 10 ? +month : month ;
      //     cnt++;
      //   }
      //   else if(this[index].toLowerCase() === 'dd'){
      //     output += +day < 10 ? '0' + +day : day;
      //     cnt++;
      //   }
      //   else if(this[index].toLowerCase() === 'd'){
      //     output += +day < 10 ? +day : day;
      //     cnt++;
      //   }
      //   else if(this[index].toLowerCase() === 'yyyy'){
      //     output += year;
      //     cnt++;
      //   }
      //   else if(this[index].toLowerCase() === 'yy'){
      //     output += year.substr(2,year.length);
      //     cnt++;
      //   }
      //   if(cnt < 3){
      //     output += tSeparator[0];
      //   }
      // },template);
      // try {
      //   if(cnt <  3){
      //     throw new this.FormatError();
      //   }
      // }
      // catch (e) {
      //   output = 'date template format error'
      // }
      //
      // // format.split('').forEach((elem) =>{
      // //   switch (elem.toLowerCase()){
      // //     case 'm':
      // //       mcnt++;
      // //       break;
      // //     case 'd':
      // //       dcnt++;
      // //       break;
      // //     case 'y':
      // //       ycnt++;
      // //       break;
      // //     default:
      // //       if(separator != elem){
      // //         separator = elem;
      // //       }
      // //   }
      // // });
      // // if(dcnt == 2){
      // //   if(+day >= 0 && +day < 10){
      // //     day = '0' + day;
      // //   }
      // // }
      // // if(mcnt == 2){
      // //   if(+month >= 0 && +month < 10){
      // //     month = '0' + month;
      // //   }
      // // }
      // // if(ycnt === 2){
      // //   year = year.substr(2,2);
      // // }
      // return output;//`${day}${separator}${month}${separator}${year}`;
  }
}
