import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardsComponent } from './dashboards.component';
import { NotFoundComponent } from '../../miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../../_guards/auth-guard.service';


const routes: Routes = [{
  path: '',
  component: DashboardsComponent,
  children: [
    {
      path: 'consumo',
      canActivate: [AuthGuard],
      loadChildren: () => import('./consumo/consumo.module')
        .then(m => m.ConsumoModule),
    },    
    {
      path: 'calidad',
      canActivate: [AuthGuard],
      loadChildren: () => import('./calidad/calidad.module')
        .then(m => m.CalidadModule),
    },       
    {
      path: 'sat',
      canActivate: [AuthGuard],
      loadChildren: () => import('./sat/sat.module')
        .then(m => m.SatModule),
    },       
    {
      path: 'piloto',
      canActivate: [AuthGuard],
      loadChildren: () => import('./piloto/piloto.module')
        .then(m => m.PilotoModule),
    },     
    {
      path: '',
      redirectTo: 'consumo',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {
}
