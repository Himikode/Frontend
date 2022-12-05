import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from '../../../@services/api.service';
import { NbToastrService, NbToastRef, NbComponentStatus } from '@nebular/theme';

import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';


@Component({
  selector: 'venue-info-card',
  templateUrl: './venue-info-card.component.html',
  styleUrls: ['./venue-info-card.component.scss']
})
export class VenueInfoCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() scope: string = null;
  @Input() scope_id: string = null;

  localizacion: any = null;

  center = {lat: 40.046, lng: -4.565};
  zoom = 6;
  display?: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
  };  
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  marker: any = null;

  constructor(
    private apiService: ApiService,
    private toastrService: NbToastrService
  ) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load(
      this.scope,
      this.scope_id,
    ); 
  }

  load(scope, scope_id): void {
    const params = {
      scope: scope,
      scope_id: scope_id,
    };
    if (scope && scope_id ) {
      this.apiService.localizacion(scope_id).subscribe(
        response => {
          this.localizacion = response.localizacion;

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

  fitMap() {
    if (this.map && this.localizacion) {
      this.center = {lat: this.localizacion.latitude, lng: this.localizacion.longitude};
      this.zoom = 16;
    }
  }




}
