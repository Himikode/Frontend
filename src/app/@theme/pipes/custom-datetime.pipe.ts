import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'standarDatetime'
})
export class CustomDatetimePipe extends DatePipe implements PipeTransform {
  constructor () {
    super('es');
  }
  transform(value): any {
    let weekday, dayDiff, lastSunday;
    let valueObj = new Date(value);
    var date_march = new Date(new Date().getFullYear(),3,1,12);
    weekday = date_march.getDay();
    dayDiff = weekday===0 ? 7 : weekday;
    lastSunday = date_march.setDate(date_march.getDate() - dayDiff);

    var date_october = new Date(new Date().getFullYear(),10,1,12);
    weekday = date_october.getDay();
    dayDiff = weekday===0 ? 7 : weekday;
    lastSunday = date_october.setDate(date_october.getDate() - dayDiff);

    //value esta siempre en gmt, valueobj se crea con gmt+loquesealocal

    if ( (date_march.getTime() < valueObj.getTime()) && (valueObj.getTime() < date_october.getTime()) ) {
      let date = new Date(valueObj.getFullYear(),valueObj.getMonth(),valueObj.getDay(),valueObj.getHours()+2, valueObj.getMinutes());
      return super.transform(date, 'dd/MM/y HH:mm', 'UTC+2');
    }
    let date = new Date(valueObj.getFullYear(),valueObj.getMonth(),valueObj.getDay(),valueObj.getHours()+1, valueObj.getMinutes());
    return super.transform(date, 'dd/MM/y HH:mm', 'UTC+1');
  }

}