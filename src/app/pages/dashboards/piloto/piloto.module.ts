import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ChartCardsModule} from '../../../components/chart-cards/chart-cards.module'
import { DataCardsModule} from '../../../components/data-cards/data-cards.module';
import { TableCardsModule} from '../../../components/table-cards/table-cards.module';


import { ThemeModule } from '../../../@theme/theme.module';
import { PilotoPage } from './piloto.page';



@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: PilotoPage }]),
    FormsModule,
    ThemeModule,

    ChartCardsModule,
    DataCardsModule,
    TableCardsModule


  ],
  declarations: [
    PilotoPage,
  ],
})
export class PilotoModule { }
