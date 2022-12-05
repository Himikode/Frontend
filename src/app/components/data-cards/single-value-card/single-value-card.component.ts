import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';

import { ApiService } from '../../../@services/api.service';
import { NbDateService, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';


@Component({
  selector: 'single-value-card',
  templateUrl: './single-value-card.component.html',
  styleUrls: ['./single-value-card.component.scss']
})
export class SingleValueCardComponent implements OnInit, OnDestroy  {

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

  loading: boolean = false;
  value: number =  null;

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
    if (!bucket) {
      delete params.buckets;
    }
    if (variable && stat && scope && scope_id && start && end) {
      this.loading = true;
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
    }




  }


}
