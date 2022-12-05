import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';

import { ApiService } from '../../../@services/api.service';
import { NbDateService, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'deviation-card',
  templateUrl: './deviation-card.component.html',
  styleUrls: ['./deviation-card.component.scss']
})
export class DeviationCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() unidades: string = '';
  @Input() format: string = '1.0-0'
  @Input() variables: string = null;
  @Input() variable_names: string = null;
  @Input() stat: string = null;
  @Input() scope: string = null;
  @Input() scope_id: string = null;
  @Input() start: Date = null;
  @Input() end: Date = null;

  value_1: number = null;
  value_2: number = null;
  fraud_percent: number = null;
  fraud_level_class: string = '';
  fraud_text: string = '';
  unidades_splitted: string[] = [];
  variable_names_splitted: string[] = [];
  loading: boolean = false;

  constructor(
    private apiService: ApiService,
    protected dateService: NbDateService<Date>,
    private toastrService: NbToastrService
  ) {

  }

  ngOnInit(): void {

    


    this.unidades_splitted = this.unidades.split(';');
    this.variable_names_splitted = this.variable_names.split(';');
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load(
      this.variables,
      this.stat,
      this.scope,
      this.scope_id,
      this.dateService.format(this.start, 'yyyy-MM-dd'), 
      this.dateService.format(this.end, 'yyyy-MM-dd')
    ); 
  }

  load(variables, stat, scope, scope_id, start, end): void {
    
    if (variables && stat && scope && scope_id && start && end) {

      variables = variables.split(';');
      
      const params = {
        stat: stat,
        scope: scope,
        scope_id: scope_id,
        start: start, 
        end: end, 
      };

      let promises = [];
      variables.forEach((variable, key) => {
        promises[key] = this.apiService.getVariable(variable, params);
      });

      this.loading = true;
      forkJoin(promises[0], promises[1]).subscribe(
        (res:any[]) => {
          this.value_1 = res[0].value;
          this.value_2 = res[1].value;

          this.fraud_percent = ((this.value_1 - this.value_2) / this.value_1) * 100;
          this.fraud_percent = isNaN(this.fraud_percent) ? -1000000000 : this.fraud_percent;
          if (this.fraud_percent > 40) {
            this.fraud_level_class = 'text-danger';
            this.fraud_text = 'Posible nivel alto de fraude';
          }
          else if (this.fraud_percent > 25) {
            this.fraud_level_class = 'text-warning';
            this.fraud_text = 'Posible nivel medio de fraude';
          }
          else if (this.fraud_percent > 10) {
            this.fraud_level_class = 'text-info';
            this.fraud_text = 'Posible nivel bajo de fraude';
          }
          else if (this.fraud_percent < 0) {
            this.fraud_level_class = 'desperdicio';
            this.fraud_text = 'Posible desperdicio';
          }
          else {
            this.fraud_level_class = 'text-info';
            this.fraud_text = 'Sin Fraude';
          }      
          this.loading = false;
        },
        (error) => {
          const status: NbComponentStatus = 'danger';
          const message = variables;
          const title = error.hasOwnProperty('error') ? error.error.message : error.statusText;
          const toastRef: NbToastRef = this.toastrService.show(message, title, { status });
          this.loading = false;
        }        
      );
    }


  }






}
