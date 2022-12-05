import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';

import { ApiService } from '../../../@services/api.service';
import { NbDateService, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';
import { debug } from 'console';

@Component({
  selector: 'bucket-list-card',
  templateUrl: './bucket-list-card.component.html',
  styleUrls: ['./bucket-list-card.component.scss']
})
export class BucketListCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() unidades: any = '';
  @Input() format: string = '1.1-1'
  @Input() variable: string = null;
  @Input() buckets: string = null;
  @Input() stat: string = null;
  @Input() scope: string = null;
  @Input() scope_id: string = null;
  @Input() start: Date = null;
  @Input() end: Date = null;

  loading: boolean = false;
  buckets_data: any[] =  [];

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
      buckets: buckets,
      scope: scope,
      scope_id: scope_id,
      start: start, 
      end: end, 
    };
    if (!buckets) {
      delete params.buckets;
    }
    if (variable && buckets && stat && scope && scope_id && start && end) {
      this.loading = true;
      this.apiService.getVariable(variable, params).subscribe(
        response => {
          if (!Array.isArray(response.value)) {
            this.buckets_data = [{'bucket': this.variable, 'value': response.value}];
          }
          this.buckets_data = response.value;
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
