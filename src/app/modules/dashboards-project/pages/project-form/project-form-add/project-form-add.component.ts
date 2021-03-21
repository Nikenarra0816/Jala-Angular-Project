import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { DashboardSalesTeamService } from '@core/services/dashboard-sales-team/dashboard-sales-team.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Channel, IChannelMetadata } from '@shared/models/channel.model';
import { urlValid } from '@shared/validators/urlValidator';
import { inOutAnimation } from '@shared/animations/inOutAnimation';
import { Form, IForm, IFormFieldsEntity, IFormMetadata } from '@shared/models/form.model';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DialogSuccessComponent } from '@jala-modules/dashboards-project/components/dialog-success/dialog-success.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component( {
	selector: 'app-project-form-add',
	templateUrl: './project-form-add.component.html',
	styleUrls: [ './project-form-add.component.scss' ],
	animations: [ inOutAnimation ]
} )
export class ProjectFormAddComponent implements OnInit {

	@ViewChild( 'stepper', { static: false } ) stepper: CdkStepper;

	constructor(
		private http: DashboardProjectService,
		private http2: DashboardSalesTeamService,
		private fb: FormBuilder,
		private dialog: MatDialog,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService
	) {
	}

	channelMetadata: Observable<IChannelMetadata>;
	formMetadata: Observable<IFormMetadata>;
	channelList: Observable<Channel[]>;
	selectedFormField: IFormFieldsEntity[] = [];
	selectedChannel: Channel[] = [];
	mediaType: 'online' | 'offline' = 'online';
	finalizedForm: Form;

	formGroup1 = this.fb.group( {
		name: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
		pageUrl: [ '', [ Validators.required, urlValid ] ]
	} );

	formGroup3 = this.fb.control( [ null ], [ Validators.required ] );

	changeField( item: IFormFieldsEntity, isChecked: boolean ) {
		if ( isChecked ) {
			this.selectedFormField.push( item );
		} else {
			const i = this.selectedFormField.findIndex( value => value.id === item.id );
			this.selectedFormField.splice( i, 1 );
		}
	}

	changeChannels( item: Channel, isChecked: boolean ) {
		if ( isChecked ) {
			this.selectedChannel.push( item );
		} else {
			const i = this.selectedChannel.findIndex( value => value.data.id === item.data.id );
			this.selectedChannel.splice( i, 1 );
		}
		if ( this.selectedChannel.length !== 0 ) {
			this.formGroup3.patchValue( this.selectedChannel[0].data.id );
		} else {
			this.formGroup3.patchValue( null );
		}
	}

	isValid( group: FormGroup ) {
		if ( group.valid ) {
			this.stepper.next();
		}
		group.markAllAsTouched();
	}

	isForm3Valid() {
		if ( this.selectedFormField.length === 0 ) {
			return;
		}
		/*if ( this.formGroup3.invalid ) {
			return;
		}*/
		const body: Partial<IForm> = {
			type: this.mediaType,
			...this.formGroup1.value,
			fields: this.selectedFormField.map( value => {
				return {
					id: value.id
				};
			} ),
			/*channels: this.selectedChannel.map( value => {
				if ( value.data.id === this.formGroup3.value ) {
					return { id: value.data.id, defaultChannel: true };
				}
				return { id: value.data.id };
			} )*/
		};
		this.spinner.show();
		this.http.createForms( [ body ] )
			.subscribe( value => {
				this.spinner.hide();
				if ( this.mediaType === 'online' ) {
					this.finalizedForm = value[0];
					return this.stepper.next();
				} else if ( this.mediaType === 'offline' ) {
					const dataDialog = {
						h1: 'Yaaay, you success set up form',
						h3: 'Next Step is setup your website to generate lead \n' +
							'if you need help or have any question please contact us',
						button: 'View Form'
					};
					this.openSuccessDialog( dataDialog );
				}
			}, error => {
				this.spinner.hide();
				this.toastr.error( 'Sorry Something Goes Wrong, Please Contact Us' );
			} );
	}

	finishFormOnline() {
		const dataDialog = {
			h1: 'Yaaay, you success set up form',
			h3: 'Next Step is setup your website to generate lead please read the guide carefully\n' +
				'if you need help or have any question please contact us',
			button: 'View Form'
		};
		this.openSuccessDialog( dataDialog );
	}

	openSuccessDialog( data: { h1: string, h3: string, button: string } ): void {
		const dialogRef = this.dialog.open( DialogSuccessComponent, { data } );
		dialogRef.afterClosed().subscribe( result => {
			this.router.navigate( [ '../form' ], { relativeTo: this.activatedRoute } );
		} );
	}

	copied( value ) {
		this.toastr.success( 'Script Copied' );
	}

	ngOnInit() {
		this.channelMetadata = this.http.getChannelMetadata();
		this.formMetadata = this.http.getFormMetadata()
			.pipe(
				map( value => {
					value.fields = value.fields.sort( ( a, b ) => a.id - b.id );
					return value;
				} ),
				tap( value => {
					this.selectedFormField = value.fields.filter( value1 => value1.mandatory );
				} )
			);
		this.channelList = this.http.getFormChannel();
	}

}
