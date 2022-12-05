import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';


import { ThemeModule } from '../../@theme/theme.module';
import { InformesRoutingModule } from './informes-routing.module';
import { InformesComponent } from './informes.component';


@NgModule({
  imports: [
    InformesRoutingModule,
    ThemeModule,
  ],
  declarations: [
    InformesComponent
  ],
})
export class InformesModule {
}
