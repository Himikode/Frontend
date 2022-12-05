import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InformesComponent } from './informes.component';
import { NotFoundComponent } from '../../miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../../_guards/auth-guard.service';


const routes: Routes = [{
  path: '',
  component: InformesComponent,
  children: [
    {
      path: 'elaboraciones',
      canActivate: [AuthGuard],
      loadChildren: () => import('./elaboraciones/elaboraciones.module')
        .then(m => m.ElaboracionesModule),
    },       
    {
      path: 'moliendas',
      canActivate: [AuthGuard],
      loadChildren: () => import('./moliendas/moliendas.module')
        .then(m => m.MoliendasModule),
    },    
    {
      path: '',
      redirectTo: 'elaboraciones',
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
export class InformesRoutingModule {
}
