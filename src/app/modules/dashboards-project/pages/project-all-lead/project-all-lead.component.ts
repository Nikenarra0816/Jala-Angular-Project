import { Component, OnDestroy, OnInit } from '@angular/core';
import { Lead, ParamsLeadDownload } from '@shared/models/lead.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { CustomStateService } from '@core/services/custom-state/custom-state.service';
import { MatDialog } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import {
	addDays, addWeeks,
	eachDayOfInterval, eachMonthOfInterval,
	eachWeekOfInterval, eachYearOfInterval,
	format,
	isAfter, isSameDay, isSameMonth, isSameWeek, isSameYear,
	isWithinInterval, parse,
	parseISO,
	startOfDay, startOfWeek,
	subMonths
} from 'date-fns';
import { ProjectLeadDownloadDialogComponent } from '@jala-modules/dashboards-project/pages/project-lead/project-lead-download-dialog/project-lead-download-dialog.component';
import { darkenColor, lightenColor, shadowColored } from '@shared/function/colorFunction';
import { forkJoin } from 'rxjs';
import { IProjectMetadata } from '@shared/models/project.model';

@Component( {
	selector: 'app-project-all-lead',
	templateUrl: './project-all-lead.component.html',
	styleUrls: [ './project-all-lead.component.scss' ]
} )
export class ProjectAllLeadComponent implements OnInit, OnDestroy {

	// TODO:	-Untuk filter bisa menggunakan perentara service
	// 			-Dan Untuk value dari filter lebih baik fetch dari API

	dateNow = new Date();
	public dataAllLeads: Lead[];
	public dataForFilter;
	//////////// CHART /////////////
	public dataForChart1;
	public dataForChartLine;
	public chartLineOption: 'day' | 'week' | 'month' | 'year' = 'week';
	public projectMetadata: IProjectMetadata;

	///////// FILTER GROUP //////////
	dataGroup1: ICampaignAndChannel[];
	dataGroup2: ITeamAndOfficer[];
	// dataGroup3: ICategoryAndStatus[];

	///////////////////////////////////

	///////////////////////////////
	searchInputForm = new FormControl( null );

	public dataForTable: Lead[];
	public initialDataForTable: Lead[];

