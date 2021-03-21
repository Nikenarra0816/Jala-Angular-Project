import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { IPipelineList, IPipelineListAndLead } from '@shared/models/pipeline.model';
import { IColorUsed } from '@core/services/dashboard-pipeline/dashboard-pipeline.service';
import { FormBuilder } from '@angular/forms';
import { inOutAnimationTopRight } from '@shared/animations/inOutAnimation';

@Component( {
	selector: 'app-pipeline-detail-list',
	templateUrl: './pipeline-detail-list.component.html',
	styleUrls: [ './pipeline-detail-list.component.scss' ],
	animations: [ inOutAnimationTopRight ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class PipelineDetailListComponent implements OnChanges {
	@Input() dataParent: IPipelineListAndLead;
	@Input() color: IColorUsed;
	@Output() deleteClicked = new EventEmitter<IPipelineList>();
	@Output() editClicked = new EventEmitter<IPipelineList>();
	isShowActionList = false;

	constructor( private http: DashboardProjectService, private fb: FormBuilder ) {
		/*this.searchInputForm.valueChanges.pipe( untilDestroyed( this ) )
			.subscribe( value => {
				if ( value === '' ) {
					this.allLeadFiltered = this.allLead;
				} else {
					this.allLeadFiltered = this.allLead.filter( value1 => {
						const name = value1.data.name;
						if ( name === null ) {
							return false;
						}
						return value1.data.name.toLowerCase().includes( value.toLowerCase() );
					} );
				}
			} );
		this.formGroup.valueChanges
			.pipe(
				untilDestroyed( this ),
				debounceTime( 500 ),
				map( value => {
					const x = value;
					Object.keys( x ).forEach( ( key ) => {
						return ( ( x[key] === null ) || ( x[key] === undefined ) ) && delete x[key];
					} );
					return x;
				} )
			)
			.subscribe( result => {
				const arrOfKey = Object.keys( result );
				/!* IKI DATA TABLE *!/
				let allResult: Lead[] = this.allLead;
				arrOfKey.forEach( objKeys => {
					allResult = allResult.filter( val => val[objKeys].id === result[objKeys] );
				} );
				this.allLeadFiltered = allResult;
				this.totalPrice = this.setTotalPrice();
			} );*/
	}

	totalPrice: number;
	// allLead: Lead[];
	// searchInputForm = this.fb.control( '' );
	/*dataFilter = {
		getChannel: [],
		getSalesOfficer: [],
		getCategory: [],
	};
	formGroup = this.fb.group( {
		getChannel: [],
		getSalesOfficer: [],
		getCategory: [],
	} );*/

	// allLeadFiltered: Lead[];

	setTotalPrice() {
		// return this.allLeadFiltered.reduce( ( acc, cur ) => acc + cur.data.interest.productPrice, 0 );
		return this.dataParent.lead.reduce( ( acc, cur ) => {
			return acc + cur.getAllProductTotalPrice;
		}, 0 );
	}

	deleteClick() {
		this.isShowActionList = !this.isShowActionList;
		this.deleteClicked.emit( this.dataParent.pipeline );
	}

	editClick() {
		this.isShowActionList = !this.isShowActionList;
		this.editClicked.emit( this.dataParent.pipeline );
	}

	actionClick() {
		this.isShowActionList = !this.isShowActionList;
	}

	/*setInitLead( value: Lead[] ): Lead[] {
		const checkFilter = Object.keys( this.dataParent.filters ).length === 0 && this.dataParent.filters.constructor === Object;
		if ( checkFilter ) {
			return value;
		}
		return value.filter( value1 => {
			const filter = this.dataParent.filters.statuses.findIndex( value2 => value2.project.id === value1.data.group.projectId );
			if ( filter !== -1 ) {
				const index = this.dataParent.filters.statuses.findIndex( value2 => value2.name === value1.getStatusSort.name );
				return index !== -1;
			} else {
				return false;
			}
		} );
	}*/

	/*setupFilter( value: Lead[] ) {
		value.forEach( value1 => {
			const idChannel = this.dataFilter.getChannel.findIndex( value2 => value2.value === value1.getChannel.id );
			if ( idChannel === -1 ) {
				this.dataFilter.getChannel = [ ...this.dataFilter.getChannel, {
					value: value1.getChannel.id,
					label: value1.getChannel.name
				} ];
			}
			const idOfficer = this.dataFilter.getSalesOfficer.findIndex( value2 => value2.value === value1.getSalesOfficer.id );
			if ( idOfficer === -1 ) {
				this.dataFilter.getSalesOfficer = [ ...this.dataFilter.getSalesOfficer, {
					value: value1.getSalesOfficer.id,
					label: value1.getSalesOfficer.name
				} ];
			}
			const idCategory = this.dataFilter.getCategory.findIndex( value2 => value2.value === value1.getCategorySort.id );
			if ( idCategory === -1 ) {
				this.dataFilter.getCategory = [ ...this.dataFilter.getCategory, {
					value: value1.getCategorySort.id,
					label: value1.getCategorySort.name
				} ];
			}
		} );
	}*/

	ngOnChanges( changes: SimpleChanges ) {
		if ( changes.dataParent.currentValue ) {
			this.totalPrice = this.setTotalPrice();
		}
		/*this.http.getAllLeads()
			// .pipe(
			// 	map( value => this.setInitLead( value ) )
			// )
			.subscribe( value => {
				this.allLead = value;
				// this.allLeadFiltered = value;
				this.totalPrice = this.setTotalPrice();
				// this.setupFilter( value );
			} );*/
	}


}
