import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ISalesOfficer, ISalesOfficerMetadata, ISalesOfficerSummary, SalesOfficer } from '@shared/models/sales-officer.model';
import { ISalesTeam } from '@shared/models/sales-team.model';

@Injectable()
export class DashboardSalesOfficerService {
	private url = this.apiService.getUrl + 'users';
	private urlTeam = this.apiService.getUrl + 'teams';
	private urlJourney = this.apiService.getUrl + 'journeys';
	private urlSummary = this.apiService.getBareUrl + 'report/summary/sales_officers';
	private urlMigrate = this.apiService.getBareUrl + 'operation/migrate_lead';

	constructor( private apiService: ApiService, private http: HttpClient ) {
	}

	//////////// OFFICERS  //////////////

	getAllSalesOfficers( force = false ) {
		const headers = force ? this.apiService.needForce() : undefined;
		return this.http.get<ISalesOfficer[]>( this.url, { params: { search: 'role:salesofficer' }, headers } )
			.pipe(
				map( ( value ) => value.map( ( val ) => new SalesOfficer( val ) ) )
			);
	}

	getAllTeamsIdAndName() {
		return this.http.get<ISalesTeam[]>( this.urlTeam )
			.pipe(
				map( value => value.map( value1 => {
					return { id: value1.id, name: value1.name };
				} ) )
			);
	}

	updateSalesOfficer( idUser, body ) {
		return this.http.put( this.url + `/${ idUser }`, body );
	}

	createSalesOfficer( body ) {
		return this.http.post( this.url, [ body ] );
	}

	/*getTeamOfSalesOfficer( id ) {
		return this.http.get<ISalesOfficerMember[]>( this.url + `/${ id }/members` );
	}*/

	getSalesOfficerMetadata() {
		return this.http.get<ISalesOfficerMetadata>( this.url + '/metadata' );
	}

	//////////////////////////////////////
	//////////// JOURNEYS  //////////////

	getSalesOfficerJourney( id ) {
		const params = {
			owner_id: id
		};
		return this.http.get( this.urlJourney, { params } );
	}

	//////////////////////////////////////
	//////////// SUMMARY  //////////////

	getAllSalesOfficerSummary() {
		return this.http.get<ISalesOfficerSummary[]>( this.urlSummary );
	}

	//////////////////////////////////
	//////////// SUMMARY  //////////////

	migrateLeads( body ) {
		return this.http.post( this.urlMigrate, body );
	}

	//////////////////////////////////
}
