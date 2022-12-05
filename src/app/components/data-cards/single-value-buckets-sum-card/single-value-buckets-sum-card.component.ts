import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';

import { ApiService } from '../../../@services/api.service';
import { NbDateService, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'single-value-buckets-sum-card',
  templateUrl: './single-value-buckets-sum-card.component.html',
  styleUrls: ['./single-value-buckets-sum-card.component.scss']
})
export class SingleValueBucketsSumCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() unidades: any = '';
  @Input() format: string = '1.2-2'
  @Input() variable: string = null;
  @Input() buckets: string = null;
  @Input() stat: string = null;
  @Input() scope: string = null;
  @Input() scope_id: string = null;
  @Input() start: Date = null;
  @Input() end: Date = null;
  

  value: number =  null;
  loading: boolean = false;

  constructor(
    private apiService: ApiService,
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
      this.variable,
      this.buckets,
      this.stat,
      this.scope,
      this.scope_id,
      this.dateService.format(this.start, 'yyyy-MM-dd'), 
      this.dateService.format(this.end, 'yyyy-MM-dd')
    ); 
  }

  load(variable, buckets, stat, scope, scope_id, start, end): void {
    
    const params = {
      stat: stat,
      buckets: buckets, //En esta card el input es bucket en singular porque solo acepta un valor pero el paramentro en la api es en plural.
      scope: scope,
      scope_id: scope_id,
      start: start, 
      end: end, 
    };
    if (!buckets) {
      delete params.buckets;
    }
    else {
      params.buckets = params.buckets.replace(/'/g,'"');
    }
    if (variable && buckets && stat && scope && scope_id && start && end) {
      this.loading = true;
      this.apiService.getVariable(variable, params).subscribe(
        response => {
          if (!Array.isArray(response.value)) {
            this.value = response.value;
          }
          else {
            this.value = response.value.reduce((n, {value}) => n + value, 0);
          }          
          this.loading = false;
        }, 
        error => {
          const status: NbComponentStatus = 'danger';
          const message = variable;
          const title = error.hasOwnProperty('error') ? error.error.message : error.statusText;
          const toastRef: NbToastRef = this.toastrService.show(message, title, { status });
          this.loading = false;
        }
      );
    }




  }


}
