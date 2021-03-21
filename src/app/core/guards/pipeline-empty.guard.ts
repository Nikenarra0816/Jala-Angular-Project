import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardPipelineService } from '@core/services/dashboard-pipeline/dashboard-pipeline.service';
import { map } from 'rxjs/operators';

@Injectable( )
export class PipelineEmptyGuard implements CanActivate {

	constructor( private router: Router, private http: DashboardPipelineService ) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.http.getAllPipeline()
			.pipe( map( value => {
				if ( value.length === 0 ) {
					return true;
				} else {
					this.router.navigateByUrl( 'dashboard/pipeline/list' );
					return false;
				}
			} ) );
	}

}
