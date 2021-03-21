import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DashboardProfileService } from '@core/services/dashboard-profile/dashboard-profile.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CheckProfileGuard implements CanActivate {

	constructor(
		private http: DashboardProfileService,
	) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.http.getProfile()
			.pipe(
				map( () => {
					return true;
				} )
			);
	}

}
