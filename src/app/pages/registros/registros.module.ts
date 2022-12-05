import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';


import { ThemeModule } from '../../@theme/theme.module';
import { RegistrosRoutingModule } from './registros-routing.module';
import { RegistrosComponent } from './registros.component';


@NgModule({
  imports: [
    RegistrosRoutingModule,
    ThemeModule,
  ],
  declarations: [
    RegistrosComponent
  ],
})
export class RegistrosModule {
}
