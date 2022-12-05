import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { ChartCardsModule} from '../../../components/chart-cards/chart-cards.module'
import { DataCardsModule} from '../../../components/data-cards/data-cards.module';


import { ThemeModule } from '../../../@theme/theme.module';
import { ElaboracionesPage } from './elaboraciones.page';



@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ElaboracionesPage }]),
    FormsModule,
    ThemeModule,

    ChartCardsModule,
    DataCardsModule,
  ],
  declarations: [
    ElaboracionesPage,
  ],
})
export class ElaboracionesModule { }
