import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ApiService } from '../../@services/api.service';
import { NbDateService } from '@nebular/theme';

import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: 'chartjs-bar-horizontal-card',
  template: `
    <div class="row">
      <div class="mt-3 col-12">
        <chart #chart type="horizontalBar" [data]="data" [options]="options"></chart>
      </div>
    </div>
  `
})
export class ChartjsBarHorizontalComponent implements OnDestroy, OnInit, AfterViewInit {
  data: any = {
    labels: [],
    datasets: []
  };

  @Input() scope: string = '';
  @Input() scope_id: string = '';
  @Input() variables: string;
  @Input() stat: string;
  @Input() ivar: string = '';
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

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        scales: {
          xAxes: [
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
          yAxes: [
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
        },
        legend: {
          position: 'right',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnInit(): void {
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
      ); 
    }
  }

  load(variable, stat, scope, scope_id, start, end, ivar): void {
    this.apiService.series(variable, {
      stat: stat,
      scope: scope,
      scope_id: scope_id,
      start: start, 
      end: end, 
      variable: variable, 
      ivar: ivar, 
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
