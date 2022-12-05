import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService, NbAuthOAuth2Token, NbTokenService } from '@nebular/auth';
import { isObject } from 'rxjs/internal-compatibility';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: NbAuthService, 
    private router: Router,
		protected tokenService: NbTokenService
    ) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
    .pipe(
      tap(authenticated => {
        if (!authenticated) {

          //Comprobamos el token, si no es válido deslogueamos
          this.authService.getToken()
            .subscribe((token: NbAuthOAuth2Token) => {
              if (!token.isValid()) {
                this.authService.logout('email');
                this.tokenService.clear();
                localStorage.removeItem('usuario');
              }              
            })
          this.router.navigate(['auth/login']);
        }
      }),
    );    
  }
}