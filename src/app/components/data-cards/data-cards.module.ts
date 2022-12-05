import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';


import { SingleValueCardComponent } from './single-value-card/single-value-card.component';
import { BucketListCardComponent } from './bucket-list-card/bucket-list-card.component';
import { SingleValueCardLastPeriodComponent } from './single-value-card-last-period/single-value-card-last-period.component';
import { SingleValueBucketsSumCardComponent } from './single-value-buckets-sum-card/single-value-buckets-sum-card.component';
import { DeviationCardComponent } from './deviation-card/deviation-card.component';
import { RelationCardComponent } from './relation-card/relation-card.component';
import { SeriesStatsCardComponent } from './series-stats-card/series-stats-card.component';

@NgModule({
    imports: [
        NbCardModule,
        CommonModule,
        ThemeModule,
        NbSpinnerModule
    ],
    declarations: [
        SingleValueCardComponent,
        BucketListCardComponent,
        SingleValueCardLastPeriodComponent,
        SingleValueBucketsSumCardComponent,
        DeviationCardComponent,
        RelationCardComponent,
        SeriesStatsCardComponent
    ],
    exports: [
        SingleValueCardComponent,
        BucketListCardComponent,
        SingleValueCardLastPeriodComponent,
        SingleValueBucketsSumCardComponent,
        DeviationCardComponent,
        RelationCardComponent,
        SeriesStatsCardComponent

    ]
})
 
export class DataCardsModule {}