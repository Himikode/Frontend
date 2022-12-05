import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../@services/api.service';
import { NbDateService } from '@nebular/theme';

import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';





@Component({
  selector: 'ngx-Localizacion',
  styleUrls: ['./localizacion.component.scss'],
  templateUrl: './localizacion.component.html',
})
export class LocalizacionComponent implements OnDestroy, OnInit, AfterViewInit {
  
  private alive = true;
  localizacion: any;
  localizacionData: any;
  data: any;
  private map;
  start: Date = this.dateService.addDay(this.dateService.today(), -30);
  end: Date = this.dateService.today();


  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    protected dateService: NbDateService<Date>
  ) {
      
  }    


  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.apiService.localizacionData(params.id, {start: this.dateService.format(this.start, 'yyyy-MM-dd'), end: this.dateService.format(this.end, 'yyyy-MM-dd'), variables: 'peso_molienda,tipo_servicio' }).subscribe(
        response => {
          this.localizacionData = response.data;
          console.log(this.localizacionData);



        }
      );      
    });    
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.apiService.localizacion(params.id).subscribe(
        response => {
          this.localizacion = response.localizacion;
          this.initMap();
        }
      );   

    });    
  }

  ngOnDestroy() {
    this.alive = false;
  }


  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.localizacion.latitude, this.localizacion.longitude ],
      zoom: 16
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    const iconRetinaUrl = 'assets/img/markers/marker-icon-2x.png';
    const iconUrl = 'assets/img/markers/marker-icon.png';
    const shadowUrl = 'assets/img/markers/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;    
    let marker = L.marker([this.localizacion.latitude, this.localizacion.longitude]).addTo(this.map);

  }
}


