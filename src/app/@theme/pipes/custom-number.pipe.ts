import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { isNumeric } from 'rxjs/internal-compatibility';

@Pipe({
  name: 'customNumber'
})
export class CustomNumberPipe extends DecimalPipe implements PipeTransform {
  constructor () {
    super('es');
  }
  transform(value, format = ''): any {
    const transformed = super.transform(value, format);
    if (typeof transformed == 'string') {
        //return transformed.replace(".", "");
    }
    return transformed;
  }

}