import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { ApiService } from '../../../@services/api.service';
import { NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';
import { PageFilterService } from '../../../@services/page-filter.service';

@Component({
  selector: 'account-devices-status-card',
  templateUrl: './account-devices-status-card.component.html',
  styleUrls: ['./account-devices-status-card.component.scss']
})
export class AccountDevicesStatusCardComponent implements OnInit {

  @Input() scope_id: string = '';
  delegaciones: any = [];
  cafeteras: any = {
    on: 0,
    off: 0
  }
  molinos: any = {
    on: 0,
    off: 0
  }

  constructor(
    private apiService: ApiService,
    private toastrService: NbToastrService,
    private pageFilterService: PageFilterService
  ) { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {
    this.load(
      this.scope_id,
    ); 
  }


  load(account_id): void {

    if (account_id ) {
      this.apiService.cuenta(account_id).subscribe(
        response => {

          response.cuenta.localizaciones_agrupaciones.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))

          response.cuenta.localizaciones_agrupaciones.forEach(del => {
            this.delegaciones.push({
              on: 0,
              off: 0,
              nombre: del.nombre,
              id: del.id
            });

            del.localizaciones.forEach(loc => {
              loc.dispositivos.forEach(dvc=> {
                if (dvc.estado == 'conectado') {
                  this.delegaciones[this.delegaciones.length-1].on = this.delegaciones[this.delegaciones.length-1].on + 1;
                  if (dvc.tipo_dispositivo.nombre.indexOf('Moli')===0) {
                    this.molinos.on = this.molinos.on +1;
                  }
                  if (dvc.tipo_dispositivo.nombre.indexOf('Cafe')===0) {
                    this.cafeteras.on = this.cafeteras.on +1;
                  }
                }
                if (dvc.estado == 'desconectado') {
                  this.delegaciones[this.delegaciones.length-1].off = this.delegaciones[this.delegaciones.length-1].off + 1;
                  if (dvc.tipo_dispositivo.nombre.indexOf('Moli')===0) {
                    this.molinos.off = this.molinos.off +1;
                  }
                  if (dvc.tipo_dispositivo.nombre.indexOf('Cafe')===0) {
                    this.cafeteras.off = this.cafeteras.off +1;
                  }
                }                
              });

            })
          });
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

  goto(scope_id) {

    let filter = this.pageFilterService.currentFilter.value;
    filter.scope = 'venue_grp';
    filter.scope_id =  scope_id;

    this.pageFilterService.setFilter(filter);
  }


}
