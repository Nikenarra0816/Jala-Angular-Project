import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/services/api.service';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { AuthenticationStoreService } from '@core/store/authentication/authentication-store.service';

@Injectable()
export class CheckPaymentGuard implements CanActivate {

	constructor(
		private http: HttpClient,
		private api: ApiService,
		private user: AuthenticationStoreService,
		@Inject( DOCUMENT ) private document: Document
	) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const user = this.user.authState.user;
		return this.http.get<{ status: number, values: any[] }>( this.api.getRegisterUrl + `user/checkpayment/${ user['custom:tenant_id'] }` )
			.pipe(
				map( value => {
					if ( value.values.length === 0 ) {
						this.user.logout();
						this.document.location.href = `http://register.dev.jala.ai/register?email=${ user.email }`;
						return false;
					} else {
						if ( value.values[0].status_name === 'Unpaid' ) {
							this.user.logout();
							this.document.location.href = `http://register.dev.jala.ai/register?email=${ user.email }`;
							return false;
						}
						return true;
					}
				} )
			);
		// return true;
	}

}
