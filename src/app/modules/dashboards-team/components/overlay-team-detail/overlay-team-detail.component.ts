import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { DashboardSalesTeamService } from '@core/services/dashboard-sales-team/dashboard-sales-team.service';
import { SalesTeam } from '@shared/models/sales-team.model';

@Component( {
	selector: 'app-overlay-team-detail',
	templateUrl: './overlay-team-detail.component.html',
	styleUrls: [ './overlay-team-detail.component.scss' ]
} )
export class OverlayTeamDetailComponent implements OnChanges {
	isOpen = false;
	data: SalesTeam;
	// dataJourney: Observable<ILeadJourney[]>;
	dummyDate = Date.now();

	constructor( private http: DashboardSalesTeamService ) {
	}

	public open( data: SalesTeam ) {
		if ( data ) {
			this.isOpen = true;
			console.log( data );
			this.data = data;
			// this.dataJourney = this.http.getLeadsJourney( data.data.uuid );
		}
	}

	close() {
		this.isOpen = false;
	}

	ngOnChanges( changes: SimpleChanges ): void {
	}

}
