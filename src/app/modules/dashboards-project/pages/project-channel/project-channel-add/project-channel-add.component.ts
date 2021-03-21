import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { Observable } from 'rxjs';
import { IChannelMetadata, IChannelMetadataMedias } from '@shared/models/channel.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Campaign } from '@shared/models/campaign.model';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { urlValid } from '@shared/validators/urlValidator';
import { CdkStepper } from '@angular/cdk/stepper';
import { DashboardSalesTeamService } from '@core/services/dashboard-sales-team/dashboard-sales-team.service';
import { SalesTeam } from '@shared/models/sales-team.model';
import { addMonths, format } from 'date-fns';
import { tap } from 'rxjs/operators';
import { Form } from '@shared/models/form.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { DialogSuccessComponent } from '@jala-modules/dashboards-project/components/dialog-success/dialog-success.component';
import { DialogConfirmationComponent } from '@shared/components/dialog-confirmation/dialog-confirmation.component';

@Component( {
	selector: 'app-project-channel-add',
	templateUrl: './project-channel-add.component.html',
	styleUrls: [ './project-channel-add.component.scss' ]
} )
export class ProjectChannelAddComponent implements OnInit, OnDestroy {

	@ViewChild( 'stepper', { static: false } ) stepper: CdkStepper;

	constructor(
		private router: Router,
		private activatedRouter: ActivatedRoute,
		private http: DashboardProjectService,
		private http2: DashboardSalesTeamService,
		private fb: FormBuilder,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService,
		private dialog: MatDialog
	) {
	}

	private projectId;
	channelMetadata: Observable<IChannelMetadata>;
	campaignList: Observable<Campaign[]>;
	allCampaignList: Campaign[];
	salesTeamList: Observable<SalesTeam[]>;
	allFormsList: Form[];
	filteredFormList: Form[];
	selectedForm: Form;

	selectedMetadata: IChannelMetadataMedias;
	selectedSalesTeam: SalesTeam[] = [];

	formGroup2 = this.fb.group( {
		name: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
		campaign: [ '', Validators.required ],
		redirectUrl: [ '', [ Validators.required, urlValid ] ],
		duration: [ 'noDuration' ],
		detail: [ '', Validators.required ],
	} );
	formGroup2duration = this.fb.control( { value: 1, disabled: true } );

	formGroup4 = this.fb.control( '', [ Validators.required ] );

	get showRedirectUrl() {
		if ( !this.selectedMetadata ) {
			return false;
		}
		if ( this.selectedMetadata.type !== 'online' ) {
			this.formGroup2.get( 'redirectUrl' ).disable();
			return false;
		}
		this.formGroup2.get( 'redirectUrl' ).enable();
		return true;
	}

	//////// FORM 2 /////////

	get getValueFormGroup2() {
		const formGroup2Value = this.formGroup2.value;
		const campaignValue = this.allCampaignList.find( value => formGroup2Value.campaign === value.data.id );
		const body = {
			name: formGroup2Value.name,
			campaign: campaignValue,
			redirectUrl: formGroup2Value.redirectUrl,
			detail: formGroup2Value.detail,
			periodStart: format( new Date(), 'yyyy-MM-dd' ),
			periodEnd: null
		};
		if ( formGroup2Value.duration === 'duration' ) {
			const dur = this.formGroup2duration.value;
			body.periodEnd = format( addMonths( new Date(), dur ), 'yyyy-MM-dd' );
		}
		return body;
	}

	/////////////////////////

	////// FORM 3 ///////

	changeTeam( item: SalesTeam, isChecked: boolean ) {
		if ( isChecked ) {
			this.selectedSalesTeam.push( item );
		} else {
			const i = this.selectedSalesTeam.findIndex( value => value.data.id === item.data.id );
			this.selectedSalesTeam.splice( i, 1 );
		}
	}

	/////////////////////////

	////// FORM 4 ///////

	changeFormList() {
		this.filteredFormList = this.allFormsList.filter( value => {
			if ( this.selectedMetadata.type === 'others' ) {
				return value.data.type === 'offline';
			}
			return value.data.type === this.selectedMetadata.type;
		} );
		if ( this.filteredFormList.length !== 0 ) {
			this.formGroup4.setValue( this.filteredFormList[ 0 ].data.id, { emitEvent: true } );
			this.selectedForm = this.filteredFormList[ 0 ];
			this.stepper.next();
		} else {
			this.openConfirmationDialog( this.selectedMetadata.type );
		}
	}

	/////////////////////////

	//////// FORM 5 /////////

	submitForm() {
		if ( !this.isAllValid ) {
			return;
		}
		const group2value = Object.assign( {}, this.getValueFormGroup2 );
		// @ts-ignore
		group2value.campaign = this.getValueFormGroup2.campaign.getCampaignId;
		const body = {
			...group2value,
			media: { id: this.selectedMetadata.id },
			teams: this.selectedSalesTeam.map( value => {
				return { id: value.data.id };
			} ),
			form: { id: this.selectedForm.data.id },
			picture: this.selectedMetadata.picture
		};
		this.spinner.show();
		this.http.createChannel( this.getValueFormGroup2.campaign.data.id, [ body ] )
			.pipe(
				tap( () => this.spinner.hide() )
			)
			.subscribe( value => {
				this.openSuccessDialog();
				this.toastr.success( 'Create Success' );
			}, error => {
				this.toastr.error( 'Create Error' );
			} );
	}

	openSuccessDialog(): void {
		const dataDialog = {
			h1: 'Yaaay, you success set up channel',
			button: 'View Channel'
		};
		const dialogRef = this.dialog.open( DialogSuccessComponent, { data: dataDialog } );
		dialogRef.afterClosed().subscribe( result => {
			this.router.navigate( [ '../detail/channel' ], { relativeTo: this.activatedRouter } );
		} );
	}

	openConfirmationDialog( form: string ): void {
		const dataDialog = {
			h3: `You dont have form ${ form }. Do You want to Redirect to Create New Form ?`,
		};
		const dialogRef = this.dialog.open( DialogConfirmationComponent, { data: dataDialog } );
		dialogRef.afterClosed().subscribe( result => {
			if ( result ) {
				this.router.navigate( [ '../../new-form' ], { relativeTo: this.activatedRouter } );
			}
		} );
	}

	/////////////////////////

	isValid( group: FormGroup ) {
		if ( group.valid ) {
			this.stepper.next();
		}
	}

	get isAllValid() {
		return this.selectedMetadata && this.formGroup2.valid && this.selectedSalesTeam.length !== 0 && this.selectedForm;
	}

	ngOnInit() {
		this.projectId = this.activatedRouter.snapshot.paramMap.get( 'id' );
		this.channelMetadata = this.http.getChannelMetadata();
		this.campaignList = this.http.getAllCampaigns( this.projectId ).pipe( tap( value => this.allCampaignList = value ) );
		this.salesTeamList = this.http2.getAllSalesTeam();

		this.formGroup4.valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( value => {
				this.selectedForm = this.allFormsList.find( value1 => value1.data.id === value );
			} );
		this.http.getAllForms()
			.subscribe( value => {
				this.allFormsList = value;
				this.filteredFormList = value;
				this.formGroup4.setValue( this.filteredFormList[ 0 ].data.id, { emitEvent: true } );
				this.selectedForm = this.filteredFormList[ 0 ];
			} );

		this.formGroup2.get( 'duration' ).valueChanges
			.pipe(
				untilDestroyed( this )
			)
			.subscribe( value => {
				value === 'duration' ? this.formGroup2duration.enable() : this.formGroup2duration.disable();
			} );
	}

	ngOnDestroy() {
	}

}
