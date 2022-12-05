import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from '../../../@services/api.service';
import { NbToastrService, NbToastRef, NbComponentStatus, NbDateService } from '@nebular/theme';

import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

import { forkJoin } from 'rxjs';
import { PageFilterService } from '../../../@services/page-filter.service';

@Component({
  selector: 'venue-grp-info-card',
  templateUrl: './venue-grp-info-card.component.html',
  styleUrls: ['./venue-grp-info-card.component.scss']
})
export class VenueGrpInfoCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() config: string = '';
  @Input() variable: string = null;
  @Input() stat: string = null;
  @Input() scope: string = null;
  @Input() scope_id: string = null;
  @Input() start: Date = null;
  @Input() end: Date = null;
  @Input() unidades: Date = null;
  @Input() format: string = null;


  center = {lat: 40.046, lng: -4.565};
  zoom = 6;
  markers = [];
  display?: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    disableDefaultUI: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    }
  };  
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow
  infoContent: string = '';
  agrupacion: any = null;
  localizaciones_count: number = null;
  ranking = null;
  total: any = null;
  map_loaded = false;

  constructor(
    private apiService: ApiService,
    protected dateService: NbDateService<Date>,
    private toastrService: NbToastrService,
    private pageFilterService: PageFilterService
  ) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load(
      this.variable,
      this.stat,
      this.scope,
      this.scope_id,
      this.dateService.format(this.start, 'yyyy-MM-dd'), 
      this.dateService.format(this.end, 'yyyy-MM-dd')      
    ); 
  }

  load(variable, stat, scope, scope_id, start, end): void {
    const params = {
      scope: scope,
      scope_id: scope_id,
    };
    const params_ranking = {
      stat: stat,
      scope: scope,
      scope_id: scope_id,
      start: start, 
      end: end, 
    };
    if (variable && stat && scope && scope_id && start && end) {
      let rankingPromise = this.apiService.getRanking(variable, params_ranking);
      let totalPromise = this.apiService.getVariable(variable, params_ranking);

      forkJoin(totalPromise, rankingPromise).subscribe(
        (res:any[]) => {

          let ranking = res[1].value;
          ranking.sort((a,b) => b.value - a.value); // b - a for reverse sort
          this.ranking = ranking.slice(0, 8);

          //this.total = res[0].value;
          this.total = ranking[0].value;
        },
        (error) => {
          const status: NbComponentStatus = 'danger';
          const message = variable;
          const title = error.hasOwnProperty('error') ? error.error.message : error.statusText;
          const toastRef: NbToastRef = this.toastrService.show(message, title, { status });
        } 
      );        
    }

    if (scope && scope_id ) {
      this.apiService.localizacionAgrupacion(scope_id).subscribe(
        response => {
          this.agrupacion = response.localizacionesAgrupacion;
          console.log(response.localizacionesAgrupacion);
          this.markers = [];

          this.agrupacion.localizaciones.forEach(loc => {
            let marker = {
              position: {lat: loc.latitude, lng: loc.longitude},
              title: loc.nombre,
              label: loc.nombre,
              localizacion: loc
            };
            this.markers.push(marker);
            loc.cafeteras = loc.dispositivos.filter( device => device.tipo_dispositivo.nombre.indexOf('Cafe') === 0 ).length;
            loc.molinos = loc.dispositivos.filter( device => device.tipo_dispositivo.nombre.indexOf('Moli') === 0 ).length;
  
          })
          this.localizaciones_count = this.agrupacion.localizaciones.length;
          this.agrupacion.localizaciones.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
          this.agrupacion.localizaciones = this.agrupacion.localizaciones.slice(0, 8);

          this.fitMap();

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

  goto(scope_id) {

    let filter = this.pageFilterService.currentFilter.value;
    filter.scope = 'venue';
    filter.scope_id =  scope_id;

    this.pageFilterService.setFilter(filter);
  }

  fitMap(source='') {
    if (this.map) {
      if (source=="tilesLoaded") {
        if (!this.map_loaded) {
          const bounds = this.getBounds(this.markers);
          this.map.fitBounds(bounds);      
          this.map_loaded = true;
        }
      }
      else {
        const bounds = this.getBounds(this.markers);
        this.map.fitBounds(bounds);      
      }
    }
  }



  getBounds(markers){
    let north;
    let south;
    let east;
    let west;
  
    for (const marker of markers){
      // set the coordinates to marker's lat and lng on the first run.
      // if the coordinates exist, get max or min depends on the coordinates.
      north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
      south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
      east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
      west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
    };
  
    const bounds = { north, south, east, west };
  
    return bounds;
  }

  openInfo(markeHashr: MapMarker, marker) {
    this.infoContent = '<h6 class="mt-3">'+marker.localizacion.nombre+'</h6><p>'+marker.localizacion.direccion+'</p>';
    this.infoWindow.open(markeHashr);
  }




  
}
