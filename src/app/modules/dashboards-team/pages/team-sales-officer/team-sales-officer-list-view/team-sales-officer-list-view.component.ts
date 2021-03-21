import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges, OnDestroy,
	Output,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import { SalesOfficer } from '@shared/models/sales-officer.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CustomStateService } from '@core/services/custom-state/custom-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component( {
	selector: 'app-team-sales-officer-list-view',
	templateUrl: './team-sales-officer-list-view.component.html',
	styleUrls: [ './team-sales-officer-list-view.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TeamSalesOfficerListViewComponent implements OnChanges, AfterViewInit, OnDestroy {
	@Input() dataOfficer: SalesOfficer[];
	@Output() editClicked = new EventEmitter<SalesOfficer>();
	@Output() detailClicked = new EventEmitter<SalesOfficer>();
	@ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
	@ViewChild( MatSort, { static: true } ) sort: MatSort;


	columnsToDisplay = [ 'index', 'name', 'lead', 'channel', 'point', 'status', 'action' ];
	dataSource = new MatTableDataSource<SalesOfficer>();

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
	pageSize = new FormControl(5);
	///////////

	constructor( private filterLead: CustomStateService, private router: Router, private route: ActivatedRoute ) {
		this.pageSize.valueChanges
			.pipe(
				debounceTime(500),
				untilDestroyed(this)
			)
			.subscribe(value => {
				if (value === 0) {
					this.dataSource.paginator.pageSize = this.dataSource.data.length;
					this.dataSource.paginator.pageIndex = 0;
				} else {
					this.dataSource.paginator.pageSize = value;
					this.dataSource.paginator.pageIndex = 0;
				}
				this.dataSource._updateChangeSubscription();
			});
	}

	_editClicked( data: SalesOfficer ) {
		this.editClicked.emit( data );
	}

	_detailClicked( data: SalesOfficer ) {
		this.detailClicked.emit( data );
	}

	ngOnChanges( changes: SimpleChanges ): void {
		if ( changes.dataOfficer.currentValue ) {
			this.dataSource.data = this.dataOfficer;
		}
	}

	trackBy( index, item ) {
		return item.data.id;
	}

	jumpToLead( value ) {
		this.filterLead.setFilter = { getSalesOfficer: value };
		this.router.navigate( [ '../../project/all-lead' ], { relativeTo: this.route } );
	}

	ngAfterViewInit(): void {
		this.dataSource.sortingDataAccessor = ( data, sortHeaderId ) => {
			switch ( sortHeaderId ) {
				case 'lead':
					return data.summary.total_lead;
				case 'channel':
					return data.summary.total_channel;
				case 'point':
					return data.summary.total_point;
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
