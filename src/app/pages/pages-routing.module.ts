import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      loadChildren: () => import('./home/home.module')
        .then(m => m.HomeModule),
    },         
    {
      path: 'dashboards',
      loadChildren: () => import('./dashboards/dashboards.module')
        .then(m => m.DashboardsModule),
    },         
    {
      path: 'informes',
      loadChildren: () => import('./informes/informes.module')
        .then(m => m.InformesModule),
    },  
    {
      path: 'registros',
      loadChildren: () => import('./registros/registros.module')
        .then(m => m.RegistrosModule),
    },     
  
    {
      path: 'localizacion/:id',
      loadChildren: () => import('./localizacion/localizacion.module')
        .then(m => m.LocalizacionModule),
    },      
    {
      path: '',
      redirectTo: 'home',
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
export class PagesRoutingModule {
}
