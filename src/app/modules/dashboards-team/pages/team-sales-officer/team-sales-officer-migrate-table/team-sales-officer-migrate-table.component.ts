import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Lead } from '@shared/models/lead.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component( {
	selector: 'app-team-sales-officer-migrate-table',
	templateUrl: './team-sales-officer-migrate-table.component.html',
	styleUrls: [ './team-sales-officer-migrate-table.component.scss' ]
} )
export class TeamSalesOfficerMigrateTableComponent implements OnChanges, AfterViewInit {
	@Input() dataLeads: Lead[];
	@Output() leadsCheck = new EventEmitter<string[]>();

	@ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
	@ViewChild( MatSort, { static: true } ) sort: MatSort;


	columnsToDisplay = [ 'name', 'category', 'status', 'salesOfficer', 'channel', 'checkbox' ];
	dataSource = new MatTableDataSource<Lead>();

	constructor() {
	}

	checkBoxValue: { uuid: string, checked: boolean }[] = [];

	getDataChecked( value ) {
		return this.checkBoxValue.find( value1 => value1.uuid === value.data.uuid );
	}

	setDataChecked( value: Lead, event: boolean ) {
		this.checkBoxValue.find( value1 => value1.uuid === value.data.uuid ).checked = event;
		const x = this.checkBoxValue.filter( value1 => value1.checked ).map( value1 => value1.uuid );
		this.leadsCheck.emit( x );
	}

	checkAll( event ) {
		this.checkBoxValue.forEach( value => value.checked = event );
		const x = this.checkBoxValue.filter( value1 => value1.checked ).map( value1 => value1.uuid );
		this.leadsCheck.emit( x );
	}

	ngOnChanges( changes: SimpleChanges ): void {
		if ( changes.dataLeads.currentValue ) {
			this.dataSource.data = this.dataLeads;
			this.checkBoxValue = this.dataLeads.map( value => {
				return { uuid: value.data.uuid, checked: false };
			} );
		}
	}

	ngAfterViewInit(): void {
		this.dataSource.sortingDataAccessor = ( data, sortHeaderId ) => {
			switch ( sortHeaderId ) {
				case 'category':
					return data.getCategory.name;
				case 'status':
					return data.getStatus.name;
				case 'salesOfficer':
					return data.getSalesOfficer.id;
				case 'channel':
					return data.getChannel.name;
				default :
					return data.data[ sortHeaderId ];
			}
		};
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

}
