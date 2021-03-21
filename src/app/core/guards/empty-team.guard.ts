import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { DashboardSalesOfficerService } from '@core/services/dashboard-sales-officer/dashboard-sales-officer.service';
import { DashboardSalesTeamService } from '@core/services/dashboard-sales-team/dashboard-sales-team.service';
import { map } from 'rxjs/operators';

@Injectable()
export class EmptyTeamGuard implements CanActivate {

	constructor( private http2: DashboardSalesOfficerService, private http: DashboardSalesTeamService, private router: Router ) {

	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return forkJoin(
			this.http.getAllSalesTeam(),
			this.http2.getAllSalesOfficers()
		)
			.pipe(
				map( ( value ) => {
					if ( ( value[ 0 ].length === 0 ) && ( value[ 1 ].length === 0 ) ) {
						return true;
					} else {
						this.router.navigateByUrl( 'dashboard/team/list' );
						return false;
					}
				} )
			);
	}

}
