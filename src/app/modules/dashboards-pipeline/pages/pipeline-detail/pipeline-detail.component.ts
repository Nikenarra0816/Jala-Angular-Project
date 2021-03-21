import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardPipelineService, IColorUsed } from '@core/services/dashboard-pipeline/dashboard-pipeline.service';
import { MatDialog } from '@angular/material';
import { PipelineDetailAddComponent } from '@jala-modules/dashboards-pipeline/pages/pipeline-detail/pipeline-detail-add/pipeline-detail-add.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { IPipeline, IPipelineList, IPipelineListAndLead } from '@shared/models/pipeline.model';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { DialogConfirmationComponent } from '@shared/components/dialog-confirmation/dialog-confirmation.component';
import { PipelineDetailEditComponent } from '@jala-modules/dashboards-pipeline/pages/pipeline-detail/pipeline-detail-edit/pipeline-detail-edit/pipeline-detail-edit.component';
import { FormBuilder } from '@angular/forms';
import { Lead } from '@shared/models/lead.model';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { addDays, isWithinInterval, parseISO, startOfDay, subMonths } from 'date-fns';

@Component( {
	selector: 'app-pipeline-detail',
	templateUrl: './pipeline-detail.component.html',
	styleUrls: [ './pipeline-detail.component.scss' ]
} )
export class PipelineDetailComponent implements OnInit, OnDestroy {

	constructor(
		private activatedRoute: ActivatedRoute,
		private http: DashboardPipelineService,
		private http2: DashboardProjectService,
		private dialog: MatDialog,
		private fb: FormBuilder
	) {
		this.pipelineId = Number( this.activatedRoute.snapshot.paramMap.get( 'id' ) );

		this.formGroup.valueChanges
			.pipe(
				untilDestroyed( this ),
				debounceTime( 500 ),
				map( value => {
					const x = value;
					Object.keys( x ).forEach( ( key ) => {
						return ( ( x[key] === null ) || ( x[key] === undefined ) || ( key === 'getDate' ) ) && delete x[key];
					} );
					return x;
				} )
			)
			.subscribe( result => {
				const arrOfKey = Object.keys( result );
				let allResult: IPipelineListAndLead[] = this.dataPipelineListAndLead;
				arrOfKey.forEach( objKeys => {
					allResult = allResult.map<IPipelineListAndLead>( ( pipeline ) => {
						return {
							pipeline: pipeline.pipeline,
							lead: pipeline.lead.filter( val => val[objKeys].id === result[objKeys] )
						};
					} );
				} );
				const date = this.getDate.value;
				if ( date ) {
					allResult = allResult.map<IPipelineListAndLead>( value => {
						return {
							pipeline: value.pipeline,
							lead: value.lead.filter( lead => {
								const parseDate = parseISO( lead.data.createdAt );
								return isWithinInterval(
									parseDate,
									{
										start: startOfDay( date[0] ),
										end: addDays( startOfDay( date[1] ), 1 )
									} );
							} )
						};
					} );
				}
				this.filteredDataPipelineListAndLead = allResult;
				this.dataFilter = this.setupFilter( allResult.reduce( ( acc, cur ) => acc.concat( cur.lead ), [] as Lead[] ) );
			} );
	}

	//// tampilan //
	allColor: IColorUsed;
	////////////////
	pipelineId: number;
	dataPipeline$: Observable<IPipeline>;
	dataPipelineListAndLead: IPipelineListAndLead[];
	filteredDataPipelineListAndLead: IPipelineListAndLead[];
	dataPipeline: IPipeline;
	dateNow = new Date();

	//// FORM FILTER ////
	// originalDataFilter: IDataFilterPipelineLead;
	dataFilter: IDataFilterPipelineLead;

	formGroup = this.fb.group( {
		getDate: [],
		getChannel: [],
		getSalesOfficer: [],
		getCategory: []
	} );

	/////////////////////

	//////////////////////////////////////
	openDialog(): void {
		const dialogRef = this.dialog.open( PipelineDetailAddComponent, {
			data: this.dataPipeline
		} );

		dialogRef.afterClosed()
			.pipe( untilDestroyed( this ) )
			.subscribe( result => {
				if ( result === 'success' ) {
					this.refreshPipelineAndLead();
				}
			} );
	}

	deletePipeline( val: IPipelineList ) {
		const data = {
			h3: `Are you sure want to delete ${ val.name } ?`,
		};
		const dialogRef = this.dialog.open( DialogConfirmationComponent, { data } );
		dialogRef.afterClosed()
			.pipe(
				untilDestroyed( this ),
				filter( value => value ),
				switchMap( value => {
					return this.http.deletePipelineList( val.id );
				} )
			)
			.subscribe( ( value ) => {
				this.refreshPipelineAndLead();
			} );
	}

