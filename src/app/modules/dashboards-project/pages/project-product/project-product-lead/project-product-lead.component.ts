import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { CustomStateService } from '@core/services/custom-state/custom-state.service';
import { ProjectLeadDownloadDialogComponent } from '@jala-modules/dashboards-project/pages/project-lead/project-lead-download-dialog/project-lead-download-dialog.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { Lead } from '@shared/models/lead.model';
import { addDays, isWithinInterval, parseISO, startOfDay, subMonths } from 'date-fns';

@Component( {
	selector: 'app-project-product-lead',
	templateUrl: './project-product-lead.component.html',
	styleUrls: [ './project-product-lead.component.scss' ]
} )
export class ProjectProductLeadComponent implements OnInit, OnDestroy {

	// TODO:	-Untuk filter bisa menggunakan perentara service
	// 			-Dan Untuk value dari filter lebih baik fetch dari API

	dateNow = new Date();
	public dataAllLeads: Lead[];
	public dataForFilter: {
		getCampaign?: IdAndName[];
		getChannel: IdAndName[];
		getSalesOfficer: IdAndName[];
		getSalesTeam?: IdAndName[];
		getStatus?: IdAndName[];
		getCategory?: IdAndName[];
		getMedia?: IdAndName[];
		getInterests?: IdAndName[];
	};
	//////////// CHART /////////////


	//////// IMPORTANT PART OF THIS PAGE AND BELOW ///////////////
	productId: number;
	////////////////////////////////////////////////////

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
		//////// IMPORTANT PART OF THIS PAGE AND BELOW ///////////////
		this.productId = Number( this.activatedRoute.snapshot.paramMap.get( 'id' ) );
		////////////////////////////////////////////////////
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
					if ( objKeys === 'getInterests' ) {
						allResult = allResult.filter( value => {
							const index = value.getInterests.findIndex( value1 => value1.id === result[objKeys] );
							return index !== -1;
						} );
					} else {
						allResult = allResult.filter( val => val[objKeys].id === result[objKeys] );
					}
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
						if ( value1.data.name ) {
							return value1.data.name.toLowerCase().includes( value.toLowerCase() );
						}
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
		getInterests: []
	} );

	get getDate() {
		return this.formFilter.get( 'getDate' );
	}


	setForFilter( value: Lead[] ) {
		// const method = [ 'getCampaign', 'getChannel', 'getSalesOfficer', 'getSalesTeam', 'getStatus', 'getCategory', 'getMedia', 'getInterests' ];
		const method = [ 'getCampaign', 'getChannel', 'getSalesOfficer', 'getSalesTeam', 'getStatus', 'getCategory', 'getMedia' ];
		return value.reduce( ( acc, cur ) => {
			method.forEach( value1 => {
				/*if ( value1 === 'getInterests' ) {
					cur[ value1 ].forEach( value2 => {
						const indexInt = acc[ value1 ].findIndex( val => val.id === value2.id );
						if ( indexInt === -1 ) {
							acc[ value1 ].push( value2 );
						}
					} );
					return;
				} else {
					const index = acc[ value1 ].findIndex( val => val.id === cur[ value1 ].id );
					if ( index === -1 ) {
						// acc.push( get );
						acc[ value1 ].push( cur[ value1 ] );
					}
				}*/
				const index = acc[value1].findIndex( val => val.id === cur[value1].id );
				if ( index === -1 ) {
					acc[value1].push( cur[value1] );
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
			getMedia: []
		} );
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
		const dialogRef = this.dialog.open( ProjectLeadDownloadDialogComponent, {
			data: { lead: this.initialDataForTable, disableJourney: true }
		} );
		dialogRef.afterClosed()
			.pipe( untilDestroyed( this ) )
			.subscribe();
	}

	ngOnInit() {
		this.http.getAllLeads()
			.pipe(
				untilDestroyed( this ),
				//////// IMPORTANT PART OF THIS PAGE ///////////////
				/*map( value => {
					return value.filter( value1 => value1.data.interest.productId === this.productId );
				} ),*/
				////////////////////////////////////////////////////
				tap( value => {
					this.dataAllLeads = value;
					// this.dataForTable = value;
					this.initialDataForTable = value;
					this.dataForFilter = this.setForFilter( value );
					this.dataGroup1 = this.setForFilter2( value );
					this.dataGroup2 = this.setForFilter3( value );
					this.getDate.patchValue( [ subMonths( this.dateNow, 3 ), this.dateNow ] );
				} ),
				switchMap( () => this.http.getAllProduct() ),
				map( value => this.dataForFilter.getInterests = value.map( value1 => {
					return { id: value1.id, name: value1.name };
				} ) ),
				switchMap( () => this.filter.getFilter.pipe( untilDestroyed( this ) ) )
			)
			.subscribe( value => {
				if ( value ) {
					if ( Array.isArray( this.dataAllLeads ) && this.dataAllLeads.length ) {
						this.formFilter.patchValue( value );
					}
				}
			} );
	}

	ngOnDestroy(): void {
		this.filter.setFilter = null;
	}

}

interface IdAndName {
	id: number;
	name: string;
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
