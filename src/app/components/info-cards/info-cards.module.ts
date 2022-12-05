import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule, NbProgressBarModule, NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';

import { GoogleMapsModule } from '@angular/google-maps';



import { VenueGrpInfoCardComponent } from './venue-grp-info-card/venue-grp-info-card.component';
import { VenueInfoCardComponent } from './venue-info-card/venue-info-card.component';
import { AccountInfoCardComponent } from './account-info-card/account-info-card.component';
import { VenueDevicesInfoCardComponent } from './venue-devices-info-card/venue-devices-info-card.component';
import { DeviceInfoCardComponent } from './device-info-card/device-info-card.component';
import { AccountDevicesStatusCardComponent } from './account-devices-status-card/account-devices-status-card.component';
import { VenueGrpDevicesStatusCardComponent } from './venue-grp-devices-status-card/venue-grp-devices-status-card.component'; 


@NgModule({
    imports: [
        NbCardModule,
        CommonModule,
        ThemeModule,
        NbProgressBarModule,
        GoogleMapsModule,
        NbTabsetModule
    ],
    declarations: [
        VenueGrpInfoCardComponent,
        VenueInfoCardComponent,
        AccountInfoCardComponent,
        VenueDevicesInfoCardComponent,
        DeviceInfoCardComponent,
        AccountDevicesStatusCardComponent,
        VenueGrpDevicesStatusCardComponent,
    ],
    exports: [
        VenueGrpInfoCardComponent,
        VenueInfoCardComponent,
        AccountInfoCardComponent,
        VenueDevicesInfoCardComponent,
        DeviceInfoCardComponent,
        AccountDevicesStatusCardComponent,
        VenueGrpDevicesStatusCardComponent,
    ]
})
 
export class InfoCardsModule {}