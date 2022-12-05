import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()

export class UnidadesInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                if (event.url.includes('/var/peso-molienda.json')) {
                    if (!event.url.includes('stat=count')) {
                        if (Array.isArray(event.body.value)) {
                            event.body.value.forEach(element => {
                                element.value = (element.value / 1000).toFixed(2);
                            });
                        }
                        else {
                            event.body.value = (event.body.value / 1000).toFixed(2);
                        }
                    }
                }
                if (event.url.includes('/var/peso-molienda/series.json')) {
                    if (!event.url.includes('stat=count')) {
                        event.body.series.data.forEach(dataserie => {
                            dataserie.forEach((element, index, array) => {
                                array[index] = (array[index] / 1000).toFixed(2);
                            });                           
                        });
                    }
                }
                return event;
              }
            })
          );
    }
}
