import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	DashboardReportService,
	IReportLeads,
	ISummaryOverview
} from '@core/services/dashboard-report/dashboard-report.service';
import { format, formatDistanceStrict, parseISO, subMonths } from 'date-fns';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { finalResultChart, mutateArrayChart } from '@shared/function/chartFunction';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { lightenColor } from '@shared/function/colorFunction';

@Component( {
	selector: 'app-home-dashboard',
	templateUrl: './home-dashboard.component.html',
	styleUrls: [ './home-dashboard.component.scss' ],
	animations: [
		trigger(
			'expanded',
			[
				state(
					'false',
					style( { width: '0px', display: 'none', padding: 'unset' } ),
				),
				state(
					'true',
					style( { width: '*', display: 'flex', padding: '0 2rem' } ),
				),
				transition( 'false => true', animate( '.3s ease',
					keyframes( [
						style( { display: 'flex', offset: 0 } ),
						style( { width: '0px', padding: '0 0rem', opacity: 0, offset: 0 } ),
						style( { width: '*', padding: '0 2rem', opacity: 1, offset: 1 } ),
					] ) ) ),
				transition( 'true => false', animate( '.3s ease',
					style( { width: '0px', padding: '0 0rem', opacity: 0 } ) ) ),
			]
		)
	]
} )
export class HomeDashboardComponent implements OnInit, OnDestroy {

	constructor( private http: DashboardReportService, private http2: DashboardProjectService ) {
		this.date.setValue( [ subMonths( this.dateNow, 3 ), this.dateNow ], { emitEvent: false } );
		this.subtitleDate = formatDistanceStrict( this.date.value[0], this.date.value[1] );
		this.project.valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( value => {
				if ( value === -1 ) {
					this.fetchAll();
				} else {
					this.fetchAll( value );
				}
			} );
		this.date.valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( value => {
				this.subtitleDate = formatDistanceStrict( value[0], value[1] );
				if ( this.project.value === -1 ) {
					this.fetchAll();
				} else {
					this.fetchAll( this.project.value );
				}
			} );
	}

	filterShow = false;
	dateNow = new Date();
	date = new FormControl();
	subtitleDate;
	project = new FormControl();
	dataProject = [];
	cardData: Observable<ISummaryOverview>;

	chart1Data: Observable<any>;
	chart2Data: Observable<any>;
	chart3Data: Observable<any>;
	chart4Data: Observable<any>;

	chart2Option: 'day' | 'week' | 'month' | 'year' = 'week';
	chart4Option: 'group.channel,status.category' | 'group.campaign,status.category' |
		'owner.user,status.category' | 'owner.team,status.category' = 'group.channel,status.category';


	///////// BAR CHART 1 //////////

	chart1Update( data: IReportLeads[] ) {
		if ( Array.isArray( data ) && data.length !== 0 ) {
			const sort = data.sort( ( a, b ) => b.value - a.value );
			const arrColor = sort.map( value => value.color );
			const obj = {
				data: [ {
					data: sort.map( value => value.value ),
					label: '',
					backgroundColor: arrColor,
					borderColor: arrColor,
					hoverBackgroundColor: arrColor.map( value => lightenColor( value, 0.7 ) ),
					hoverBorderColor: arrColor,
				} ],
				label: sort.map( value => value.alias ),
			};
			return obj;
		} else {
			return 'empty';
		}
	}

	//////////////////////////////////
	///////// LINE CHART 2 //////////

	chart2Change( value ) {
		const startDate = format( this.date.value[0], 'yyyy-MM-dd' );
		const endDate = format( this.date.value[1], 'yyyy-MM-dd' );
		const projectId = this.project.value !== -1 ? this.project.value : undefined;
		this.chart2Data = this.http.getLeads( 'status.category', {
			groupBy: value,
			date: { startDate, endDate },
			projectId
		} )
			.pipe( map( value1 => this.chart2Update( value1 ) ) );
	}

	chart2Update( data: IReportLeads[] ) {
		if ( Array.isArray( data ) && data.length !== 0 ) {
			const label = data.map( value => format( parseISO( value.key ), 'dd MMM yyyy' ) );
			const allObj = [];
			const isEmpty = data.reduce( ( acc, cur ) => acc + cur.value, 0 );
			if ( isEmpty === 0 ) {
				return 'empty';
			}
			data.forEach( element => {
				for ( const element2 of element.buckets ) {
					const indexAllObj = allObj.findIndex(
						value => value.label === element2.alias
					);
					if ( indexAllObj === -1 ) {
						const objectModel = {
							label: element2.alias,
							data: Array.from( Array( label.length ), () => 0 ),
							backgroundColor: element2.color,
							borderColor: element2.color,
							hoverBackgroundColor: lightenColor( element2.color, 0.7 ),
							hoverBorderColor: element2.color,
							pointBackgroundColor: element2.color,
							pointBorderColor: element2.color,
						};
						allObj.push( objectModel );
					}
				}
			} );
			data.forEach( element => {
				const index = label.findIndex( value => value === format( parseISO( element.key ), 'dd MMM yyyy' ) );
				if ( element.value !== 0 ) {
					for ( const element2 of element.buckets ) {
						const indexAllObj = allObj.findIndex(
							value => value.label === element2.alias
						);
						/*if (indexAllObj === -1) {
							const objectModel = {
								label: element2.alias,
								data: Array.from(Array(label.length - 1), () => 0)
							};
							objectModel.data[index] = element2.value;
							allObj.push(objectModel);
						} else {*/
						allObj[indexAllObj].data[index] = element2.value;
						// }
					}
				}
			} );
			return { data: allObj, label };
		} else {
			return 'empty';
		}
	}

