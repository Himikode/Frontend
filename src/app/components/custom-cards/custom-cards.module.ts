import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule, NbProgressBarModule, NbSpinnerModule } from '@nebular/theme';
import { CommonComponentsModule } from '../common/common-component.module';
import { CupQualityCardComponent } from './cup-quality-card/cup-quality-card.component';


@NgModule({
    imports: [
        NbCardModule,
        CommonModule,
        CommonComponentsModule,
        NbProgressBarModule,
        NbSpinnerModule
    ],
    declarations: [
        CupQualityCardComponent
    ],
    exports: [
        CupQualityCardComponent
    ]
})
 
export class CustomCardsModule {}