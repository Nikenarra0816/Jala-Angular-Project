import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CdkStepper } from '@angular/cdk/stepper';
import { DashboardSalesTeamService } from '@core/services/dashboard-sales-team/dashboard-sales-team.service';
import { DashboardSalesOfficerService } from '@core/services/dashboard-sales-officer/dashboard-sales-officer.service';
import { ISalesTeamMembersEntity, SalesTeam } from '@shared/models/sales-team.model';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { Channel } from '@shared/models/channel.model';
import { SalesOfficer } from '@shared/models/sales-officer.model';
import { ILeadsMetadata, ILeadsMetadataStatusesEntity, Lead } from '@shared/models/lead.model';
import { addDays, isWithinInterval, parseISO, startOfDay } from 'date-fns';
import { tap } from 'rxjs/operators';
import { LeadsStoreService } from '@core/store/leads/leads-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component( {
	selector: 'app-team-sales-officer-migrate',
	templateUrl: './team-sales-officer-migrate.component.html',
	styleUrls: [ './team-sales-officer-migrate.component.scss' ]
} )
export class TeamSalesOfficerMigrateComponent implements OnInit, OnDestroy {

	@ViewChild( 'stepper', { static: false } ) stepper: CdkStepper;


	constructor(
		private fb: FormBuilder,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService,
		private storeLead: LeadsStoreService,
		private http: DashboardSalesOfficerService,
		private http2: DashboardSalesTeamService,
		private http3: DashboardProjectService,
	) {
		/// GROUP 1
		this.formGroup1.get( 'teams' ).valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( value => {
				this.formGroup1.get( 'officers' ).reset( undefined, { emitEvent: false } );
				const index = this.dataTeams.findIndex( value1 => value1.data.id === value );
				this.dataOfficers = this.dataTeams[index].getMember.filter( officer => officer.isActive );
			} );
		this.formGroup1.get( 'officers' ).valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( value => {
				const find = this.dataOfficers.find( value1 => value1.user.id === value );
				const isExist = this.selectedOfficers.findIndex( value1 => value1.user.id === find.user.id );
				if ( isExist === -1 ) {
					this.selectedOfficers.push( find );
				}
			} );
		/// GROUP 2
		this.formGroup2.get( 'category' ).valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( value => {
				this.formGroup2.get( 'status' ).reset();
				this.dataStatus = value.reduce( ( acc, cur ) => {
					return [ ...acc, ...cur.statuses ];
				}, [] );
			} );
	}

	dataOfficers: ISalesTeamMembersEntity[];
	dataTeams: SalesTeam[];
	selectedOfficers: ISalesTeamMembersEntity[] = [];

	formGroup1 = this.fb.group( {
		teams: [ '' ],
		officers: [ '' ],
	} );


	dataChannel: Channel[];
	dataOfficers2: SalesOfficer[];
	dataCategory: ILeadsMetadata;
	dataStatus: ILeadsMetadataStatusesEntity[];
	dateNow = new Date();
	dataLeads: Lead[];
	dataFilteredLeads: Lead[];
	checkedLeads: string[];

	formGroup2 = this.fb.group( {
		date: [ '' ],
		channels: [ '' ],
		category: [ '' ],
		status: [ '' ],
		officers: [ '' ],
	} );

	deleteProject( val: number ) {
		this.selectedOfficers = this.selectedOfficers.filter( value => value.id !== val );
	}

	searchLead() {
		const value = this.formGroup2.value;
		let allResult = this.dataLeads;
		if ( Array.isArray( value.date ) && value.date.length !== 0 ) {
			allResult = allResult.filter( value1 => {
				const parseDate = parseISO( value1.data.createdAt );
				return isWithinInterval(
					parseDate,
					{
						start: startOfDay( value.date[0] ),
						end: addDays( startOfDay( value.date[1] ), 1 )
					} );
			} );
		}
		if ( Array.isArray( value.channels ) && value.channels.length !== 0 ) {
			let cok = [];
			value.channels.forEach( ( value1 ) => {
				const res = allResult.filter( value2 => {
					return value1.data.id === value2.getChannel.id;
				} );
				cok = [ ...cok, ...res ];
			} );
			allResult = cok;
		}
		if ( Array.isArray( value.category ) && value.category.length !== 0 ) {
			let cok = [];
			value.category.forEach( ( value1 ) => {
				const res = allResult.filter( value2 => {
					return value1.name === value2.getCategory.name;
				} );
				cok = [ ...cok, ...res ];
			} );
			allResult = cok;
		}
		if ( Array.isArray( value.status ) && value.status.length !== 0 ) {
			let cok = [];
			value.status.forEach( ( value1 ) => {
				const res = allResult.filter( value2 => {
					return value1.name === value2.getStatus.name;
				} );
				cok = [ ...cok, ...res ];
			} );
			allResult = cok;
		}
		if ( Array.isArray( value.officers ) && value.officers.length !== 0 ) {
			let cok = [];
			value.officers.forEach( ( value1 ) => {
				const res = allResult.filter( value2 => {
					return value2.data.owner.userId === value1.data.id;
				} );
				cok = [ ...cok, ...res ];
			} );
			allResult = cok;
		}
		this.dataFilteredLeads = allResult;
	}

	migrateLead() {
		if ( !Array.isArray( this.checkedLeads ) || !this.checkedLeads.length ) {
			return this.toastr.error( 'Please Select Leads' );
		}

		if ( this.checkedLeads.length < this.selectedOfficers.length ) {
			return this.toastr.error( `Selected Leads must be equal or greater than Selected Sales Officer`,
				'Migrate Leads must be more than Sales Officer', { timeOut: 9000 } );
		}

		if ( Array.isArray( this.checkedLeads ) && this.checkedLeads.length >= this.selectedOfficers.length ) {
			const body = {
				salesOfficerIds: this.selectedOfficers.map( value => value.user.id ),
				leadUuids: this.checkedLeads
			};
			this.spinner.show();
			this.http.migrateLeads( body )
				.pipe( tap( () => this.spinner.hide() ) )
				.subscribe(
					() => this.stepper.next()
				);
		}
	}

	ngOnInit() {
		/// ILeadGroup 1
		this.http2.getAllSalesTeam( true )
			.subscribe( value => {
				this.dataTeams = value;
			} );
		/// ILeadGroup 2
		this.http3.getAllChannels()
			.subscribe( value => {
				this.dataChannel = value;
			} );
		this.http.getAllSalesOfficers( true )
			.subscribe( value => {
				this.dataOfficers2 = value;
			} );
		this.http3.getLeadsMetadata()
			.subscribe( value => {
				this.dataCategory = value;
			} );
		this.http3.getAllLeads()
			.subscribe( value => {
				this.dataLeads = value;
				this.dataFilteredLeads = value;
			} );
	}

	ngOnDestroy(): void {
	}

}
