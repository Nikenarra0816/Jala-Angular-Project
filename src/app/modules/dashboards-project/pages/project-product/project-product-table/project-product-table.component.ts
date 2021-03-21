import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IProduct } from '@shared/models/product.model';
import { CustomStateService } from '@core/services/custom-state/custom-state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component( {
	selector: 'app-project-product-table',
	templateUrl: './project-product-table.component.html',
	styleUrls: [ './project-product-table.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ProjectProductTableComponent implements OnChanges, AfterViewInit {
	@Input() dataProduct: IProduct[];
	@Output() editClicked = new EventEmitter<IProduct>();
	@Output() addClicked = new EventEmitter();

	@ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
	@ViewChild( MatSort, { static: true } ) sort: MatSort;

	columnsToDisplay = [ 'alias', 'name', 'status', 'minBookingPrice', 'price', 'action' ];
	dataSource = new MatTableDataSource<IProduct>();

	constructor(
		private filterLead: CustomStateService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
	}

	jumpToLead( id ) {
		this.filterLead.setFilter = { getInterests: id };
		this.router.navigate( [ '../lead' ], { relativeTo: this.activatedRoute } );
	}

	editData( value ) {
		this.editClicked.emit( value );
	}

	addProduct() {
		this.addClicked.emit();
	}

	ngOnChanges( changes: SimpleChanges ) {
		if ( changes.dataProduct.currentValue ) {
			this.dataSource.data = this.dataProduct;
		}
	}

	ngAfterViewInit(): void {
		this.dataSource.sortingDataAccessor = ( data, sortHeaderId ) => {
			switch ( sortHeaderId ) {
				case 'status':
					return data.isActive;
				default :
					return data[ sortHeaderId ];
			}
		};
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

}
