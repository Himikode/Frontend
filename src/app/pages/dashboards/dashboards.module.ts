import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardsComponent } from './dashboards.component';


@NgModule({
  imports: [
    DashboardsRoutingModule,
    ThemeModule,
  ],
  declarations: [
    DashboardsComponent
  ],
})
export class DashboardsModule {
}
