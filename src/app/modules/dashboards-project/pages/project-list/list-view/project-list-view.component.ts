import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Project } from '@shared/models/project.model';
import { MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';


@Component( {
	selector: 'app-project-list-view',
	templateUrl: './project-list-view.component.html',
	styleUrls: [ './project-list-view.component.scss' ],
	animations: [
		trigger( 'detailExpand', [
			state( 'collapsed, void', style( { height: '0', minHeight: '0', opacity: '0' } ) ),
			state( 'expanded', style( { height: '*' } ) ),
			transition( 'expanded <=> collapsed', animate( '225ms cubic-bezier(0.4, 0.0, 0.2, 1)' ) ),
			transition( 'expanded <=> void', animate( '225ms cubic-bezier(0.4, 0.0, 0.2, 1)' ) ),
		] ),
	]
} )

export class ProjectListViewComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() dataProject: Project[];
	@ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
	@ViewChild( MatSort, { static: true } ) sort: MatSort;

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

	columnsToDisplay = [ 'alias', 'name', 'status', 'campaign', 'channel', 'leads', 'product', 'customer', 'startDate', 'endDate', 'action' ];
	dataSource = new MatTableDataSource<Project>();

	ngOnInit() {
		this.dataSource.data = this.dataProject;
	}


	ngOnDestroy(): void {
	}

	ngAfterViewInit(): void {
		this.dataSource.sortingDataAccessor = ( data, sortHeaderId ) => {
			switch ( sortHeaderId ) {
				case 'name':
					return data.data.name;
				case 'status':
					return data.data.status;
				case 'campaign':
					return data.summary.total_campaign;
				case 'channel':
					return data.summary.total_channel;
				case 'leads':
					return data.summary.total_lead;
				case 'customer':
					return data.summary.total_customer;
				case 'product':
					return data.summary.total_product;
				case 'startDate':
					return data.data.periodStart;
				case 'endDate':
					return data.data.periodEnd;
				default :
					return data.data[sortHeaderId];
			}
		};
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

}
