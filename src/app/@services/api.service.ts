import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * Constructor of the Service with Dependency Injection
   * @param http The standard Angular HttpClient to make requests
   */
  constructor(private http: HttpClient) { }


  getUserActivo(usuario): Observable<any> {
    return this.http.get(`${environment.api_server_address}/usuarios/getActivo.json`).pipe(
      map(data => data['user'])
    )
  }

  cuenta(id): Observable<any> {
    return this.http.get(`${environment.api_server_address}/cuentas/${id}.json`).pipe(
      map(results => results)
    )
  }

  localizacionAgrupacion(id): Observable<any> {
    return this.http.get(`${environment.api_server_address}/localizaciones_agrupaciones/${id}.json`).pipe(
      map(results => results)
    )
  }
  
  // Localizaciones
  localizaciones(options): Observable<any> {
    let params = {
      page: options.currentPage,
      limit: options.itemsPerPage
    };      
    return this.http.get(`${environment.api_server_address}/localizaciones.json`, {params: params}).pipe(
      map(results => results)
    )
  }
  localizacion(id): Observable<any> {
    return this.http.get(`${environment.api_server_address}/localizaciones/${id}.json`).pipe(
      map(results => results)
    )
  }
  localizacionDispositivos(id): Observable<any> {
    return this.http.get(`${environment.api_server_address}/localizaciones/${id}/dispositivos.json`).pipe(
      map(results => results)
    )
  }  

  //Dispositivos
  dispositivos(options): Observable<any> {
    let params = {
      page: options.currentPage,
      limit: options.itemsPerPage
    };      
    return this.http.get(`${environment.api_server_address}/dispositivos.json`, {params: params}).pipe(
      map(results => results)
    )
  }
  dispositivo(id): Observable<any> {
    return this.http.get(`${environment.api_server_address}/dispositivos/${id}.json`).pipe(
      map(results => results)
    )
  }

  //Variables
  series(variable, options): Observable<any> {
    return this.http.get(`${environment.api_server_address}/var/${variable}/series.json`, {params: options}).pipe(
      map(results => results)
    )
  }
  getVariable(variable, options): Observable<any> {
    return this.http.get(`${environment.api_server_address}/var/${variable}.json`, {params: options}).pipe(

      map(results => results)
    )
  }
  getRanking(variable, options): Observable<any> {
    return this.http.get(`${environment.api_server_address}/var/${variable}/ranking.json`, {params: options}).pipe(

      map(results => results)
    )
  }

  //Listados registros
  getRegistros(options): Observable<any> {
    return this.http.get(`${environment.api_server_address}/registros.json`, {params: options}).pipe(
      map(results => results)
    )
  }

  // Llamadas finalistas
  getCalidadTaza(tipo, options): Observable<any> {
    return this.http.get(`${environment.api_server_address}/calidad/taza/${tipo}.json`, {params: options}).pipe(
      map(results => results)
    )
  }




  //DEPRECANDO -------------------------------------------------
  dispositivoSeries(id, options): Observable<any> {
    return this.http.get(`${environment.api_server_address}/dispositivo/${id}/series.json`, {params: options}).pipe(
      map(results => results)
    )
  }
  dispositivoCaudal(id, options): Observable<any> {    
    return this.http.get(`${environment.api_server_address}/dispositivos/${id}/caudal.json`, {params: options}).pipe(
      map(results => results)
    )
  }

  localizacionSeries(id, options): Observable<any> {
    return this.http.get(`${environment.api_server_address}/localizaciones/${id}/series.json`, {params: options}).pipe(
      map(results => results)
    )
  }
  localizacionData(id, options): Observable<any> {
    return this.http.get(`${environment.api_server_address}/localizaciones/${id}/data.json`, {params: options}).pipe(
      map(results => results)
    )
  }

  clienteSeries(options): Observable<any> {
    return this.http.get(`${environment.api_server_address}/clientes/series.json`, {params: options}).pipe(
      map(results => results)
    )
  }
  clienteData(options): Observable<any> {
    return this.http.get(`${environment.api_server_address}/clientes/data.json`, {params: options}).pipe(
      map(results => results)
    )
  }
  clienteServiciosCafetera(options): Observable<any> {
    return this.http.get(`${environment.api_server_address}/clientes/servicios.json`, {params: options}).pipe(
      map(results => results)
    )
  }
  clienteCaudalCafeteras(options): Observable<any> {
    return this.http.get(`${environment.api_server_address}/clientes/caudal.json`, {params: options}).pipe(
      map(results => results)
    )
  }
  



}    


