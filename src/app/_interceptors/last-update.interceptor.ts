import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageFilterService } from '../@services/page-filter.service';


@Injectable()

export class LastUpdateInterceptor implements HttpInterceptor {

    constructor(
        private pageFilterSvc: PageFilterService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                if (event.url.includes('/var/') || event.url.includes('/series')) {
                    this.pageFilterSvc.setLastUpdate(new Date());
                }
                return event;
              }
            })
          );
    }
}
