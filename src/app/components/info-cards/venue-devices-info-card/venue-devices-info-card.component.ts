import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from '../../../@services/api.service';
import { NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';
import { debug } from 'console';



@Component({
  selector: 'venue-devices-info-card',
  templateUrl: './venue-devices-info-card.component.html',
  styleUrls: ['./venue-devices-info-card.component.scss']
})
export class VenueDevicesInfoCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() scope: string = null;
  @Input() scope_id: string = null;

  localizacion: any = null;

  constructor(
    private apiService: ApiService,
    private toastrService: NbToastrService
  ) { }
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load(
      this.scope,
      this.scope_id,
    ); 
  }

  load(scope, scope_id): void {
    const params = {
      scope: scope,
      scope_id: scope_id,
    };
    if (scope && scope_id ) {
      this.localizacion = null;
      this.apiService.localizacion(scope_id).subscribe(
        response => {
          this.localizacion = response.localizacion;

          //Filtramos los caudalimetros
          this.localizacion.dispositivos = this.localizacion.dispositivos.filter( device => device.tipo_dispositivo.nombre.indexOf('Cauda') == -1 );

          //metemos ordinal por tipo de dispositivo
          let tipos = {};
          this.localizacion.dispositivos.forEach(element => {
            if (tipos.hasOwnProperty(element.tipo_dispositivo.nombre)) {
              tipos[element.tipo_dispositivo.nombre] = tipos[element.tipo_dispositivo.nombre] + 1;
            }
            else {
              tipos[element.tipo_dispositivo.nombre] = 1;
            }
            element.displayName = element.tipo_dispositivo.nombre +' '+tipos[element.tipo_dispositivo.nombre];
          });
          this.localizacion.dispositivos.sort((a,b) => (a.displayName > b.displayName) ? 1 : ((b.displayName > a.displayName) ? -1 : 0))
        }, 
        error => {
          const status: NbComponentStatus = 'danger';
          const message = 'Info error';
          const title = error.hasOwnProperty('error') ? error.error.message : error.statusText;
          const toastRef: NbToastRef = this.toastrService.show(message, title, { status });
        }
      );
    }
  }



}
