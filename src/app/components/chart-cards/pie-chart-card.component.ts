import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ApiService } from '../../@services/api.service';
import { NbDateService } from '@nebular/theme';

import { ChartComponent } from 'angular2-chartjs';


@Component({
  selector: 'pie-chart-card',
  template: `
<nb-card>
  <nb-card-header>
    <div class="row">
      <div class="col-auto title">{{title}}</div>
      <div class="col subtitle text-right" *ngIf="subtitle"><small [innerHtml]="subtitle"></small></div>
    </div>
  </nb-card-header>
  <nb-card-body>  
    <div class="row">
      <div class="col-12">
        <chart #chart type="pie" [data]="data" [options]="options"></chart>
      </div>
    </div>
  </nb-card-body>  
</nb-card>      
  `,  
  styles: [

  ]
})


export class PieChartCardComponent implements OnDestroy, OnInit, AfterViewInit {
  data: any = null;
  @Input() title: string = '';
  @Input() subtitle: string = '';  
  @Input() scope: string = '';
  @Input() scope_id: string = '';
  @Input() variable: string;
  @Input() stat: string;
  @Input() buckets_config: string = null;
  @Input() start: Date;
  @Input() end: Date;
  @Input() color_set: string = 'frio';
  @ViewChild("chart") chart: ChartComponent;

  colorScheme: any;
  themeSubscription: any;
  options: any;
  chartJsTemplateOptions; any;
  colors: any = [];


  constructor(
    private theme: NbThemeService,
    private apiService: ApiService,
    protected dateService: NbDateService<Date>
  ) {
  }

  ngOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.colors = config.variables.colors[this.color_set];
      this.chartJsTemplateOptions = config.variables.chartjs;

      this.data = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: this.colors,
        }],
      };      
      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: this.chartJsTemplateOptions.textColor,
          },
          position: 'right'
        },
      };
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load(
      this.variable,
      this.stat,
      this.buckets_config,
      this.scope,
      this.scope_id,
      this.dateService.format(this.start, 'yyyy-MM-dd'), 
      this.dateService.format(this.end, 'yyyy-MM-dd'), 
    );      
  }



  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }


  load(variable, stat, buckets_config, scope, scope_id, start, end): void {
    const params = {
      stat: stat,
      buckets: null,
      scope: scope,
      scope_id: scope_id,
      start: start, 
      end: end, 
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
      this.apiService.getVariable(variable, params).subscribe(
        response => {
          this.data.datasets[0].data = response.value.map(element => {
            return element.value;
          });
          this.data.labels = response.value.map(element => {
            return element.bucket;
          });

          if (typeof buckets_config == 'object') {
            let bucket_config = null;
            for (let i=0; i<this.data.labels.length; i++) {
              bucket_config = buckets_config.find(b => b.bucket == this.data.labels[i]);
              this.data.labels[i] = bucket_config.label;
            }
          }
          this.chart.chart.update();
        }
      );
    }
  }
}
