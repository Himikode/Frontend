import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';
import { NbThemeService, NbDateService, NbColorHelper, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';
import { ApiService } from '../../@services/api.service';
import { CustomNumberPipe } from '../../@theme/pipes';

import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: 'bar-chart-card',
  template: `
<nb-card *ngIf="!showTable" [nbSpinner]="loading">
  <nb-card-header>
    <div class="row">
      <div class="col-auto title">{{title}}</div>
    </div>
  </nb-card-header>
  <nb-card-body>
    <div class="row" *ngIf="legends_custom.length > 0">
      <ul class="legend">
        <li *ngFor="let item of legends_custom">
          <span style="background-color: {{ item.color }}"></span> {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="mt-3 col-12">
        <chart 
          #chart 
          type="bar" 
          [data]="data" 
          [options]="options" 
          style="height: 25vh;"
        >
        </chart>
      </div>
    </div>
  </nb-card-body>  
</nb-card>  

<nb-reveal-card *ngIf="showTable" [nbSpinner]="loading">
  <nb-card-front>
    <nb-card >
      <nb-card-header>
        <div class="row">
          <div class="col-auto title">{{title}}</div>
        </div>
      </nb-card-header>                  
      <nb-card-body>
        <div class="row" *ngIf="legends_custom.length > 0">
          <ul class="legend">
            <li *ngFor="let item of legends_custom">
              <span style="background-color: {{ item.color }}"></span> {{ item.label }}
            </li>
          </ul>
        </div>      
        <div class="row">
          <div class="mt-3 col-12">
            <chart 
              #chart 
              type="bar" 
              [data]="data" 
              [options]="options" 
              style="height: 25vh;"
            >
            </chart>
          </div>
        </div>
      </nb-card-body>
    </nb-card>
  </nb-card-front>
  <nb-card-back>
    <nb-card>
      <nb-card-header>
        <div class="row">
          <div class="col-auto title">Datos</div>
        </div>
      </nb-card-header>                   
      <nb-card-body>
        <div class="row">
          <div class="col-12">
            <table class="table">
              <tr>
                <td></td>
                <th *ngFor="let date of data.fechas">{{date | date:"dd MMM"}}</th>
              </tr>
              <tr *ngFor="let variable of data.datasets">
                <td>{{variable.label}}</td>
                <td *ngFor="let val of variable.data">{{val | customNumber: format}}</td>
              </tr>
            </table>
          </div>
        </div>            
      </nb-card-body>
    </nb-card>
  </nb-card-back>
</nb-reveal-card>

`,  
styles: [
  'nb-card-back { height: 100%; }',
  'nb-card-back nb-card { height: 100%; }',
  'nb-card-back nb-card nb-card-body { overflow-y: scroll!important; }',
  'nb-card-back nb-card nb-card-body table { }',
  'nb-card-back nb-card nb-card-body table th { text-align: center; color: rgba(183, 182, 180, 1); font-weight: normal; }',
  '.legend { list-style: none; padding-left: 15px; }',
  '.legend li { float: left; margin-right: 15px; font-size: 14px; }',
  '.legend span { float: left; width: 15px; height: 15px; margin: 2px 5px; border-radius: 5px; }',
]
})

export class BarChartCardComponent implements OnDestroy, OnInit, AfterViewInit {
  data: any;
  @Input() title: string = '';
  @Input() scope: string = '';
  @Input() scope_id: string = '';
  @Input() variable: string;
  @Input() stat: string;
  @Input() buckets_config: string = null;
  @Input() format: string = '1.2-2'
  @Input() factor: number = null;

  @Input() ivar: string = '';
  @Input() epoch: string = '';
  @Input() start: Date;
  @Input() end: Date;
  @Input() color_set: string = 'frio';
  @Input() showTable: boolean = false;

  options: any;
  themeSubscription: any;
  @ViewChild("chart") chart: ChartComponent;
  barColor: any;
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
  }
  ngOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables.colors;
      this.chartJsTemplateOptions = config.variables.chartjs;
      this.barColor = NbColorHelper.hexToRgbA(this.chartJsTemplateOptions.barColor, 0.8);
      this.data = {
        labels: [],
        datasets: [{
          data: [],
          label: '',
          backgroundColor: NbColorHelper.hexToRgbA(this.chartJsTemplateOptions.barColor, 0.8),
        }],
      };
      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
          labels: {
            fontColor: this.chartJsTemplateOptions.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
                color: this.chartJsTemplateOptions.axisLineColor,
              },
              ticks: {
                fontColor: this.chartJsTemplateOptions.textColor,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: true,
                color: this.chartJsTemplateOptions.axisLineColor,
              },
              ticks: {
                fontColor: this.chartJsTemplateOptions.textColor,
              },
            },
          ],
        },
      };
    });
  }

  ngAfterViewInit(): void {   
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
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
          this.data.labels = response.series.labels;
          this.data.fechas = JSON.parse(JSON.stringify(response.series.labels)); //para la tabla
          this.data.datasets = Array();

          //formateo fechas
          var dias_intervalo = Math.round(Math.abs(this.end.getTime() - this.start.getTime()) / 1000 / 60 / 60 / 24);
          response.series.labels.forEach((date, index, arr) => {
            let parts = date.split('-');
            if (dias_intervalo <= 365) {
              arr[index] = parts[2]+'/'+parts[1];
            }
            else {
              arr[index] = parts[2]+'/'+parts[1]+'/'+parts[0];
            }
          });

          if (response.series.series.length == 1) { //Si solo hay una serie hay que toquetear
            const temp = response.series.data;
            response.series.data = [];
            response.series.data[0] = temp;
          }
          let bucket_color_counter = {};
          for( let i=0; i<response.series.data.length; i++ ) {
            //Buscamos config para la serie 
            let bucket_config = null;
            if (this.buckets_config && typeof this.buckets_config == 'object') {
              const bucket_serie_name = response.series.series[i].match('/' + "(.*)" + ' ')[1].trim();
              bucket_config = buckets_config.find(b => b.bucket == bucket_serie_name);
              if ( bucket_config.hasOwnProperty('stack')) {
                if (bucket_color_counter.hasOwnProperty(bucket_config.stack)) {
                  bucket_color_counter[bucket_config['stack']] =  bucket_color_counter[bucket_config['stack']] + 1;
                }
                else {
                  bucket_color_counter[bucket_config['stack']] =  0;
                }
              }              
            }
            else {
              //Sacamos el stat del nombre de la serie
              response.series.series[i] = response.series.series[i].match("(.*)" + ' ')[1].trim();
            }
            
            //Formateo valores
            for( let j=0; j<response.series.data[i].length; j++ ) {
              if ( this.factor ) {
                response.series.data[i][j] = response.series.data[i][j] / this.factor;
              }
              response.series.data[i][j] = response.series.data[i][j].toFixed(2);
            }


            this.data.datasets.push({
              data: response.series.data[i],
              backgroundColor: bucket_config && bucket_config.hasOwnProperty('color_set') ? (bucket_config.hasOwnProperty('stack') ? this.colors[bucket_config.color_set][bucket_color_counter[bucket_config['stack']]]:this.colors[this.color_set][i]) : this.colors[this.color_set][i],
              label: bucket_config && bucket_config.hasOwnProperty('label') ? bucket_config.label:response.series.series[i],
              stack: bucket_config && bucket_config.hasOwnProperty('stack') ? bucket_config.stack:'stack',
            });

          }
          this.legends_custom = [];
          this.data.datasets.forEach(el => {
            const item = {
              label: el.label,
              color: el.backgroundColor
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
      );
    }


  }
}