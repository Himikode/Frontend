import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { ApiService } from '../../@services/api.service';
import { NbDateService } from '@nebular/theme';

import { ChartComponent } from 'angular2-chartjs';
import { debug } from 'console';

@Component({
  selector: 'chartjs-bar-card',
  template: `
    <div class="row">
      <div class="mt-3 col-12">
        <chart #chart type="bar" [data]="data" [options]="options" style="height: 25vh;"></chart>
      </div>
    </div>
  `
})
export class ChartjsBarVerticalComponent implements OnDestroy, OnInit, AfterViewInit {
  data: any;
  @Input() scope: string = '';
  @Input() scope_id: string = '';
  @Input() variables: string;
  @Input() stat: string;
  @Input() ivar: string = '';
  @Input() epoch: string = '';
  @Input() start: Date;
  @Input() end: Date;
  options: any;
  themeSubscription: any;
  @ViewChild("chart") bar: ChartComponent;


  constructor(
    private theme: NbThemeService,
    private apiService: ApiService,
    protected dateService: NbDateService<Date>
  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: [],
        datasets: [{
          data: [],
          label: '',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }
  ngOnInit(): void {
    //No hace falta el load en el OnInit poruqe se dispara el OnChanges tb al iniciar
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('start') && changes.hasOwnProperty('end')) {
      this.load(
        this.variables,
        this.stat,
        this.scope,
        this.scope_id,
        this.dateService.format(this.start, 'yyyy-MM-dd'), 
        this.dateService.format(this.end, 'yyyy-MM-dd'), 
        this.ivar,
        this.epoch
      );      
    }
  }

  load(variable, stat, scope, scope_id, start, end, ivar, epoch): void {

    this.apiService.series(variable, {
      stat: stat,
      scope: scope,
      scope_id: scope_id,
      start: start, 
      end: end, 
      ivar: ivar, 
      epoch: epoch 
    }).subscribe(
      response => {

        this.data.labels = response.series.labels;
        this.data.datasets = Array();
        for( let i=0; i<response.series.data.length; i++ ) {
          this.data.datasets.push({
            data: response.series.data[i],
            label: response.series.series[i]
          });
        }
        this.bar.chart.update();
      }
    );

  }




}
