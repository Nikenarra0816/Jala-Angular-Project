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
import { FormControl } from '@angular/forms';
import { Customer } from '@shared/models/customer.model';
import { debounceTime } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component( {
	selector: 'app-project-customer-table',
	templateUrl: './project-customer-table.component.html',
	styleUrls: [ './project-customer-table.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ProjectCustomerTableComponent implements OnChanges, AfterViewInit, OnDestroy {
	@Input() dataCustomers: Customer[];
	@Input() columnsToShow = [ 'name', 'category', 'status', 'salesOfficer', 'achievedTimes', 'lastPurchased', 'totalPurchased', 'action' ];
	@Output() rowClicked = new EventEmitter<Customer>();

	@ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
	@ViewChild( MatSort, { static: true } ) sort: MatSort;

	columns = new FormControl();
	columnsToDisplay = [ 'name', 'category', 'status', 'salesOfficer', 'achievedTimes', 'lastPurchased', 'totalPurchased', 'action' ];
	expandedData: any | null;
	dataSource = new MatTableDataSource<Customer>();
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
		this.rowClicked.emit( data );
	}

	ngAfterViewInit(): void {
		this.dataSource.sortingDataAccessor = ( data, sortHeaderId ) => {
			// const isProductEmpty = data.data.interests.length === 0;
			switch ( sortHeaderId ) {
				case 'category':
					return data.getCategory.name;
				case 'status':
					return data.getStatus.name;
				case 'salesOfficer':
					return data.getSalesOfficer.id;
				case 'lastPurchased':
					return data.data.modifiedAt;
				default :
					return data.data[sortHeaderId];
			}
		};
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.paginator.page.asObservable().subscribe( value => console.log( value ) );
	}

	ngOnChanges( changes: SimpleChanges ) {
		if ( changes.dataCustomers.currentValue ) {
			this.dataSource.data = this.dataCustomers;
		}
		this.columns.setValue( this.columnsToShow );
	}

	ngOnDestroy(): void {
	}

}
