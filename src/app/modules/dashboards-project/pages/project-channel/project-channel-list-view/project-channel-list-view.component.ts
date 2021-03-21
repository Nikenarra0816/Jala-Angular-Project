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
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Channel } from '@shared/models/channel.model';
import { CustomStateService } from '@core/services/custom-state/custom-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component( {
	selector: 'app-project-channel-list-view',
	templateUrl: './project-channel-list-view.component.html',
	styleUrls: [ './project-channel-list-view.component.scss' ],
	animations: [
		trigger( 'detailExpand', [
			state( 'collapsed, void', style( { height: '0', minHeight: '0', opacity: '0' } ) ),
			state( 'expanded', style( { height: '*' } ) ),
			transition( 'expanded <=> collapsed', animate( '225ms cubic-bezier(0.4, 0.0, 0.2, 1)' ) ),
			transition( 'expanded <=> void', animate( '225ms cubic-bezier(0.4, 0.0, 0.2, 1)' ) ),
		] ),
	],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ProjectChannelListViewComponent implements OnChanges, AfterViewInit, OnDestroy {
	@Input() dataChannel: Channel[];
	@Output() editClicked = new EventEmitter<Channel>();

	@ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
	@ViewChild( MatSort, { static: true } ) sort: MatSort;

	columnsToDisplay = [ 'alias', 'name', 'status', 'leads', 'click', 'clickRate', 'salesTeam', 'salesOfficer', 'startDate', 'endDate', 'action' ];
	dataSource = new MatTableDataSource<Channel>();

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

	constructor( private filterLead: CustomStateService, private router: Router, private route: ActivatedRoute ) {
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

	jumpToLead( value ) {
		this.filterLead.setFilter = { getChannel: value };
		this.router.navigate( [ '../', 'lead' ], { relativeTo: this.route } );
	}

	edit( value: Channel ) {
		this.editClicked.emit( value );
	}

	ngOnChanges( changes: SimpleChanges ) {
		this.dataSource.data = this.dataChannel;
	}

	ngAfterViewInit(): void {
		this.dataSource.sortingDataAccessor = ( data, sortHeaderId ) => {
			switch ( sortHeaderId ) {
				case 'leads':
					return data.data.totalLeads;
				case 'click':
					return data.data.click;
				case 'clickRate':
					return data.data.clickRate;
				case 'salesTeam':
					return data.data.totalTeam;
				case 'salesOfficer':
					return data.data.totalSales;
				case 'startDate':
					return data.data.periodStart;
				case 'endDate':
					return data.data.periodEnd;
				default :
					return data.data[ sortHeaderId ];
			}
		};
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	ngOnDestroy(): void {
	}

}
