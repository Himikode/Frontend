import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbDialogModule,
  NbCardModule
} from '@nebular/theme';

import { LoginComponent } from './login/login.component'; // 
import { LogoutComponent } from './logout/logout.component'; // 
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbAuthModule,
    NbDialogModule.forRoot(),
    NbCardModule,
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    RequestPasswordComponent,
    ResetPasswordComponent
  ],
})
export class AuthModule {
}