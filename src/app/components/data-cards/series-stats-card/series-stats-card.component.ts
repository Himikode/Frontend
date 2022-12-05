import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';

import { ApiService } from '../../../@services/api.service';
import { NbDateService, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';
import { debug } from 'console';

@Component({
  selector: 'series-stats-card',
  templateUrl: './series-stats-card.component.html',
  styleUrls: ['./series-stats-card.component.scss']
})
export class SeriesStatsCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() unidades: any = '';
  @Input() format: string = '1.1-1'
  @Input() format_avg: string = '1.2-2'
  @Input() variable: string = null;
  @Input() buckets_config: string = null;
  @Input() ivar: string = '';
  @Input() epoch: string = '';  
  @Input() stat: string = null;
  @Input() scope: string = null;
  @Input() scope_id: string = null;
  @Input() start: Date = null;
  @Input() end: Date = null;

  stats: any = [];

  buckets_data: any[] =  [];
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
    this.stats = [];
    this.load(
      this.variable,
      this.stat,
      this.buckets_config,
      this.scope,
      this.scope_id,
      this.dateService.format(this.start, 'yyyy-MM-dd'), 
      this.dateService.format(this.end, 'yyyy-MM-dd'), 
      this.ivar,
      this.epoch
    );      
  }

  load(variable, stat, buckets_config, scope, scope_id, start, end, ivar, epoch): void {

    const params = {
      stat: stat,
      scope: scope,
      scope_id: scope_id,
      buckets: null,
      start: start, 
      end: end, 
      ivar: ivar,
      epoch: epoch
    };
    if (!buckets_config) {
      delete params.buckets;
    }
    else if (typeof buckets_config == 'object') {
      params.buckets = buckets_config.map(obj => {
        return obj.bucket
      }).join(';');
    }
    else if (typeof buckets_config == 'string') {
      params.buckets = buckets_config;
    }

    if (variable && stat && scope && scope_id && start && end) {
      this.loading = true;
      this.apiService.series(variable, params).subscribe(
        response => {
          let serie = [];
          //Si hay buckets data traerá una serie por cada uno, como esta card está pensada para una
          //sola variable y bucket pillamos la primera
          if (params.buckets) {
            serie = response.series.data[0];
          }
          else {
            serie = response.series.data;
          }

          const total_sum = serie.reduce(function(sum, current) {
            return sum + current;
          }, 0);
          const max = Math.max(...serie);
          const min = Math.min(...serie);

          if (this.epoch) {
            const date1 = new Date(start);
            const date2 = new Date(end);
            var diff = date2.getTime() - date1.getTime();
          }

          let media = 0;
          let media_label = 'media ';
          switch (this.epoch) {
            case 'day': media = total_sum / (diff / (1000 * 3600 * 24 * 1)); media_label += ' diaria';break;
            case 'week': media = total_sum / (diff / (1000 * 3600 * 24 * 7)); media_label += ' semana,';break;
            case 'month': media = total_sum / (diff / (1000 * 3600 * 24 * 30)); media_label += ' mensual';break;
          }


          if (typeof total_sum) {
            this.stats.push({label: 'total', value: total_sum});
          }
          if (typeof max) {
            this.stats.push({label: 'max', value: max});
          }
          if (typeof min) {
            this.stats.push({label: 'min', value: min});
          }
          if (typeof media) {
            this.stats.push({label: media_label, value: media});
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