	editPipeline( val: IPipelineList ) {
		const dialogRef = this.dialog.open( PipelineDetailEditComponent, {
			data: { dataPipeline: this.dataPipeline, dataPipelineList: val }
		} );

		dialogRef.afterClosed()
			.pipe( untilDestroyed( this ) )
			.subscribe( result => {
				if ( result === 'success' ) {
					this.refreshPipelineAndLead();
				}
			} );
	}

	setupLeadForPipelineList( pipeline: IPipelineList[], leads: Lead[] ): IPipelineListAndLead[] {

		const result: IPipelineListAndLead[] = [];
		// fill result var with pipeline and sort
		pipeline.forEach( value => {
			result.push( { lead: [], pipeline: value } );
		} );
		result.sort( ( a, b ) => b.pipeline.sort - a.pipeline.sort );
		///////////////////
		////// filter from pipeline
		leads.forEach( value => {
			const indexFrom = result.findIndex( value1 => {
				const indexOfProject = value1.pipeline.filters.statuses.findIndex( value2 => value2.project.id === value.data.group.projectId );
				if ( indexOfProject !== -1 ) {
					const indexOfStatus = value1.pipeline.filters.statuses.findIndex( value2 => value2.name === value.getStatusSort.name );
					return indexOfStatus !== -1;
				} else {
					return false;
				}
			} );
			if ( indexFrom !== -1 ) {
				result[indexFrom].lead.push( value );
			}
		} );
		return result;
		/*const checkFilter = Object.keys( this.dataParent.filters ).length === 0 && this.dataParent.filters.constructor === Object;
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
		} );*/
	}

	get getDate() {
		return this.formGroup.get( 'getDate' );
	}

	setupFilter( value: Lead[] ) {
		const groupFilter = {
			getDate: [],
			getChannel: [],
			getSalesOfficer: [],
			getCategory: [],
		};
		value.forEach( value1 => {
			const idChannel = groupFilter.getChannel.findIndex( value2 => value2.value === value1.getChannel.id );
			if ( idChannel === -1 ) {
				groupFilter.getChannel = [ ...groupFilter.getChannel, {
					value: value1.getChannel.id,
					label: value1.getChannel.name
				} ];
			}
			const idOfficer = groupFilter.getSalesOfficer.findIndex( value2 => value2.value === value1.getSalesOfficer.id );
			if ( idOfficer === -1 ) {
				groupFilter.getSalesOfficer = [ ...groupFilter.getSalesOfficer, {
					value: value1.getSalesOfficer.id,
					label: value1.getSalesOfficer.name
				} ];
			}
			const idCategory = groupFilter.getCategory.findIndex( value2 => value2.value === value1.getCategorySort.id );
			if ( idCategory === -1 ) {
				groupFilter.getCategory = [ ...groupFilter.getCategory, {
					value: value1.getCategorySort.id,
					label: value1.getCategorySort.name
				} ];
			}
		} );
		return groupFilter;
	}

	refreshPipelineAndLead() {
		this.http.getPipelineList( this.pipelineId )
			.pipe(
				untilDestroyed( this ),
				switchMap( value => {
					return this.http2.getAllLeads()
						.pipe(
							map( ( value1 ) => {
								return this.setupLeadForPipelineList( value, value1 );
							} ),
						);
				} )
			)
			.subscribe( value => {
				// value.forEach( value1 => {
				// 	this.originalDataFilter = this.setupFilter( value1.lead );
				// 	this.dataFilter = this.originalDataFilter;
				// } );
				// this.originalDataFilter =
				this.dataFilter = this.setupFilter( value.reduce( ( acc, cur ) => acc.concat( cur.lead ), [] as Lead[] ) );
				this.dataPipelineListAndLead = value;
				this.getDate.patchValue( [ subMonths( this.dateNow, 3 ), this.dateNow ] );
				// this.filteredDataPipelineListAndLead = value;
			} );
	}

	ngOnInit() {
		this.http.colorUsed$.pipe( untilDestroyed( this ) ).subscribe( value => this.allColor = value );
		this.dataPipeline$ = this.http.getPipelineById( this.pipelineId ).pipe( tap( val => this.dataPipeline = val ) );
		this.refreshPipelineAndLead();
	}

	ngOnDestroy(): void {
	}

}

interface IDataFilterPipelineLead {
	getDate: IDataFilterPipelineLeadValue[];
	getChannel: IDataFilterPipelineLeadValue[];
	getSalesOfficer: IDataFilterPipelineLeadValue[];
	getCategory: IDataFilterPipelineLeadValue[];
}

interface IDataFilterPipelineLeadValue {
	value: string;
	label: string;
}