	constructor(
		private activatedRoute: ActivatedRoute,
		private fb: FormBuilder,
		private http: DashboardProjectService,
		private filter: CustomStateService,
		private dialog: MatDialog
	) {
		this.formFilter.valueChanges
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

				/* FOR SEQUENCE CAMPAIGN PENJALUKE YAYAN JANCOK */
				if ( result.hasOwnProperty( 'getCampaign' ) ) {
					const data = this.dataGroup1.find( value => value.id === result.getCampaign );
					this.dataForFilter.getChannel = data.channel.map( value => {
						return { id: value.id, name: value.channel };
					} );
					const index = this.dataForFilter.getChannel.findIndex( value => value.id === this.formFilter.get( 'getChannel' ).value );
					if ( index === -1 ) {
						this.formFilter.get( 'getChannel' ).setValue( undefined, { emitEvent: false } );
						delete result['getChannel'];
					}
				} else {
					this.dataForFilter.getChannel = this.dataGroup1.reduce( ( acc, cur ) => {
						const x = cur.channel.map( value => {
							return { id: value.id, name: value.channel };
						} );
						acc.push( ...x );
						return acc;
					}, [] );
				}

				/* FOR SEQUENCE TEAM PENJALUKE YAYAN JANCOK */
				if ( result.hasOwnProperty( 'getSalesTeam' ) ) {
					const data = this.dataGroup2.find( value => value.id === result.getSalesTeam );
					this.dataForFilter.getSalesOfficer = data.officer.map( value => {
						return { id: value.id, name: value.officer };
					} );
					const index = this.dataForFilter.getSalesOfficer.findIndex( value => value.id === this.formFilter.get( 'getSalesOfficer' ).value );
					if ( index === -1 ) {
						this.formFilter.get( 'getSalesOfficer' ).reset( undefined, { emitEvent: false } );
						delete result['getSalesOfficer'];
					}
				} else {
					this.dataForFilter.getSalesOfficer = this.dataGroup2.reduce( ( acc, cur ) => {
						const x = cur.officer.map( value => {
							return { id: value.id, name: value.officer };
						} );
						acc.push( ...x );
						return acc;
					}, [] );
				}

				const arrOfKey = Object.keys( result );
				/* IKI DATA TABLE */
				let allResult: Lead[] = this.dataAllLeads;
				arrOfKey.forEach( objKeys => {
					allResult = allResult.filter( val => {
						// SET FILTER UNTUK STATUS MENGGUNAKAN NAME DARIPADA MENGGUNAKAN ID
						// Per tgl 22/05/2020
						if ( objKeys === 'getStatus' ) {
							return val.getStatus.name === result[objKeys];
						}
						return val[objKeys].id === result[objKeys];
					} );
				} );
				const date = this.getDate.value;
				if ( date ) {
					allResult = allResult.filter( value => {
						const parseDate = parseISO( value.data.createdAt );
						return isWithinInterval(
							parseDate,
							{
								start: startOfDay( date[0] ),
								end: addDays( startOfDay( date[1] ), 1 )
							} );
					} );
				}
				this.dataForTable = allResult;
				this.dataForChart1 = this.forChart1( allResult );
				this.dataForChartLine = this.forChartLine( allResult, this.chartLineOption );
				this.initialDataForTable = allResult;
				this.searchInputForm.reset( '' );
			} );

		this.searchInputForm.valueChanges
			.pipe( untilDestroyed( this ),
				debounceTime( 500 ) )
			.subscribe( ( value: string ) => {
				if ( value === '' ) {
					this.dataForTable = this.initialDataForTable;
				} else {
					this.dataForTable = this.initialDataForTable.filter( value1 => {
						let isTrue = false;

						if ( value1.data.name ) {
							isTrue = value1.data.name.toLowerCase().includes( value.toLowerCase() );
						}

						if ( value1.data.phone ) {
							isTrue = isTrue === true ? true : value1.data.phone.includes( value );
						}
						return isTrue;
					} );
				}
			} );
	}

	public formFilter = this.fb.group( {
		getDate: [],
		getCampaign: [],
		getChannel: [],
		getSalesOfficer: [],
		getSalesTeam: [],
		getStatus: [],
		getCategory: [],
		getMedia: [],
	} );

	get getDate() {
		return this.formFilter.get( 'getDate' );
	}

	chartLineOptionChange() {
		this.dataForChartLine = this.forChartLine( this.dataForTable, this.chartLineOption );
	}

	forChartLine( data: Lead[], dateOpt: 'day' | 'week' | 'month' | 'year' ) {
		// check if data not empty
		if ( Array.isArray( data ) && data.length ) {
			const objChart = {
				data: [],
				label: []
			};
			objChart.label = this.labelChartLine( dateOpt, data );
			objChart.label.forEach( ( value, index ) => {
				data.forEach( value1 => {

					const isSameDateOpt = this.isSameDateForChartLine( dateOpt, parseISO( value1.data.createdAt ), value );

					if ( isSameDateOpt ) {
						const labelIndex = objChart.data.findIndex( val => val.label === value1.getCategory.name );
						if ( labelIndex !== -1 ) {
							objChart.data[labelIndex].data[index] += 1;
						} else {
							const color = this.projectMetadata.categories.find( value2 => value2.name === value1.getCategory.name ).color;
							const objChartDataCategory = {
								data: Array.from( Array( objChart.label.length ), () => 0 ),
								label: value1.getCategory.name,
								backgroundColor: shadowColored( darkenColor( color, 0.4 ), 0.2 ),
								borderColor: color,
								/*hoverBackgroundColor: lightenColor( color, 0.7 ),
								hoverBorderColor: darkenColor( color, 0.5 ),*/
								pointBackgroundColor: color,
								pointBorderColor: color,
							};
							objChartDataCategory.data[index] += 1;
							objChart.data.push( objChartDataCategory );
						}
					}
				} );
			} );
			return objChart;
		} else {
			return 'empty';
		}
	}

	labelChartLine( opt: 'day' | 'week' | 'month' | 'year', data: Lead[] ) {
		let date: Array<Date> | null = this.getDate.value;
		if ( !date ) {
			const x = data.sort( ( a, b ) => {
				const dateCompare = isAfter( parseISO( a.data.createdAt ), parseISO( b.data.createdAt ) );
				if ( !dateCompare ) {
					return -1;
				}
				if ( dateCompare ) {
					return 1;
				}
				return 0;
			} );
			date = [ parseISO( x[0].data.createdAt ), parseISO( x[x.length - 1].data.createdAt ) ];
		}
		switch ( opt ) {
			case 'day':
				return eachDayOfInterval( {
					start: date[0],
					end: date[1]
				} ).map( value => format( value, 'dd MMM yyyy' ) );
			case 'week':
				return eachWeekOfInterval( {
					start: date[0],
					end: addWeeks( startOfWeek( date[1], { weekStartsOn: 1 } ), 1 )
				}, { weekStartsOn: 1 } ).map( value => format( value, 'dd MMM yyyy' ) );
			case 'month':
				return eachMonthOfInterval( {
					start: date[0],
					end: date[1]
				} ).map( value => format( value, 'MMM yyyy' ) );
			case 'year':
				return eachYearOfInterval( {
					start: date[0],
					end: date[1]
				} ).map( value => format( value, 'yyyy' ) );
		}
	}

	isSameDateForChartLine( opt: 'day' | 'week' | 'month' | 'year', dateLeft, dateRight ) {
		switch ( opt ) {
			case 'day':
				return isSameDay( dateLeft, parse( dateRight, 'dd MMM yyyy', new Date() ) );
			case 'week':
				return isSameWeek( dateLeft, parse( dateRight, 'dd MMM yyyy', new Date() ), { weekStartsOn: 1 } );
			case 'month':
				return isSameMonth( dateLeft, parse( dateRight, 'MMM yyyy', new Date() ) );
			case 'year':
				return isSameYear( dateLeft, parse( dateRight, 'yyyy', new Date() ) );
		}
	}

	forChart1( data: Lead[] ) {
		// check if data not empty
		if ( Array.isArray( data ) && data.length ) {
			const objChart = {
				data: [],
				label: [ 'Leads' ]
			};
			for ( const value of data ) {
				const labelIndex = objChart.data.findIndex( val => val.label === value.getCategory.name );
				if ( labelIndex !== -1 ) {
					objChart.data[labelIndex].data[0] += 1;
				} else {
					const color = this.projectMetadata.categories.find( value2 => value2.name === value.getCategory.name ).color;
					objChart.data.push( {
						data: [ 1 ],
						label: value.getCategory.name,
						backgroundColor: color,
						borderColor: color,
						hoverBackgroundColor: lightenColor( color, 0.7 ),
						hoverBorderColor: color,
						pointBackgroundColor: color,
						pointBorderColor: color,
					} );
				}
			}
			return objChart;
		} else {
			return 'empty';
		}
	}


	setForFilter( value: Lead[] ) {
		const method = [ 'getCampaign', 'getChannel', 'getSalesOfficer', 'getSalesTeam', 'getStatus', 'getCategory', 'getMedia' ];
		const obj = value.reduce( ( acc, cur ) => {
			method.forEach( value1 => {
				// SET FILTER UNTUK STATUS MENGGUNAKAN NAME DARIPADA MENGGUNAKAN ID
				// Per tgl 22/05/2020
				if ( value1 === 'getStatus' ) {
					const index = acc.getStatus.findIndex( val => val.name === cur[value1].name );
					if ( index === -1 ) {
						acc[value1].push( {
							id: cur[value1].name,
							name: cur[value1].name,
						} );
					}
					/////////////
				} else {
					const index = acc[value1].findIndex( val => val.id === cur[value1].id );
					if ( index === -1 ) {
						// acc.push( get );
						acc[value1].push( cur[value1] );
					}
				}
			} );
			return acc;
		}, {
			getCampaign: [],
			getChannel: [],
			getSalesOfficer: [],
			getSalesTeam: [],
			getStatus: [],
			getCategory: [],
			getMedia: [],
		} );
		return obj;
	}

	setForFilter2( value: Lead[] ): ICampaignAndChannel[] {
		return value.reduce<ICampaignAndChannel[]>( ( acc, cur ) => {
			const campaignIndex = acc.findIndex( value1 => value1.id === cur.getCampaign.id );
			if ( campaignIndex !== -1 ) {
				const channelIndex = acc[campaignIndex].channel.findIndex( value1 => value1.id === cur.getChannel.id );
				if ( channelIndex === -1 ) {
					acc[campaignIndex].channel.push( { channel: cur.getChannel.name, id: cur.getChannel.id } );
				}
			} else {
				const obj: ICampaignAndChannel = {
					id: cur.getCampaign.id,
					campaign: cur.getCampaign.name,
					channel: [ { channel: cur.getChannel.name, id: cur.getChannel.id } ]
				};
				acc.push( obj );
			}
			return acc;
		}, [] );
	}

	setForFilter3( value: Lead[] ): ITeamAndOfficer[] {
		return value.reduce<ITeamAndOfficer[]>( ( acc, cur ) => {
			const teamIndex = acc.findIndex( value1 => value1.id === cur.getSalesTeam.id );
			if ( teamIndex !== -1 ) {
				const channelIndex = acc[teamIndex].officer.findIndex( value1 => value1.id === cur.getSalesOfficer.id );
				if ( channelIndex === -1 ) {
					acc[teamIndex].officer.push( { officer: cur.getSalesOfficer.name, id: cur.getSalesOfficer.id } );
				}
			} else {
				const obj: ITeamAndOfficer = {
					id: cur.getSalesTeam.id,
					team: cur.getSalesTeam.name,
					officer: [ { officer: cur.getSalesOfficer.name, id: cur.getSalesOfficer.id } ]
				};
				acc.push( obj );
			}
			return acc;
		}, [] );
	}

	openDownload() {
		const config: ParamsLeadDownload = {
			campaign_id: this.formFilter.value.getCampaign,
			channel_id: this.formFilter.value.getChannel,
			owner_id: this.formFilter.value.getSalesOfficer,
			team_id: this.formFilter.value.getSalesTeam,
			status: this.formFilter.value.getStatus,
			category_id: this.formFilter.value.getCategory,
			media_type: this.formFilter.value.getMedia
		};
		if ( this.getDate.value ) {
			config.start = format( this.getDate.value[0], 'yyyy-MM-dd' );
			config.end = format( addDays( this.getDate.value[1], 1 ), 'yyyy-MM-dd' );
		}
		Object.keys( config ).forEach( ( key ) => {
			return ( ( config[key] === null ) || ( config[key] === undefined ) ) && delete config[key];
		} );
		const dialogRef = this.dialog.open( ProjectLeadDownloadDialogComponent, {
			data: { lead: this.initialDataForTable, config }
		} );
		dialogRef.afterClosed()
			.pipe( untilDestroyed( this ) )
			.subscribe();
	}

	/*
		setForFilter4( value: Lead[] ): ICategoryAndStatus[] {
			return value.reduce<ICategoryAndStatus[]>( ( acc, cur ) => {
				const teamIndex = acc.findIndex( value1 => value1.id === cur.getCategory.id );
				if ( teamIndex !== -1 ) {
					const channelIndex = acc[ teamIndex ].status.findIndex( value1 => value1.id === cur.getStatusSort.id );
					if ( channelIndex === -1 ) {
						acc[ teamIndex ].status.push( { status: cur.getStatusSort.name, id: cur.getStatusSort.id } );
					}
				} else {
					const obj: ICategoryAndStatus = {
						id: cur.getCategory.id,
						category: cur.getCategory.name,
						status: [ { status: cur.getStatusSort.name, id: cur.getStatusSort.id } ]
					};
					acc.push( obj );
				}
				return acc;
			}, [] );
		}
	*/

	ngOnInit() {
		const leadDanBleketekan = this.http.getAllLeads()
			.pipe(
				untilDestroyed( this ),
				tap( value => {
					this.dataAllLeads = value;
					// this.dataForTable = value;
					this.initialDataForTable = value;
					this.dataForFilter = this.setForFilter( value );
					this.dataGroup1 = this.setForFilter2( value );
					this.dataGroup2 = this.setForFilter3( value );
					this.getDate.patchValue( [ subMonths( this.dateNow, 3 ), this.dateNow ] );
				} ),
				switchMap( () => this.filter.getFilter.pipe( untilDestroyed( this ) ) ),
				tap( value => {
					if ( value ) {
						if ( Array.isArray( this.dataAllLeads ) && this.dataAllLeads.length ) {
							this.formFilter.patchValue( value );
						}
					}
				} )
			);
		forkJoin(
			this.http.getProjectMetadata().pipe( tap( val => this.projectMetadata = val ) ),
			leadDanBleketekan,
		).subscribe();
	}

	ngOnDestroy(): void {
		this.filter.setFilter = null;
	}

}


interface ICampaignAndChannel {
	campaign: string;
	id: number;
	channel: [ { channel: string; id: number } ];
}

interface ITeamAndOfficer {
	team: string;
	id: number;
	officer: [ { officer: string; id: number } ];
}

interface ICategoryAndStatus {
	category: string;
	id: number;
	status: [ { status: string; id: number } ];
}
