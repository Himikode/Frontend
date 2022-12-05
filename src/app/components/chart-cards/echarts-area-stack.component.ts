import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ApiService } from '../../@services/api.service';
import { NbDateService } from '@nebular/theme';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'echarts-area-stack',
  template: `
    <div class="row">
      <div class="col-12">
      </div>
      <div class="mt-3 col-12">
        <div #chart echarts [options]="options" class="echart" *ngIf="loaded"></div>
      </div>
    </div>
  `,
})
export class EchartsAreaStackComponent implements OnDestroy, OnInit, AfterViewInit {
  options: any = {};
  loaded: boolean = false;
  themeSubscription: any;
  @Input() venues: any;
  @Input() variables: string;
  @Input() start: Date;
  @Input() end: Date;

  constructor(
    private theme: NbThemeService,
    private apiService: ApiService,
    protected dateService: NbDateService<Date>
  ) {
  }


  ngOnInit(): void {
    this.refresh([], this.dateService.format(this.start, 'yyyy-MM-dd'), this.dateService.format(this.end, 'yyyy-MM-dd'), this.variables);
  }

  ngAfterViewInit() {
  }



  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }


  refresh(venues, start, end, variables): void {

    const tasks$ = [];

    if (venues) {

      venues.forEach(venue_id => {
        tasks$.push(this.apiService.localizacionSeries(venue_id, {start: start, end: end, variables: variables, ivar: 'time' }));
      });

      forkJoin(...tasks$).subscribe(
        results => { 
          for( let i = 0; i < results.length; i++ ) {
            this.options.legend.data.push(results[i].venue.nombre);
            this.options.xAxis[0].data = results[i].series.labels;

            let serie = {
              name: results[i].venue.nombre,
              type: 'line',
              stack: 'Total amount',
              areaStyle: { normal: { opacity: echarts.areaOpacity } },
              data: results[i].series.data[0]
            };
            this.options.series.push(serie);
          }
        },
        error => {
          console.log(error);
        },
        () => {
          this.loaded = true;
        }
      );

    }





  }


}
