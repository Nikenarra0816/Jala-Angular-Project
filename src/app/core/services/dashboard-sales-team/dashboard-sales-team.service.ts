import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { ISalesTeam, ISalesTeamSummary, SalesTeam } from '@shared/models/sales-team.model';
import { map, switchMap } from 'rxjs/operators';
import { ICoverage } from '@shared/models/coverage.model';
import { forkJoin } from 'rxjs';

@Injectable()
export class DashboardSalesTeamService {
	private url = this.apiService.getUrl + 'teams';
	private urlCoverage = this.apiService.getUrl + 'locations';
	private urlSummary = this.apiService.getBareUrl + 'report/summary/sales_teams';

	constructor( private apiService: ApiService, private http: HttpClient ) {
	}

	//////////// TEAMS  //////////////
	getAllSalesTeam( force = false ) {
		const headers = force ? this.apiService.needForce() : undefined;
		return this.http.get<ISalesTeam[]>( this.url, { headers } )
			.pipe(
				map( ( value ) => value.map( val => new SalesTeam( val ) ) )
			);
	}

	updateSalesTeam( id, body ) {
		return this.http.put( this.url + `/${ id }`, body );
	}

	createSalesTeam( body ) {
		return this.http.post( this.url, [ body ] );
	}

	//////////////////////////////////
	//////////// COVERAGE  //////////////

	getSubCoverageById( coverageId ) {
		return this.http.get<ICoverage[]>( this.urlCoverage + `/${ coverageId }/subs` );
	}

	getAllSubCoverage() {
		return this.http.get<ICoverage[]>( this.urlCoverage )
			.pipe(
				switchMap( value => forkJoin(
					value.map( value1 => this.getSubCoverageById( value1.id ) )
				) ),
				map( value => Array.prototype.concat( ...value ) )
			);
	}

	//////////////////////////////////
	//////////// SUMMARY  //////////////

	getAllSalesTeamSummary() {
		return this.http.get<ISalesTeamSummary[]>( this.urlSummary );
	}

	//////////////////////////////////
}
