import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	Output,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Lead } from '@shared/models/lead.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component( {
	selector: 'app-project-lead-table',
	templateUrl: './project-lead-table.component.html',
	styleUrls: [ './project-lead-table.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ProjectLeadTableComponent implements OnChanges, AfterViewInit, OnDestroy {
	@Input() dataLeads: Lead[];
	@Input() columnsToShow = [ 'name', 'category', 'status', 'salesOfficer', 'salesTeam', 'channel', 'campaign', 'createdAt', 'modifiedAt' ];
	@Output() openOverlay = new EventEmitter<Lead>();

	@ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
	@ViewChild( MatSort, { static: true } ) sort: MatSort;

	columns = new FormControl();
	columnsToDisplay = [ 'name', 'email', 'gender', 'age', 'address', 'ktp', 'location', 'category', 'status', 'salesOfficer',
		'salesTeam', 'channel', 'campaign', 'product', 'productPrice', 'createdAt', 'modifiedAt' ];
	expandedData: any | null;
	dataSource = new MatTableDataSource<Lead>();
	// pageSize
	pageSizeOption = [
		{
			value: 5,
			label: '5'
		},
		{
			value: 10,
			label: '10'
		},
		{
			value: 20,
			label: '20'
		},
		{
			value: 0,
			label: 'ALL'
		}
	];
	pageSize = new FormControl( 5 );

	///////////

	constructor() {
		this.pageSize.valueChanges
			.pipe(
				debounceTime( 500 ),
				untilDestroyed( this )
			)
			.subscribe( value => {
				if ( value === 0 ) {
					this.dataSource.paginator.pageSize = this.dataSource.data.length;
					this.dataSource.paginator.pageIndex = 0;
				} else {
					this.dataSource.paginator.pageSize = value;
					this.dataSource.paginator.pageIndex = 0;
				}
				this.dataSource._updateChangeSubscription();
			} );
	}

	show( data ) {
		this.expandedData = this.expandedData === data ? null : data;
		this.openOverlay.emit( data );
	}

	ngOnChanges( changes: SimpleChanges ) {
		if ( changes.dataLeads.currentValue ) {
			this.dataSource.data = this.dataLeads;
		}
		this.columns.setValue( this.columnsToShow );
	}

	ngAfterViewInit(): void {
		this.dataSource.sortingDataAccessor = ( data, sortHeaderId ) => {
			const isProductEmpty = data.data.interests.length === 0;
			switch ( sortHeaderId ) {
				case 'category':
					return data.getCategory.name;
				case 'status':
					return data.getStatus.name;
				case 'salesOfficer':
					return data.getSalesOfficer.name;
				case 'salesTeam':
					return data.getSalesTeam.name;
				case 'channel':
					return data.getChannel.name;
				case 'campaign':
					return data.getCampaign.name;
				case 'gender':
					return data.getGender;
				case 'ktp':
					return data.getKtp;
				case 'location':
					return data.getLocation;
				case 'product':
					return isProductEmpty ? '-' : data.data.interests[0].product;
				case 'productPrice':
					return isProductEmpty ? 0 : data.data.interests.reduce( ( acc, cur ) => cur.productPrice + acc, 0 );
				default :
					return data.data[sortHeaderId];
			}
		};
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	ngOnDestroy(): void {
	}

}
