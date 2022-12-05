import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hkcoffee-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent extends NbLoginComponent implements OnInit, OnDestroy {


  token_sub: Subscription;

  constructor(
    protected authService: NbAuthService, 
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef, 
    protected router: Router, 
  ) {
    super(authService, options, cd, router);
  }


  ngOnInit() {
		this.authService.isAuthenticated().subscribe(
			isLogged => {
          this.router.navigate(['pages/dashboard']); // Your redirection goes here
      }
    );
  }

  ngOnDestroy() {
  }

}