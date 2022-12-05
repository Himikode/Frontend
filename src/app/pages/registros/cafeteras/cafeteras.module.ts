import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { TableCardsModule} from '../../../components/table-cards/table-cards.module';


import { ThemeModule } from '../../../@theme/theme.module';
import { CafeterasPage } from './cafeteras.page';



@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: CafeterasPage }]),
    FormsModule,
    ThemeModule,
    TableCardsModule
  ],
  declarations: [
    CafeterasPage,
  ],
})
export class CafeterasModule { }
