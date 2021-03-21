import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SalesOfficer } from '@shared/models/sales-officer.model';

@Component( {
	selector: 'app-team-sales-officer-grid-view',
	templateUrl: './team-sales-officer-grid-view.component.html',
	styleUrls: [ './team-sales-officer-grid-view.component.scss' ]
} )
export class TeamSalesOfficerGridViewComponent implements OnInit {
	@Input() dataOfficer: SalesOfficer[];
	@Output() editClicked = new EventEmitter<SalesOfficer>();
	@Output() detailClicked = new EventEmitter<SalesOfficer>();

	constructor() {
	}

	_editClicked( data: SalesOfficer ) {
		this.editClicked.emit( data );
	}

	_detailClicked( data: SalesOfficer ) {
		this.detailClicked.emit( data );
	}

	ngOnInit() {
	}

}
