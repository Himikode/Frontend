import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';

import { ApiService } from '../../../@services/api.service';
import { NbDateService, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'cup-quality-card',
  templateUrl: './cup-quality-card.component.html',
  styleUrls: ['./cup-quality-card.component.scss']
})
export class CupQualityCardComponent implements OnInit, OnDestroy  {

  @Input() title: string = '';
  @Input() scope: string = null;
  @Input() scope_id: string = null;
  @Input() start: Date = null;
  @Input() end: Date = null;
  @Input() tipo: string = null;
  

  rate: number =  null;
  peso_molienda_rate = 0;
  tiempo_servicio_rate = 0;
  volumen_agua_rate = 0;
  error = null;
  loading: boolean = false;

  constructor(
    private apiSvc: ApiService,
    protected dateService: NbDateService<Date>,
    private toastrService: NbToastrService
  ) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load(
      this.scope,
      this.scope_id,
      this.dateService.format(this.start, 'yyyy-MM-dd'), 
      this.dateService.format(this.end, 'yyyy-MM-dd'),
      this.tipo
    ); 
  }

  load(scope, scope_id, start, end, tipo): void {

    const params = {
      scope: scope,
      scope_id: scope_id,
      start: start, 
      end: end, 
    };

    if (scope && scope_id && start && end) {
      this.loading = true;
      this.apiSvc.getCalidadTaza(tipo, params).subscribe(
        response => {
          this.error = null;
          this.rate = response.value;
          this.peso_molienda_rate = response.variables['peso-molienda'].rate*20;
          this.tiempo_servicio_rate = response.variables['tiempo-elaboracion'].rate*20;
          this.volumen_agua_rate = response.variables['volumen-elaboracion'].rate*20;
          this.loading = false;
        }, 
        error => {
          console.log(error);
          this.rate = -1;
          const status: NbComponentStatus = 'danger';
          const message = scope + ' ' + scope_id;
          const toastRef: NbToastRef = this.toastrService.show(message, error.statusText, { status });
          console.log(error); 
          this.loading = false;
        }
      );
    }
  }
  
  progressColor(val) {
    if (val >= 70 ) {
      return 'success';
    }
    else if (val >30) {
      return 'warning';
    }
    else {
      return 'danger';
    }
  }
}
