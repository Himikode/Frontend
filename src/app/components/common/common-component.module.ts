import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ThemeModule } from '../../@theme/theme.module';


import { CupRatingComponent } from './cup-rating/cup-rating.component';

@NgModule({
    imports: [
        CommonModule,
        ThemeModule
    ],
    declarations: [
        CupRatingComponent
    ],
    exports: [
        CupRatingComponent
    ]
})
 
export class CommonComponentsModule {}