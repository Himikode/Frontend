import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap } from  'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { NbAuthService, NB_AUTH_OPTIONS, NbTokenService } from '@nebular/auth';

 
@Injectable({
	providedIn: 'root'
})
export class UserService {
 
	currentUser = new BehaviorSubject(null);

	constructor(
		private apiService: ApiService, 
		protected authService: NbAuthService, 
		protected tokenService: NbTokenService,

	)  { 
		console.log('Init user service');
		this.authService.isAuthenticated().subscribe(
			isLogged => {
				if (!isLogged) {
					this.authService.logout('email');
					this.tokenService.clear();
					this.clear();
				}
			}
		);
		this.authService.onAuthenticationChange().subscribe(
			loginAction => {
				if (loginAction) {
					console.log('Sync onAuthenticationChange');
					this.syncUserActivo();
				}
				// else {
				// 	console.log('no-login');
				// 	this.authService.logout('email');
				// 	this.tokenService.clear();
				// 	this.clear();
				// }
			}
		)
	}

	syncUserActivo = function() {
		this.apiService.getUserActivo().subscribe(
			usuario => {
				if (usuario) {
					console.info('Sync user activo success', usuario);
					localStorage.setItem('usuario', JSON.stringify(usuario));
					this.currentUser.next(usuario);
				}
			}, 
			error => {
				console.log('Error sincronizacion user activo. -> Logout');
				this.authService.logout('email');
				this.tokenService.clear();
				this.clear();
			}
		);
	}	
	
	getUserActivo = function() {
		const usuario = JSON.parse(localStorage.getItem('usuario'));
		if (usuario) {
			this.currentUser.next(usuario);
		}
		else {
			this.authService.logout('email');
			this.tokenService.clear();
			this.clear();
		}
	}	

	getAccount = function() {
		const user = JSON.parse(localStorage.getItem('usuario'));
		if (user) {
			this.currentUser.next(user);
		}
		else {
			this.syncUserActivo();
		}
	}	


	clear = function() {
		localStorage.removeItem('config');
		localStorage.removeItem('TOKEN_KEY');
		localStorage.removeItem('usuario');
		localStorage.removeItem('currentUser');
		this.currentUser.next(null);
	}	



}