import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { ChartCardsModule} from '../../../components/chart-cards/chart-cards.module'
import { DataCardsModule} from '../../../components/data-cards/data-cards.module';
import { CustomCardsModule } from '../../../components/custom-cards/custom-cards.module';
import { InfoCardsModule } from '../../../components/info-cards/info-cards.module';
import { TableCardsModule } from '../../../components/table-cards/table-cards.module';


import { ThemeModule } from '../../../@theme/theme.module';
import { CalidadPage } from './calidad.page';
import { NbTabsetModule } from '@nebular/theme';



@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: CalidadPage }]),
    FormsModule,
    ThemeModule,
    NbTabsetModule,

    ChartCardsModule,
    DataCardsModule,
    CustomCardsModule,
    InfoCardsModule,
    TableCardsModule

  ],
  declarations: [
    CalidadPage,
  ],
})
export class CalidadModule { }
