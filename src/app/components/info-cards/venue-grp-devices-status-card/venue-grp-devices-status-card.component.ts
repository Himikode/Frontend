import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { ApiService } from '../../../@services/api.service';
import { NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'venue-grp-devices-status-card',
  templateUrl: './venue-grp-devices-status-card.component.html',
  styleUrls: ['./venue-grp-devices-status-card.component.scss']
})
export class VenueGrpDevicesStatusCardComponent implements OnInit {

  @Input() scope_id: string = '';
  localizaciones: any = [];
  cafeteras: any = {
    on: 0,
    off: 0
  }
  molinos: any = {
    on: 0,
    off: 0
  }
  cafeterasGroupByMachine: any = null;
  molinosGroupByMachine: any = null;

  constructor(
    private apiService: ApiService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load(
      this.scope_id,
    ); 
  }

  load(venue_grp_id): void {

    if (venue_grp_id ) {
      this.apiService.localizacionAgrupacion(venue_grp_id).subscribe(
        response => {

          let dispositivos = [];

          response.localizacionesAgrupacion.localizaciones.forEach(loc => {
            loc.dispositivos.forEach(dvc=> {
              dispositivos.push(dvc);
              if (dvc.estado == 'conectado') {
                if (dvc.tipo_dispositivo.nombre.indexOf('Moli')===0) {
                  this.molinos.on = this.molinos.on +1;
                }
                if (dvc.tipo_dispositivo.nombre.indexOf('Cafe')===0) {
                  this.cafeteras.on = this.cafeteras.on +1;
                }
              }
              if (dvc.estado == 'desconectado') {
                if (dvc.tipo_dispositivo.nombre.indexOf('Moli')===0) {
                  this.molinos.off = this.molinos.off +1;
                }
                if (dvc.tipo_dispositivo.nombre.indexOf('Cafe')===0) {
                  this.cafeteras.off = this.cafeteras.off +1;
                }
              }                
            });

          })

          //Filtramos los caudalimetros
          let cafeteras = dispositivos.filter( device => device.tipo_dispositivo.nombre.indexOf('Cafe') === 0 );
          let molinos = dispositivos.filter( device => device.tipo_dispositivo.nombre.indexOf('Moli') === 0 );
          //Filtramos los uqe no tengan maquina asociada
          cafeteras = cafeteras.filter(d => d.tipo_maquina !== null);
          molinos = molinos.filter(d => d.tipo_maquina !== null);

          this.cafeterasGroupByMachine = cafeteras.reduce((maquina, dispositivo) => {
            const { tipo_maquina_id } = dispositivo;
            maquina[tipo_maquina_id] = maquina[tipo_maquina_id] ?? [];
            maquina[tipo_maquina_id].push(dispositivo);
            return maquina;
          }, {});
          this.cafeterasGroupByMachine = Object.values(this.cafeterasGroupByMachine);

          this.molinosGroupByMachine = molinos.reduce((maquina, dispositivo) => {
            const { tipo_maquina_id } = dispositivo;
            maquina[tipo_maquina_id] = maquina[tipo_maquina_id] ?? [];
            maquina[tipo_maquina_id].push(dispositivo);
            return maquina;
          }, {});
          this.molinosGroupByMachine = Object.values(this.molinosGroupByMachine);

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
