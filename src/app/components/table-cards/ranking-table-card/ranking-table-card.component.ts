import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';

import { ApiService } from '../../../@services/api.service';
import { NbDateService, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';

import { forkJoin } from 'rxjs';
import { PageFilterService } from '../../../@services/page-filter.service';

@Component({
  selector: 'ranking-table-card',
  templateUrl: './ranking-table-card.component.html',
  styleUrls: ['./ranking-table-card.component.scss']
})
export class RankingTableCardComponent implements OnInit {



  @Input() title: string = '';
  @Input() variable: string = null;
  @Input() stat: string = null;
  @Input() target: string = null;
  @Input() scope: string = null;
  @Input() scope_id: string = null;
  @Input() start: Date = null;
  @Input() end: Date = null;
  @Input() unidades: string = null;
  @Input() format: string = null;

  ranking = null;
  total = null;
  loading: boolean = false;

  constructor(
    private apiService: ApiService,
    protected dateService: NbDateService<Date>,
    private toastrService: NbToastrService,
    private pageFilterService: PageFilterService
  ) {

  }

  ngOnInit(): void {
       
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load(
      this.variable,
      this.stat,
      this.target,
      this.scope,
      this.scope_id,
      this.dateService.format(this.start, 'yyyy-MM-dd'), 
      this.dateService.format(this.end, 'yyyy-MM-dd')   
    ); 
  }

  load(variable, stat, target, scope, scope_id, start, end): void {

    const params_ranking = {
      stat: stat,
      scope: scope,
      scope_id: scope_id,
      target: target,
      start: start, 
      end: end, 
    };
    if (variable && stat && target &&  scope && scope_id && start && end) {

      let rankingPromise = this.apiService.getRanking(variable, params_ranking);
      let totalPromise = this.apiService.getVariable(variable, params_ranking);

      this.loading = true;
      forkJoin(totalPromise, rankingPromise).subscribe(
        (res:any[]) => {

          let ranking = res[1].value;
          ranking.sort((a,b) => b.value - a.value); // b - a for reverse sort
          
          this.ranking = ranking.slice(0, 20);
          //this.total = res[0].value;
          this.total = ranking[0].value;
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


  goto(scope_id) {

    let filter = this.pageFilterService.currentFilter.value;
    filter.scope = this.target;
    filter.scope_id =  scope_id;

    this.pageFilterService.setFilter(filter);
  }

}
