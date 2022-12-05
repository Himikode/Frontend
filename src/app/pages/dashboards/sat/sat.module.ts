import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ChartCardsModule} from '../../../components/chart-cards/chart-cards.module'
import { DataCardsModule} from '../../../components/data-cards/data-cards.module';
import { InfoCardsModule } from '../../../components/info-cards/info-cards.module';


import { ThemeModule } from '../../../@theme/theme.module';
import { SatPage } from './sat.page';
import { NbTabsetModule } from '@nebular/theme';



@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: SatPage }]),
    FormsModule,
    ThemeModule,
    NbTabsetModule,

    ChartCardsModule,
    DataCardsModule,
    InfoCardsModule


  ],
  declarations: [
    SatPage,
  ],
})
export class SatModule { }
