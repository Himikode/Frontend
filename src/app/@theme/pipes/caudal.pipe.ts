import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Constants } from '../constants';

@Pipe({
  name: 'caudal'
})
export class CaudalPipe extends DecimalPipe implements PipeTransform {
  constructor () {
    super('es');
  }
  transform(value): any {

    

    return super.transform(value/1420, '1.3-3');
  }

}