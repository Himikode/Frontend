import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';

import { ApiService } from '../../../@services/api.service';
import { NbDateService, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'relation-card',
  templateUrl: './relation-card.component.html',
  styleUrls: ['./relation-card.component.scss']
})
export class RelationCardComponent implements OnInit, OnDestroy  {

  @Input() title: string = '';
  @Input() unidades: any = '';
  @Input() unidades_variable_base: string = '';
  @Input() format: string = '1.2-2'
  @Input() variable: string = null;
  @Input() variable_base: string = null;
  @Input() bucket: string = null;
  @Input() bucket_variable_base: string = null;
  @Input() stat: string = null;
  @Input() stat_variable_base: string = null;
  @Input() scope: string = null;
  @Input() scope_id: string = null;
  @Input() start: Date = null;
  @Input() end: Date = null;
  @Input() factor: number = 1;
  

  value: number =  null;
  value_base: number =  null;
  unidades_splitted: string[] = [];
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
      this.variable_base,
      this.bucket,
      this.bucket_variable_base,
      this.stat,
      this.scope,
      this.scope_id,
      this.dateService.format(this.start, 'yyyy-MM-dd'), 
      this.dateService.format(this.end, 'yyyy-MM-dd')
    ); 
  }

  load(variable, variable_base, bucket, bucket_variable_base, stat, scope, scope_id, start, end): void {
    
    const params = {
      stat: stat,
      scope: scope,
      buckets: bucket, //En esta card el input es bucket en singular porque solo acepta un valor pero el paramentro en la api es en plural.
      scope_id: scope_id,
      start: start, 
      end: end, 
    };
    if (!bucket) {
      delete params.buckets;
    }      
    const params_base = {
      stat: stat,
      scope: scope,
      buckets: bucket_variable_base,
      scope_id: scope_id,
      start: start, 
      end: end, 
    };      
    if (!bucket_variable_base) {
      delete params_base.buckets;
    } 

    if (variable && variable_base && stat && scope && scope_id && start && end) {
      let promises = [];
      promises[0] = this.apiService.getVariable(variable, params);
      promises[1] = this.apiService.getVariable(variable_base, params_base);
      this.loading = true;
      forkJoin(promises[0], promises[1]).subscribe(
        (res:any[]) => {
          let value_base = (res[1].value/res[1].value);
          this.value_base = value_base ? value_base : 0;
          let value = (res[0].value/res[1].value);
          this.value = value ? value : 0;
          this.loading = false;
        },
        (error) => {
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
