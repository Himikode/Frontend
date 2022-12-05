import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from '../../../@services/api.service';
import { NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';


@Component({
  selector: 'device-info-card',
  templateUrl: './device-info-card.component.html',
  styleUrls: ['./device-info-card.component.scss']
})
export class DeviceInfoCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() scope: string = null;
  @Input() scope_id: string = null;
  @Input() dispositivo_info: any = null;

  dispositivo: any = null;

  constructor(
    private apiService: ApiService,
    private toastrService: NbToastrService
  ) { }
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.load(
    //   this.sdispositivo_infoope,
    //   this.scope_id,
    // ); 
    this.present(this.dispositivo_info);
  }

  load(scope, scope_id): void {
    //Cargamos los datos de la api
    const params = {
      scope: scope,
      scope_id: scope_id,
    };
    if (scope && scope_id ) {

    }
  }

  present(dispositivo): void {
    //Prsentamos los datos pasados por input
    console.log(dispositivo);
    this.dispositivo = dispositivo;
  }


}
