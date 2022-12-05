import { Component, Inject, OnInit } from '@angular/core';
import { NbLogoutComponent, NB_AUTH_OPTIONS, NbAuthService, NbTokenService } from '@nebular/auth';
import { Router } from '@angular/router';
import { UserService } from '../../@services/user.service';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',

})

export class LogoutComponent extends NbLogoutComponent implements OnInit {
  
  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router,
    protected tokenService: NbTokenService,
    protected userService: UserService
  ) {
    super(service, options, router);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  logout(strategy: string): void {
    super.logout(strategy);
    this.tokenService.clear();
    this.userService.clear();
  }
}