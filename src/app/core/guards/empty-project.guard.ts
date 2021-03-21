import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { map } from 'rxjs/operators';

@Injectable()
export class EmptyProjectGuard implements CanActivate {
	constructor( private http: DashboardProjectService, private router: Router ) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.http.getAllProjects()
			.pipe(
				map( value => {
					if ( value.length === 0 ) {
						return true;
					} else {
						this.router.navigateByUrl( 'dashboard/project/list' );
						return false;
					}
				} )
			);
	}

}
