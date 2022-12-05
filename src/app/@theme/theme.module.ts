import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbDatepickerModule,
  NbProgressBarModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  MenuComponent,
  PageFilterComponent,
  LoggedUserComponent,
  SearchInputComponent,
  TinyMCEComponent,
} from './components';

import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  CustomDatetimePipe,
  CustomNumberPipe,
  DateAgoPipe
} from './pipes';

import {
  OneColumnLayoutComponent,
  OneColumnPageFilterLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';



import { DEFAULT_THEME } from './styles/theme.default';
import { DARK_THEME } from './styles/theme.dark';
import { HKCOFFEE_THEME } from './styles/theme.hkcoffee';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbDatepickerModule,
  NbProgressBarModule,
  
  NgxDaterangepickerMd.forRoot()
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  MenuComponent,
  PageFilterComponent,
  LoggedUserComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,

  OneColumnPageFilterLayoutComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  CustomDatetimePipe,
  CustomNumberPipe,
  DateAgoPipe
];

@NgModule({
  imports: [CommonModule, NgSelectModule, FormsModule, ...NB_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'hkcoffee',
          },
          [ DEFAULT_THEME, HKCOFFEE_THEME ],
        ).providers,
      ],
    };
  }
}
