import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SalesTeam } from '@shared/models/sales-team.model';

@Component( {
	selector: 'app-team-sales-team-grid-view',
	templateUrl: './team-sales-team-grid-view.component.html',
	styleUrls: [ './team-sales-team-grid-view.component.scss' ]
} )
export class TeamSalesTeamGridViewComponent implements OnInit {
	@Input() dataTeam: SalesTeam[];
	@Output() detailClicked = new EventEmitter();
	@Output() editClicked = new EventEmitter();

	constructor() {
	}

	_editClicked( data: SalesTeam ) {
		this.editClicked.emit( data );
	}

	_detailClicked( data: SalesTeam ) {
		this.detailClicked.emit( data );
	}

	ngOnInit() {
	}

}
