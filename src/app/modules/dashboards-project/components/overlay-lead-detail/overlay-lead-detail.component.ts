import { Component, OnChanges, OnDestroy } from '@angular/core';
import { ILeadJourney, Lead } from '@shared/models/lead.model';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { Observable } from 'rxjs';

@Component( {
	selector: 'app-overlay-lead-detail',
	templateUrl: './overlay-lead-detail.component.html',
	styleUrls: [ './overlay-lead-detail.component.scss' ]
} )
export class OverlayLeadDetailComponent implements OnChanges, OnDestroy {
	isOpen = false;
	dataLead: Observable<Lead>;
	dataJourney: Observable<ILeadJourney[]>;

	constructor(
		private http: DashboardProjectService
	) {
	}

	public open( data: Lead ) {
		if ( data ) {
			this.isOpen = true;
			this.dataLead = this.http.getLeadsById( data.data.uuid );
			this.dataJourney = this.http.getLeadsJourney( data.data.uuid );
		}
	}

	close() {
		this.isOpen = false;
	}

	ngOnChanges() {
	}

	ngOnDestroy(): void {
	}

}
