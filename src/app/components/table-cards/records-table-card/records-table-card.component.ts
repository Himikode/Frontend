import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';

import { ApiService } from '../../../@services/api.service';
import { NbDateService, NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';
import { ColumnMode } from '@swimlane/ngx-datatable';




class FechaHoraPipe extends DatePipe {
  public transform(value): any {
    return super.transform(value, 'dd/MM/y HH:mm');
  }
}


@Component({
  selector: 'records-table-card',
  templateUrl: './records-table-card.component.html',
  styleUrls: ['./records-table-card.component.scss']
})
export class RecordsTableCardComponent implements OnInit {

  rows = [];
  columns = [];
  ColumnMode = ColumnMode;
  refresh$: any;

  @Input() title: string = '';
  @Input() unidades: string = '';
  @Input() index: string = null;
  @Input() campos: any[] = [];
  @Input() scope: string = null;
  @Input() scope_id: string = null;
  @Input() start: Date = null;
  @Input() end: Date = null;
  @Input() refresh: number = null;

  constructor(
    private apiService: ApiService,
    protected dateService: NbDateService<Date>,
    private toastrService: NbToastrService
  ) {

  }

  ngOnInit(): void {
    this.columns = this.campos;

    if (this.refresh) {
      this.refresh$ = interval(this.refresh*1000).subscribe(() => {
        this.load(
          this.index,
          this.scope,
          this.scope_id,
          this.dateService.format(this.start, 'yyyy-MM-dd'), 
          this.dateService.format(this.end, 'yyyy-MM-dd')
        );         
      })
    }
  }

  ngOnDestroy(): void {
    this.refresh$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load(
      this.index,
      this.scope,
      this.scope_id,
      this.dateService.format(this.start, 'yyyy-MM-dd'), 
      this.dateService.format(this.end, 'yyyy-MM-dd')
    ); 
  }

  load(index, scope, scope_id, start, end): void {
    
    const params = {
      index: index, 
      scope: scope,
      scope_id: scope_id,
      start: start, 
      end: end, 
    };

    if (index && scope && scope_id && start && end) {
      this.apiService.getRegistros(params).subscribe(
        response => {
          this.rows = response.registros;
        }, 
        error => {
          const status: NbComponentStatus = 'danger';
          const message = scope + ' ' + scope_id;
          const toastRef: NbToastRef = this.toastrService.show(message, error.statusText, { status });
          console.log(error);
        }
      );
    }
  }

}
