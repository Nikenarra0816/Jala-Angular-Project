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
import { SalesTeam } from '@shared/models/sales-team.model';
import { CustomStateService } from '@core/services/custom-state/custom-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component( {
	selector: 'app-team-sales-team-list-view',
	templateUrl: './team-sales-team-list-view.component.html',
	styleUrls: [ './team-sales-team-list-view.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TeamSalesTeamListViewComponent implements OnChanges, AfterViewInit, OnDestroy {
	@Input() dataTeams: SalesTeam[];
	@Output() detailClicked = new EventEmitter();
	@Output() editClicked = new EventEmitter();
	@ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
	@ViewChild( MatSort, { static: true } ) sort: MatSort;

	columnsToDisplay = [ 'index', 'name', 'pic', 'lead', 'channel', 'point', 'status', 'action' ];
	dataSource = new MatTableDataSource<SalesTeam>();
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

	_editClicked( data: SalesTeam ) {
		this.editClicked.emit( data );
	}

	_detailClicked( data: SalesTeam ) {
		this.detailClicked.emit( data );
	}

	jumpToLead( value ) {
		this.filterLead.setFilter = { getSalesTeam: value };
		this.router.navigate( [ '../../project/all-lead' ], { relativeTo: this.route } );
	}

	ngOnChanges( changes: SimpleChanges ): void {
		if ( changes.dataTeams.currentValue ) {
			this.dataSource.data = this.dataTeams;
		}
	}

	ngAfterViewInit(): void {
		this.dataSource.sortingDataAccessor = ( data, sortHeaderId ) => {
			switch ( sortHeaderId ) {
				case 'lead':
					return data.summary.total_lead;
				case 'channel':
					return data.summary.total_channel;
				case 'pic':
					return data.getLeader.user.name;
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
