import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartCardsModule} from '../../../components/chart-cards/chart-cards.module'
import { DataCardsModule} from '../../../components/data-cards/data-cards.module';
import { TableCardsModule} from '../../../components/table-cards/table-cards.module';
import { InfoCardsModule } from '../../../components/info-cards/info-cards.module';

import { ThemeModule } from '../../../@theme/theme.module';
import { ConsumoPage } from './consumo.page';
import { NbTabsetModule } from '@nebular/theme';



@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ConsumoPage }]),
    ThemeModule,
    NbTabsetModule,

    ChartCardsModule,
    DataCardsModule,
    TableCardsModule,
    InfoCardsModule,
  ],
  declarations: [
    ConsumoPage,
  ],
})
export class ConsumoModule { }
