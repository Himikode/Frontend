import { NgModule } from '@angular/core';
//import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';



@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    //NbMenuModule,
  ],
  declarations: [
    PagesComponent
  ],
})
export class PagesModule {
}
