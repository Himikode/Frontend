import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../@services/user.service';
import { PageFilterService } from '../../@services/page-filter.service';
import { ApiService } from '../../@services/api.service';
import { NbToastrService, NbToastRef, NbComponentStatus, NbMenuService, NbDateService } from '@nebular/theme';
import { Router } from '@angular/router';


@Component({
  selector: 'andromeda-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnDestroy, OnInit {

  private alive = true;
  usuario: any;
  cuenta: any;
  items = [
    { title: 'Consumo' },
    { title: 'Calidad' },
    { title: 'Activos' },
  ];

  filter = {
    scope: null,
    scope_id: null,
    start: null,
    end: null
  }

  constructor(
    private userService: UserService,
    private pageFilterService: PageFilterService,
    private apiService: ApiService,
    private toastrService: NbToastrService,
    private menuService: NbMenuService,
    private router: Router,
    protected dateService: NbDateService<Date>,
  ) {
  }  

  ngOnInit(): void {
    this.pageFilterService.currentFilter.subscribe(
      filter => {
        if (!filter) {
          this.filter = {
            scope: null,
            scope_id: null,
            start: this.dateService.addDay(this.dateService.today(), -30),
            end: this.dateService.today()   
          }          
        }
        else {
          this.filter = filter;
        }
      }
    );

    this.menuService.onItemClick().subscribe((event) => {
      if (event.tag && event.tag.slice(0, 15) === 'menu-delegacion') {
        let delegacion_id = event.tag.slice(-36);

        console.log('Set filter from home');
        this.filter.scope = 'venue_grp';
        this.filter.scope_id = delegacion_id;
        this.pageFilterService.setFilter(this.filter);
        if (event.item.title == 'Consumo') {
          this.router.navigate(['pages/dashboards/consumo']);
        }
        if (event.item.title == 'Calidad') {
          this.router.navigate(['pages/dashboards/calidad']);
        }
        if (event.item.title == 'Activos') {
          this.router.navigate(['pages/dashboards/sat']);
        }

      }
    });

		this.userService.currentUser.subscribe(usuario => {
      
      
      
      if (usuario) {
        this.usuario = usuario;
        this.filter.scope = 'account';
        this.filter.scope_id = usuario.acceso_cuentas[0].id;
        this.pageFilterService.setFilter(this.filter);

        this.apiService.cuenta(usuario.cuenta.id).subscribe(
          response => {
            response.cuenta.localizaciones_agrupaciones.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
            this.cuenta = response.cuenta;
          }, 
          error => {
            const status: NbComponentStatus = 'danger';
            const message = 'Info error';
            const title = error.hasOwnProperty('error') ? error.error.message : error.statusText;
            const toastRef: NbToastRef = this.toastrService.show(message, title, { status });
          }
        );
      }
    
    });



  }


  ngOnDestroy() {
    this.alive = false;
  }


}
