import {Injectable} from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanLoad,
	Route,
	Router,
	RouterStateSnapshot,
	UrlSegment, UrlTree
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthenticationStoreService} from '../store/authentication/authentication-store.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate {

	constructor(private authStore: AuthenticationStoreService, private http: AuthenticationService, private router: Router) {
	}

	canLoad(route: Route, segments: UrlSegment[]):
		Observable<boolean> | Promise<boolean> | boolean {
		return this.init(this.router);
		// return this.authStore.guardState$;
	}

	private init(router: Router) {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			const expToken = new JwtHelperService().isTokenExpired(accessToken);
			if (!expToken) {
				console.log('not expired');
				this.authStore.login({
					idToken: localStorage.getItem('idToken'),
					accessToken: localStorage.getItem('accessToken'),
					refreshToken: localStorage.getItem('refreshToken')
				});
				return true;
			} else {
				return this.http.refreshToken()
					.pipe(
						switchMap(() => {
							console.log('refresh token fetch Done');
							return of(true);
						}),
						catchError(() => {
							console.log('refresh token fetch Error');
							router.navigateByUrl('users');
							return of(false);
						})
					);
				/*.subscribe( () => {
					console.log( 'refresh token fetch Done' );
					return of( true );
				}, error => {
					this.authStore.logout();
					console.log( 'refresh token fetch Error' );
					router.navigateByUrl( 'users' );
					return false;
				} );*/
			}
		} else {
			console.log('token empty');
			this.router.navigateByUrl('users');
			return false;
		}

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.authStore.authState$
			.pipe(
				map(value => value.isLoggedIn)
			);
	}

}

