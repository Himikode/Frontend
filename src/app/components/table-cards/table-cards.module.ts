import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule, NbProgressBarModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { RecordsTableCardComponent } from './records-table-card/records-table-card.component';
import { OrganizationTableCardComponent } from './organization-table-card/organization-table-card.component';
import { RankingTableCardComponent } from './ranking-table-card/ranking-table-card.component';

@NgModule({
    imports: [
        NbCardModule,
        CommonModule,
        ThemeModule,
        NgxDatatableModule,
        NbProgressBarModule,
        NbSpinnerModule
    ],
    declarations: [
        RecordsTableCardComponent,
        OrganizationTableCardComponent,
        RankingTableCardComponent
    ],
    exports: [
        RecordsTableCardComponent,
        OrganizationTableCardComponent,
        RankingTableCardComponent
    ]
})
 
export class TableCardsModule {}