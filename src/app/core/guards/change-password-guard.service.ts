import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ChangePasswordGuardService implements CanActivate {

	constructor( private router: Router ) {
	}

	canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot )
		: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const paramUsername = route.queryParamMap.get( 'username' );
		if ( paramUsername ) {
			return true;
		}
		this.router.navigateByUrl( 'login' );
		return false;
	}
}
