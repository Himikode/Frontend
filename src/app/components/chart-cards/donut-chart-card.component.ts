import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';
import { NbThemeService, NbDateService, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';

import { ApiService } from '../../@services/api.service';

import { ChartComponent } from 'angular2-chartjs';
import { AUTO_STYLE } from '@angular/animations';


@Component({
  selector: 'donut-chart-card',
  template: `
<nb-card size="small" [nbSpinner]="loading">
  <nb-card-header>
    <div class="row">
      <div class="col-auto title">{{title}}</div>
    </div>
  </nb-card-header>
  <nb-card-body>  
    <div class="row" *ngIf="legends_custom.length > 0">

    </div>  
    <div class="row">
      <div class="col">
        <chart #chart type="doughnut" [data]="data" [options]="options"></chart>
      </div>
      <div class="col" *ngIf="legends_custom.length > 0">
        <ul class="legend">
          <li *ngFor="let item of legends_custom">
            <span style="background-color: {{ item.color }}"></span> {{ item.label }}
          </li>
        </ul>      
      </div>
    </div>
  </nb-card-body>  
</nb-card>      
  `,  
  styles: [
    '.legend { list-style: none; padding-left: 15px; }',
    '.legend li { float: left; margin-right: 15px; font-size: 14px; }',
    '.legend span { float: left; width: 15px; height: 15px; margin: 2px 5px; border-radius: 5px; }',  
  ]
})


export class DonutChartCardComponent implements OnDestroy, OnInit, AfterViewInit {
  data: any = null;
  @Input() title: string = '';
  @Input() scope: string = '';
  @Input() scope_id: string = '';
  @Input() variable: string;
  @Input() stat: string;
  @Input() buckets_config: string = null;
  @Input() start: Date;
  @Input() end: Date;
  @Input() color_set: string = 'frio';
  @ViewChild("chart") chart: ChartComponent;

  @Input() factor: number = null;
  @Input() format: string = '1.0-1'

  colorScheme: any;
  themeSubscription: any;
  options: any;
  options2: any;
  chartJsTemplateOptions; any;
  colors: any = [];
  legends_custom: any[] = [];
  loading: boolean = false;


  constructor(
    private theme: NbThemeService,
    private apiService: ApiService,
    protected dateService: NbDateService<Date>,
    private toastrService: NbToastrService
  ) {
;
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
        responsive: false,
        legend: false,
        // legend: {
        //   labels: {
        //     fontColor: this.chartJsTemplateOptions.textColor,
        //     boxWidth:  this.chartJsTemplateOptions.legend.labels.boxWidth,
        //   },
        //   position: this.chartJsTemplateOptions.legend.position
        // },
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
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
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
      this.loading = true;
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

          //Formateo
          for( let i=0; i<this.data.datasets.length; i++ ) {
            for( let j=0; j<this.data.datasets[i].data.length; j++ ) {
              if ( this.factor ) {
                this.data.datasets[i].data[j] = this.data.datasets[i].data[j] / this.factor;
              }
              this.data.datasets[i].data[j] = this.data.datasets[i].data[j].toFixed(2);
            }
          }

          this.legends_custom = [];
          this.data.labels.forEach((el, index) => {
            const item = {
              label: el,
              color: this.colors[index]
            };
            this.legends_custom.push(item);
          });
          this.chart.chart.update();
          this.loading = false;
        },
        (error) => {
          const status: NbComponentStatus = 'danger';
          const message = variable;
          const title = error.hasOwnProperty('error') ? error.error.message : error.statusText;
          const toastRef: NbToastRef = this.toastrService.show(message, title, { status });
          this.loading = false;
        }
      );    }
  }
}
