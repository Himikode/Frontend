import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegistrosComponent } from './registros.component';
import { NotFoundComponent } from '../../miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../../_guards/auth-guard.service';


const routes: Routes = [{
  path: '',
  component: RegistrosComponent,
  children: [
    {
      path: 'cafeteras',
      canActivate: [AuthGuard],
      loadChildren: () => import('./cafeteras/cafeteras.module')
        .then(m => m.CafeterasModule),
    },       
    {
      path: 'molinos',
      canActivate: [AuthGuard],
      loadChildren: () => import('./molinos/molinos.module')
        .then(m => m.MolinosModule),
    },    
    {
      path: '',
      redirectTo: 'cafeteras',
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
export class RegistrosRoutingModule {
}