	//////////////////////////////////
	///////// ONLINE OFFLINE CHART 3//////////

	chart3Update( data: IReportLeads[] ) {
		if ( Array.isArray( data ) && data.length !== 0 ) {
			const obj = {
				data: [],
				label: [ 'Leads' ]
			};
			obj.data = data.map( value => {
				return {
					data: [ value.value ],
					label: value.key,
					backgroundColor: value.color,
					borderColor: value.color,
					hoverBackgroundColor: lightenColor( value.color, 0.7 ),
					hoverBorderColor: value.color,
				};
			} );
			return obj;
		} else {
			return 'empty';
		}
	}

	//////////////////////////////////
	///////// PERFORMANCE CHART 4 //////////
	chart4Update2( data ) {
		if ( Array.isArray( data ) && data.length !== 0 ) {
			const best5 = data.sort( ( a, b ) => b.value - a.value ).slice( 0, 5 );
			const obj = {
				data: [ {
					data: best5.map( value => value.value ),
					label: 'Point',
				} ],
				label: best5.map( value => value.alias ),
			};
			return obj;
		} else {
			return 'empty';
		}
	}

	chart4Update( data ) {
		if ( Array.isArray( data ) && data.length !== 0 ) {
			const best5 = data.sort( ( a, b ) => b.value - a.value ).slice( 0, 5 );

			// const label = best5.map( value => value.alias );
			/*const allObj = [];
			best5.forEach( element => {
				const index = best5.findIndex( value => value.key === element.key );

				for ( const element2 of element.buckets ) {
					const indexAllObj = allObj.findIndex( value => value.label === element2.alias );
					if ( indexAllObj === -1 ) {
						const objectModel = {
							label: element2.alias,
							data: Array.from( Array( best5.length - 1 ), () => 0 )
						};
						objectModel.data[ index ] = element2.value;
						allObj.push( objectModel );
					} else {
						allObj[ indexAllObj ].data[ index ] = element2.value;
					}
				}
			} );
			return { data: allObj, label: best5.map( value => value.alias ) };*/
			return finalResultChart( mutateArrayChart( best5 ) );
		} else {
			return 'empty';
		}
		// return data;
	}

	chart4Change( value ) {
		const startDate = format( this.date.value[0], 'yyyy-MM-dd' );
		const endDate = format( this.date.value[1], 'yyyy-MM-dd' );
		const projectId = this.project.value !== -1 ? this.project.value : undefined;
		if ( value === 'owner.user' || value === 'owner.team' ) {
			this.chart4Data = this.http.getPerformance( value, { projectId, date: { startDate, endDate } } )
				.pipe( map( val => this.chart4Update2( val ) ) );
			return;
		}
		this.chart4Data = this.http.getLeads( value, { projectId, date: { startDate, endDate } } )
			.pipe( map( val => this.chart4Update( val ) ) );
	}

	fetchAll( projectId?: number ) {
		const startDate = format( this.date.value[0], 'yyyy-MM-dd' );
		const endDate = format( this.date.value[1], 'yyyy-MM-dd' );
		this.chart1Data = this.http.getLeads( 'status.category', { date: { startDate, endDate }, projectId } )
			.pipe( map( val => this.chart1Update( val ) ) );
		this.chart2Data = this.http.getLeads( 'status.category', {
			groupBy: this.chart2Option,
			date: { startDate, endDate },
			projectId
		} )
			.pipe( map( value => this.chart2Update( value ) ) );
		this.chart3Data = this.http.getLeads( 'group.mediaType', { date: { startDate, endDate }, projectId } )
			.pipe( map( val => this.chart3Update( val ) ) );
		this.chart4Change( this.chart4Option );
		this.cardData = this.http.getSummaryOverview( { projectId, date: { startDate, endDate } } )
			.pipe( map( value => value[0] ) );
	}

	//////////////////////////////////

	ngOnInit() {
		this.http2.getAllProjects()
			.subscribe( value => {
				this.dataProject = [ { data: { name: 'All Project', id: -1 } }, ...value ];
				this.project.setValue( -1, { emitEvent: false } );
			} );
		this.fetchAll();
		/*this.chart2Data = this.http.getLeads( 'status.category', { groupBy: this.chart2Option } )
			.pipe( map( value => this.chart2Update( value ) ) );
		this.chart3Data = this.http.getLeads( 'group.mediaType' )
			.pipe( map( val => this.chart3Update( val ) ) );
		this.chart4Data = this.http.getPerformance( this.chart4Option )
			.pipe( map( val => this.chart4Update( val ) ) );*/
	}

	ngOnDestroy(): void {
	}
}
