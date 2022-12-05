import { Component, OnDestroy, AfterViewInit, OnInit, Input, SimpleChanges } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from '../../../@services/user.service';
import { ApiService } from '../../../@services/api.service';
import { NbDateService, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'organization-table-card',
  templateUrl: './organization-table-card.component.html',
  styleUrls: ['./organization-table-card.component.scss']
})
export class OrganizationTableCardComponent implements OnInit {

  rows = [];
  columns = [];
  ColumnMode = ColumnMode;

  @Input() title: string = '';
  @Input() index: string = null;
  @Input() campos: any[] = [];
  @Input() start: Date = null;
  @Input() end: Date = null;


  constructor(
    private apiService: ApiService,
    private userService: UserService,
    protected dateService: NbDateService<Date>,
    private toastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    const usuario = this.userService.currentUser.value;
    if (usuario) {
      this.rows = [...usuario.acceso_localizaciones_agrupaciones];
      this.rows.forEach(agrupacion => {
        agrupacion.treeStatus = (agrupacion.localizaciones.length > 0) ? 'collapsed':'disabled';
        agrupacion.type = 'root';
        agrupacion.localizaciones.forEach(localizacion => {
          localizacion.type = 'leaf';
          localizacion.agrupacion_id = agrupacion.id;
          localizacion.treeStatus = 'disabled';
          this.rows.push(localizacion);
        });
      });

      this.campos.forEach(campo => {
        if (campo.hasOwnProperty('variable')) {
          this.rows.forEach((el, indice) => {
            if (el.type == 'root') {
              el.treeStatus = (el.localizaciones.length > 0) ? 'collapsed':'disabled';
              this.loadVariable(
                campo.variable,
                campo.stat,
                this.dateService.format(this.start, 'yyyy-MM-dd'), 
                this.dateService.format(this.end, 'yyyy-MM-dd'),
                'venue_grp',
                el.id,
                campo.prop,
                campo.pipe,
                indice
              ); 
            }
            if (el.type == 'leaf') {
              delete el[campo.prop];
            }
          });
        }
      });
    }
  }

  loadVariable(variable, stat, start, end, scope, scope_id, prop, pipe, indice): void {
    const params = {
      stat: stat,
      scope: scope,
      scope_id: scope_id,
      start: start, 
      end: end, 
    };        
    let rows = [...this.rows];
    this.apiService.getVariable(variable, params).subscribe(
      response => {
        if (pipe) {
          rows[indice][prop] = pipe.transform(response.value);
        }
        else {
          rows[indice][prop] = response.value;
        }
      }, 
      error => {
        const status: NbComponentStatus = 'danger';
        const message = variable;
        const title = error.hasOwnProperty('error') ? error.error.message : error.statusText;
        const toastRef: NbToastRef = this.toastrService.show(message, title, { status });
      },
      () => {
        this.rows = rows;
      }
    );
  }







  onTreeAction(event: any) {
    const index = event.rowIndex;
    const row = event.row;

    if (row.treeStatus === 'collapsed') {
      row.treeStatus = 'expanded';
    } else {
      row.treeStatus = 'collapsed';
    }

    this.campos.forEach(campo => {
      if (campo.hasOwnProperty('variable')) {
        this.rows.forEach((el, indice) => {
          if (!el.hasOwnProperty(campo.prop)) { // Para no recargar desde la api si ya está calculado
            if (el.hasOwnProperty('agrupacion_id')) {
              if (el.agrupacion_id == row.id) {
                this.loadVariable(
                  campo.variable,
                  campo.stat,
                  this.dateService.format(this.start, 'yyyy-MM-dd'), 
                  this.dateService.format(this.end, 'yyyy-MM-dd'),
                  'venue',
                  el.id,
                  campo.prop,
                  campo.pipe,
                  indice
                ); 
              }
            }
          }
        });
      }
    });

    this.rows = [...this.rows];
  }



}
