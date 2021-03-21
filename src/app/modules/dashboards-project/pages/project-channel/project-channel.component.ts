import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardReportService } from '@core/services/dashboard-report/dashboard-report.service';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { format, subMonths } from 'date-fns';
import { map, tap } from 'rxjs/operators';
import { Channel, IChannelMetadata } from '@shared/models/channel.model';
import { MatDialog } from '@angular/material';
import { ProjectChannelDialogComponent } from '@jala-modules/dashboards-project/pages/project-channel/project-channel-dialog/project-channel-dialog.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { finalResultChart, mutateArrayChart, sortArrayChart } from '@shared/function/chartFunction';

@Component( {
	selector: 'app-project-channel',
	templateUrl: './project-channel.component.html',
	styleUrls: [ './project-channel.component.scss' ]
} )
export class ProjectChannelComponent implements OnInit, OnDestroy {

	constructor(
		private http: DashboardReportService,
		private http2: DashboardProjectService,
		private activeRoute: ActivatedRoute,
		private dialog: MatDialog
	) {
		this.projectId = Number( this.activeRoute.parent.snapshot.paramMap.get( 'id' ) );
		this.dateInputForm.setValue( [ subMonths( this.dateNow, 3 ), this.dateNow ], { emitEvent: false } );
		this.searchInputForm.valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( ( value: string ) => {
				if ( value === '' ) {
					this.dataViewRes = this.dataView;
				} else {
					this.dataViewRes = this.dataView.filter( value1 => value1.data.name.toLowerCase().includes( value.toLowerCase() ) );
				}
			} );
		this.dateInputForm.valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( value => {
				if ( value ) {
					const formatDate = {
						startDate: format( value[0], 'yyyy-MM-dd' ),
						endDate: format( value[1], 'yyyy-MM-dd' )
					};
					this.fetchAll( formatDate );
				} else {
					this.fetchAll();
				}
			} );
	}

	projectId: number;
	dataChart: Observable<any>;
	dataView: Channel[];
	dataViewRes: Channel[];
	dateNow = new Date();
	tabsView = 2;
	metadataChannel: IChannelMetadata;

	dateInputForm = new FormControl( null );
	searchInputForm = new FormControl( null );

	fetchAll( date?: { startDate: string, endDate: string } ) {
		const paramChart = { projectId: this.projectId };
		if ( date ) {
			const dateChart = { startDate: date.startDate, endDate: date.endDate };
			// paramChart[ 'startDate' ] = date.startDate;
			// paramChart[ 'endDate' ] = date.endDate;
			paramChart['date'] = dateChart;
		}
		this.dataChart = this.http.getLeads( 'group.channel,status.category', paramChart )
			.pipe(
				map( value => this.updateChart( value ) )
			);

		let obsGet: Observable<any> = this.http2.getAllChannelsByProject( this.projectId, undefined, true );
		if ( date ) {
			const paramGet = { since: date.startDate, until: date.endDate };
			obsGet = this.http2.getAllChannelsByProject( this.projectId, paramGet, true );
		}
		obsGet
			/*.pipe(
				switchMap( value => {
					return this.http2.getAllChannelsSummary( true )
						.pipe(
							map( value1 => {
								value1.forEach( value2 => {
									const index = value.findIndex( value3 => value3.data.id === value2.id );
									if ( index !== -1 ) {
										value[index].summary = value2;
									}
								} );
								return value;
							} )
						);
				} )
			)*/
			.subscribe( value => {
				this.dataView = value;
				this.dataViewRes = value;
			} );

		this.http2.getChannelMetadata()
			.pipe( tap( value => this.metadataChannel = value ) )
			.subscribe();
	}

	/*dateInput( value: Date[] ) {
		if ( Array.isArray( value ) && value.length !== 0 ) {
			const date = value.map( value1 => format( value1, 'yyyy-MM-dd' ) );
			this.dataChart = this.http.getPerformance( 'group.channel,status.category', {
				projectId: this.projectId,
				date: { startDate: date[ 0 ], endDate: date[ 1 ] }
			} )
				.pipe(
					map( value1 => this.updateChart( value1 ) )
				);
		} else {
			this.dataChart = this.http.getPerformance( 'group.channel,status.category', { projectId: this.projectId } )
				.pipe(
					map( value1 => this.updateChart( value1 ) )
				);
		}
	}*/

	updateChart( data ) {
		if ( Array.isArray( data ) && data.length !== 0 ) {
			const sort = sortArrayChart( data );
			return finalResultChart( mutateArrayChart( sort ) );
		}
	}

	openDialog( value: Channel ): void {
		const dialogRef = this.dialog.open( ProjectChannelDialogComponent, {
			data: { value, metadata: this.metadataChannel }
		} );

		dialogRef.afterClosed().subscribe( result => {
			if ( result === 'change' ) {
				this.fetchAll();
			}
		} );
	}

	ngOnInit() {
		const formatDate = {
			startDate: format( subMonths( this.dateNow, 3 ), 'yyyy-MM-dd' ),
			endDate: format( this.dateNow, 'yyyy-MM-dd' )
		};
		this.fetchAll( formatDate );
	}

	ngOnDestroy(): void {
	}

}
