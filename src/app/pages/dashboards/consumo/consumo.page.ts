import { Component, OnDestroy, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../../@services/user.service';
import { PageFilterService } from '../../../@services/page-filter.service';

import { CustomNumberPipe, CustomDatetimePipe, ServicePipeTranslatePipe, CaudalPipe } from '../../../@theme/pipes';



@Component({
  selector: 'andromeda-consumo',
  styleUrls: ['./consumo.page.scss'],
  templateUrl: './consumo.page.html',
})
export class ConsumoPage implements OnDestroy, OnInit {
  
  private alive = true;
  usuario: any;

  scope: null; //String = '''account';
  scope_id: null; //String = 'b06ca9f9-9b26-4039-aeb2-d104118ddc46'; //0123
  start: null;
  end: null;

  customDatetimePipe = null;
  customNumber = null;
  serviceTypeTranslatePipe = null;
  caudalPipe = null;


  constructor(
    private userService: UserService,
    private pageFilterService: PageFilterService,
  ) {
    this.customDatetimePipe = new CustomDatetimePipe();
    this.customNumber = new CustomNumberPipe();
    this.serviceTypeTranslatePipe = new ServicePipeTranslatePipe();
    this.caudalPipe = new CaudalPipe();
  }   

  ngOnInit(): void {

		this.userService.currentUser.subscribe(usuario => {
      this.usuario = usuario;
		});

    this.pageFilterService.currentFilter.subscribe(
      filter => {
        if (filter) {
          this.scope = filter.scope;
          this.scope_id = filter.scope_id;
          this.start = filter.start;
          this.end = filter.end;
        }
      }
    );
  }


  ngOnDestroy() {
    this.alive = false;
  }

  
}


