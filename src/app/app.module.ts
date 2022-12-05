import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { AuthGuard } from './_guards/auth-guard.service';
import { UnidadesInterceptor } from './_interceptors/unidades.interceptor';
import { LastUpdateInterceptor } from './_interceptors/last-update.interceptor';


import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: UnidadesInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LastUpdateInterceptor, multi: true },
    {
      provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: (req) => {
        return false;
      },
    },
    { provide: LOCALE_ID, useValue: "es-ES" }, //your locale
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
