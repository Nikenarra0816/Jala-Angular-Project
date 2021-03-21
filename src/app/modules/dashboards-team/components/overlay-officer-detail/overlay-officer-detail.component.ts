import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { DashboardSalesOfficerService } from '@core/services/dashboard-sales-officer/dashboard-sales-officer.service';
import { SalesOfficer } from '@shared/models/sales-officer.model';
import { Observable } from 'rxjs';

@Component( {
	selector: 'app-overlay-officer-detail',
	templateUrl: './overlay-officer-detail.component.html',
	styleUrls: [ './overlay-officer-detail.component.scss' ]
} )
export class OverlayOfficerDetailComponent implements OnChanges {
	isOpen = false;
	data: SalesOfficer;
	dummyDate = Date.now();
	dataJourney: Observable<any>;

	constructor( private http: DashboardSalesOfficerService ) {
	}

	public open( data: SalesOfficer ) {
		if ( data ) {
			this.isOpen = true;
			this.data = data;
			this.dataJourney = this.http.getSalesOfficerJourney( data.data.id );
		}
	}

	close() {
		this.isOpen = false;
	}

	ngOnChanges( changes: SimpleChanges ): void {
	}

}
