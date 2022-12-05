import { Component, OnInit, ElementRef, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { NbDateService } from '@nebular/theme';
import { Moment } from 'moment';

import { UserService } from '../../../@services/user.service';
import { PageFilterService } from '../../../@services/page-filter.service';
import { DateAgoPipe } from '../../../@theme/pipes';
import { DaterangepickerComponent } from 'ngx-daterangepicker-material';


@Component({
  selector: 'andromeda-page-filter',
  templateUrl: './page-filter.component.html',
  styleUrls: ['./page-filter.component.scss']
})
export class PageFilterComponent implements OnInit, OnDestroy {


  @ViewChild('intervalo') intervaloInput: ElementRef;
  @Output() intervaloOutput: EventEmitter<string> = new EventEmitter<string>();
 
  accounts = [];
  venues_grp = [];
  venues = [];
  showDataRangePicker: boolean = false;
  showFilter:boolean = true;

  selectedRangeText: string = 'Últimos 30 días';
  range: { startDate: Moment, endDate: Moment };
  @ViewChild('dateRangePicker', { static: false }) pickerDirective: DaterangepickerComponent;

  timeStamp: any;

  smartFilter: boolean = true; //elige selects normales o con buscador
  filter = {
    scope: null,
    scope_id: null,
    start: this.dateService.addDay(this.dateService.today(), -30),
    end: this.dateService.today()   
  }

  selected = {
    account: null,
    venue_grp: null,
    venue: null,
  }

  ranges: any = {
    'Hoy': [this.dateService.today(), this.dateService.today()],
    'Últimos 7 días': [this.dateService.addDay(this.dateService.today(), -7), this.dateService.today()],
    'Últimos 30 días': [this.dateService.addDay(this.dateService.today(), -30), this.dateService.today()],
    'Últimos 90 días': [this.dateService.addDay(this.dateService.today(), -90), this.dateService.today()],
    'Mes en curso': [this.dateService.getMonthStart(this.dateService.today()), this.dateService.today()],
    'Mes anterior': [this.dateService.addMonth(this.dateService.getMonthStart(this.dateService.today()), -1), this.dateService.addDay(this.dateService.getMonthStart(this.dateService.today()), -1)],
    'Año en curso': [this.dateService.getYearStart(this.dateService.today()), this.dateService.today()],
  };

  expand: boolean = true;
  usuario$: any = null;
  filter$: any = null;

  constructor(
    private userService: UserService,
    private pageFilterService: PageFilterService,
    protected dateService: NbDateService<Date>,
    private router: Router
    ) { 
      router.events.subscribe(val => {
        if (val instanceof NavigationEnd) {
          console.log(val);
          if (val.url == '/pages/home' || val.url == '/') {
            this.showFilter = false;
          }
          else {
            this.showFilter = true;
          }
        }
      });
    }


  ngOnInit(): void {

    console.log('Init page-filter component');
    
    this.usuario$ = this.userService.currentUser.subscribe(
      usuario => {
        if (usuario) {
          console.log('Sync usuario for filter');
          this.accounts = usuario.acceso_cuentas;
          this.venues_grp = usuario.acceso_localizaciones_agrupaciones;
          this.venues = usuario.acceso_localizaciones;
          this.pageFilterService.setFilter(null);
        }    
      },
      error => {
        console.log(error);
      }
    ); 

    this.filter$ = this.pageFilterService.currentFilter.subscribe(
      filter => {
        //Si estamos iniciando el componente pueden pasar dos cosas
        //1- que estemos iniciando el componente sin que haya un filtro establecido en el servicio
        //2- que estemos iniciando el componente pero ya hay un filtro
        //Si hay filtro se predetermina, si no lo hay se pone el primero mas alto rango del user
        if (filter == null) {
          if (this.accounts.length > 0 ) {
            this.filter.scope = 'account';
            this.filter.scope_id = this.accounts[0].id;
          }
          else if (this.venues_grp.length > 0 ) {
            this.filter.scope = 'venue_grp';
            this.filter.scope_id = this.venues_grp[0].id;
          }
          else if (this.venues.length > 0 ) {
            this.filter.scope = 'venue';
            this.filter.scope_id = this.venues[0].id;
          }
          if (this.accounts.length > 0 || this.venues_grp.length > 0 || this.venues.length > 0) {
            console.log('Init new filter', this.filter);
            this.pageFilterService.setFilter(this.filter);
          }
        }
        else {
          console.log('Set page filter from service', filter);
          this.filter = filter;
          this.selected = {
            account: null,
            venue_grp: null,
            venue: null,
          }          
          if (this.filter.scope == 'account') {
            this.selected.account = this.filter.scope_id;
          }
          else if (this.filter.scope == 'venue_grp') {
            this.selected.venue_grp = this.filter.scope_id;
          }
          else if (this.filter.scope == 'venue') {
            this.selected.venue = this.filter.scope_id;
          }            
        }        
      },
      error => {
        console.log(error);
      }
    );



    this.pageFilterService.lastUpdate.subscribe(
      timestamp => {
        if (timestamp) {
          this.timeStamp = timestamp;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.usuario$.unsubscribe();
    this.filter$.unsubscribe();
  }


  handleSelect(scope, event): any {
    for (const [k, v] of Object.entries(this.selected)) {
      if (k != scope) {
        this.selected[k] = null;
      }
    }
    this.filter.scope = scope;
    this.filter.scope_id =  this.selected[scope];
    this.pageFilterService.setFilter(this.filter);
  }

  handleRange(event) {
    this.filter.start = event.startDate.toDate();
    this.filter.end = event.endDate.toDate();
    this.pageFilterService.setFilter(this.filter);
    this.showDataRangePicker = false;

    if (this.pickerDirective.chosenRange) {
      this.selectedRangeText = this.pickerDirective.chosenRange;
    }
    else {
      this.selectedRangeText =
        this.pickerDirective.startDate.format('D MMM YY')
        + ' - '
        + this.pickerDirective.endDate.format('D MMM YY');
    }
  }

  toggleExpand() {
    this.expand = !this.expand;
  }


}



