import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationStoreService } from '../store/authentication/authentication-store.service';
import { map } from 'rxjs/operators';


@Injectable()
export class LoginGuardService implements CanActivate {

	constructor( private authStore: AuthenticationStoreService ) {
	}

	canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot )
		: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.authStore.authState$
			.pipe(
				map( value => !value.isLoggedIn )
			);
	}
}
