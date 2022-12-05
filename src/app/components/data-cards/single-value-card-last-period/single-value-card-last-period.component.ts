import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../@services/api.service';
import { NbDateService, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';
import { forkJoin } from 'rxjs';

import * as moment from 'moment';


@Component({
  selector: 'single-value-card-last-period',
  templateUrl: './single-value-card-last-period.component.html',
  styleUrls: ['./single-value-card-last-period.component.scss']
})
export class SingleValueCardLastPeriodComponent implements OnInit {

  @Input() title: string = '';
  @Input() unidades: any = '';
  @Input() format: string = '1.1-1'
  @Input() variable: string = null;
  @Input() bucket: string = null;
  @Input() stat: string = null;
  @Input() time_average_epoch: string = null;
  @Input() scope: string = null;
  @Input() scope_id: string = null;
  @Input() start: Date = null;
  @Input() end: Date = null;
  @Input() icon: string = null;
  

  value: number =  null;
  value_pre: number =  null;
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
      this.bucket,
      this.stat,
      this.scope,
      this.scope_id,
      this.dateService.format(this.start, 'yyyy-MM-dd'), 
      this.dateService.format(this.end, 'yyyy-MM-dd')
    ); 
  }

  load(variable, bucket, stat, scope, scope_id, start, end): void {
    
    const params = {
      stat: stat,
      buckets: bucket, //En esta card el input es bucket en singular porque solo acepta un valor pero el paramentro en la api es en plural.
      scope: scope,
      scope_id: scope_id,
      start: start, 
      end: end, 
    };
    const params_pre = {
      stat: stat,
      buckets: bucket, //En esta card el input es bucket en singular porque solo acepta un valor pero el paramentro en la api es en plural.
      scope: scope,
      scope_id: scope_id,
      start: start, 
      end: end, 
    };    
    const diff = moment(this.end).diff(moment(this.start), 'days');
    params_pre.start = moment(this.start).subtract(diff, 'days').format('YYYY-MM-DD');
    params_pre.end = moment(this.end).subtract(diff, 'days').format('YYYY-MM-DD');

    if (!bucket) {
      delete params.buckets;
      delete params_pre.buckets;
    }
    if (variable && stat && scope && scope_id && start && end) {
      let promises = [];
      promises[0] = this.apiService.getVariable(variable, params);
      promises[1] = this.apiService.getVariable(variable, params_pre);

      this.loading = true;
      forkJoin(promises[0], promises[1]).subscribe(
        (res:any[]) => {

          if (this.time_average_epoch) {
            const date1 = new Date(start);
            const date2 = new Date(end);
            var diff = date2.getTime() - date1.getTime();
          }

          let data = res[0].value;
          switch (this.time_average_epoch) {
            case 'day': this.value = data / (diff / (1000 * 3600 * 24 * 1)); break;
            case 'week': this.value = data / (diff / (1000 * 3600 * 24 * 7)); break;
            case 'month': this.value = data / (diff / (1000 * 3600 * 24 * 30)); break;
            default: this.value = data;
          }

          let data_pre = res[1].value;
          switch (this.time_average_epoch) {
            case 'day': this.value_pre = data_pre / (diff / (1000 * 3600 * 24 * 1)); break;
            case 'week': this.value_pre = data_pre / (diff / (1000 * 3600 * 24 * 7)); break;
            case 'month': this.value_pre = data_pre / (diff / (1000 * 3600 * 24 * 30)); break;
            default: this.value_pre = data_pre;
          } 

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

      /*
      this.apiService.getVariable(variable, params).subscribe(
        response => {
          let data = response.value;

          if (this.time_average_epoch) {
            const date1 = new Date(start);
            const date2 = new Date(end);
            var diff = date2.getTime() - date1.getTime();
          }
          switch (this.time_average_epoch) {
            case 'day': this.value = data / (diff / (1000 * 3600 * 24 * 1)); break;
            case 'week': this.value = data / (diff / (1000 * 3600 * 24 * 7)); break;
            case 'month': this.value = data / (diff / (1000 * 3600 * 24 * 30)); break;
            default: this.value = response.value;
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

      const diff = moment(this.end).diff(moment(this.start), 'days');
      params.start = moment(this.start).subtract(diff, 'days').format('YYYY-MM-DD');
      params.end = moment(this.end).subtract(diff, 'days').format('YYYY-MM-DD');

      this.apiService.getVariable(variable, params).subscribe(
        response => {
          let data = response.value;

          if (this.time_average_epoch) {
            const date1 = new Date(start);
            const date2 = new Date(end);
            var diff = date2.getTime() - date1.getTime();
          }
          switch (this.time_average_epoch) {
            case 'day': this.value_pre = data / (diff / (1000 * 3600 * 24 * 1)); break;
            case 'week': this.value_pre = data / (diff / (1000 * 3600 * 24 * 7)); break;
            case 'month': this.value_pre = data / (diff / (1000 * 3600 * 24 * 30)); break;
            default: this.value_pre = response.value;
          }          
        }, 
        error => {
          const status: NbComponentStatus = 'danger';
          const message = variable;
          const title = error.hasOwnProperty('error') ? error.error.message : error.statusText;
          const toastRef: NbToastRef = this.toastrService.show(message, title, { status });
        }
      );
      */



    }




  }


}
