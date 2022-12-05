import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { ApiService } from '../../../@services/api.service';
import { NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'account-info-card',
  templateUrl: './account-info-card.component.html',
  styleUrls: ['./account-info-card.component.scss']
})
export class AccountInfoCardComponent implements OnInit {

  @Input() scope_id: string = '';
  cuenta: any = null;
  delegaciones_count: 0;
  localizaciones_count: number =  0;

  constructor(
    private apiService: ApiService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {   
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load(
      this.scope_id,
    ); 
  }


  load(account_id): void {

    if (account_id ) {
      this.apiService.cuenta(account_id).subscribe(
        response => {
          this.cuenta = response.cuenta;

          this.delegaciones_count = this.cuenta.localizaciones_agrupaciones.length;
          this.cuenta.localizaciones_agrupaciones.forEach(delegacion => {
            this.localizaciones_count += delegacion.localizaciones.length;
          })


        }, 
        error => {
          const status: NbComponentStatus = 'danger';
          const message = 'Info error';
          const title = error.hasOwnProperty('error') ? error.error.message : error.statusText;
          const toastRef: NbToastRef = this.toastrService.show(message, title, { status });
        }
      );
    }
  }



}
