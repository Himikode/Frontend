import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ChartjsBarHorizontalComponent } from './chartjs-bar-horizontal.component';
import { ChartjsBarVerticalComponent } from './chartjs-bar-vertical.component';
import { EchartsAreaStackComponent } from './echarts-area-stack.component';

import { PieChartCardComponent } from './pie-chart-card.component';
import { DonutChartCardComponent } from './donut-chart-card.component';
import { BarChartCardComponent } from './bar-chart-card.component';
import { AreaChartCardComponent } from './area-chart-card.component';

@NgModule({
    imports: [
        NbCardModule,
        CommonModule,
        ThemeModule,
        ChartModule,
        NgxEchartsModule,
        NgxChartsModule,
        NbSpinnerModule
    ],
    declarations: [
        ChartjsBarHorizontalComponent,
        EchartsAreaStackComponent,
        ChartjsBarVerticalComponent,
        BarChartCardComponent,
        PieChartCardComponent,
        AreaChartCardComponent,
        DonutChartCardComponent
    ],
    exports: [
        ChartjsBarHorizontalComponent,
        EchartsAreaStackComponent,
        ChartjsBarVerticalComponent,
        BarChartCardComponent,
        PieChartCardComponent,
        AreaChartCardComponent,
        DonutChartCardComponent
    ]
})
 
export class ChartCardsModule {}