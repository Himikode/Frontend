import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TableCardsModule} from '../../../components/table-cards/table-cards.module';


import { ThemeModule } from '../../../@theme/theme.module';
import { MolinosPage } from './molinos.page';



@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: MolinosPage }]),
    FormsModule,
    ThemeModule,
    
    TableCardsModule
  ],
  declarations: [
    MolinosPage,
  ],
})
export class MolinosModule { }
