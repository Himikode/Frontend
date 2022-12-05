import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InfoCardsModule } from '../../components/info-cards/info-cards.module';

import { ThemeModule } from '../../@theme/theme.module';
import { HomePage } from './home.page';
import { NbCardModule, NbContextMenuModule, NbIconModule } from '@nebular/theme';



@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: HomePage }]),
    ThemeModule,
    NbCardModule,
    NbContextMenuModule,
    NbIconModule,
    CommonModule,

    InfoCardsModule

  ],
  declarations: [
    HomePage,
  ],  
})
export class HomeModule { }
