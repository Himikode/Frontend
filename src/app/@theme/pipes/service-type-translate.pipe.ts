import { Input, Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../constants';

@Pipe({ name: 'ngxRound' })
export class ServicePipeTranslatePipe implements PipeTransform {

  transform(input: number) {
    //console.log(Constants.tipos_servicio);
    
    if (Constants.tipos_servicio.hasOwnProperty(input)) {
        return Constants.tipos_servicio[input];
    }
    return input;
  }
}
