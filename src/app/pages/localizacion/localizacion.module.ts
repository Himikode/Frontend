import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbListModule,
  NbIconModule,

  
} from '@nebular/theme';



import { ThemeModule } from '../../@theme/theme.module';
import { LocalizacionComponent } from './localizacion.component';

import { ChartCardsModule} from '../../components/chart-cards/chart-cards.module'







@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,

    ChartCardsModule


  ],
  declarations: [
    LocalizacionComponent,
  ],
})
export class LocalizacionModule { }
