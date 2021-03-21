import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Campaign, ICampaign, ICampaignMetadata } from '@shared/models/campaign.model';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiUploadService } from '@core/services/api-upload.service';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { addMonths, differenceInCalendarMonths, format, parseISO } from 'date-fns';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ToastrService } from 'ngx-toastr';

@Component( {
	selector: 'app-project-campaign-dialog',
	templateUrl: './project-campaign-dialog.component.html',
	styleUrls: [ './project-campaign-dialog.component.scss' ]
} )
export class ProjectCampaignDialogComponent implements OnInit, OnDestroy {

	constructor(
		public dialogRef: MatDialogRef<ProjectCampaignDialogComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: { identifier: 'add' | 'edit', value: any },
		private fb: FormBuilder,
		private http: DashboardProjectService,
		private http2: ApiUploadService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService
	) {
	}

	metadata: Observable<ICampaignMetadata>;
	imageUrl: string | ArrayBuffer;
	imageData: File;

	formGroup1 = this.fb.group( {
		name: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
		detail: [ '', [ Validators.required ] ],
		status: [ 'running', [ Validators.required ] ],
		duration: [ 'noDuration' ],
	} );
	formGroup1Month = this.fb.control( { value: 1, disabled: true } );

	imageUpload( value ) {
		this.imageData = value;
	}

	setProjectDetail( value ) {
		const body: Partial<ICampaign> = {
			name: value.name,
			detail: value.detail,
			periodStart: format( new Date(), 'yyyy-MM-dd' ),
			periodEnd: null,
			status: value.status
		};
		if ( value.duration === 'duration' ) {
			const dur = this.formGroup1Month.value;
			body.periodEnd = format( addMonths( new Date(), dur ), 'yyyy-MM-dd' );
		}
		return body;
	}

	updateMethod( data: FormGroup ) {
		let method: Observable<any>;
		const campaignId = this.data.value.data.id;
		const body = this.setProjectDetail( data.value );
		if ( this.imageData ) {
			method = this.http2.uploadImage( this.imageData )
				.pipe(
					switchMap( ( value ) => {
						Object.assign( body, { picture: value.payload.fullPath } );
						return this.http.updateCampaign( campaignId, body );
					} )
				);
		} else {
			method = this.http.updateCampaign( campaignId, body );
		}
		return method;
	}

	createMethod( data: FormGroup ) {
		let method: Observable<any>;
		const projectId = this.data.value;
		const body = this.setProjectDetail( data.value );
		if ( this.imageData ) {
			method = this.http2.uploadImage( this.imageData )
				.pipe(
					switchMap( ( val ) => {
						Object.assign( body, { picture: val.payload.fullPath } );
						return this.http.createCampaign( projectId, [ body ] );
					} )
				);
		} else {
			method = this.http.createCampaign( projectId, [ body ] );
		}
		return method;
	}

	save( data: FormGroup ) {
		if ( data.valid ) {
			this.spinner.show();
			let method: Observable<any>;
			// Jika ada curValue maka method PUT
			if ( this.data.identifier === 'edit' ) {
				method = this.updateMethod( data );
			} else { // Kudune Ditambahi ambek image upload engkok di merge. Dadi upload image disek terus baru sing iki
				/*if ( this.imageData === undefined ) {
					this.spinner.hide();
					this.toastr.error( 'Please Add Some Picture' );
					return;
				}*/
				method = this.createMethod( data );
			}
			method
				.pipe(
					tap( () => this.spinner.hide() )
				)
				.subscribe(
					( val ) => {
						this.dialogRef.close( 'change' );
					}, err => {
					}
				);
		}
	}

	setValue( value: Campaign ) {
		this.formGroup1.setValue( {
			name: value.data.name,
			detail: value.data.detail,
			duration: value.data.periodEnd ? 'duration' : 'noDuration',
			status: value.data.status
		} );
		if ( value.data.periodEnd ) {
			const duration = differenceInCalendarMonths(
				parseISO( value.data.periodEnd ),
				parseISO( value.data.periodStart )
			);
			this.formGroup1Month.setValue( duration );
			this.formGroup1Month.enable();
		}
		this.imageUrl = value.data.picture;
		if ( value.summary.total_lead > 0 ) {
			this.formGroup1.get( 'name' ).disable();
		}
	}

	ngOnInit() {
		if ( this.data.identifier === 'edit' ) {
			this.setValue( this.data.value );
		}
		this.metadata = this.http.getCampaignMetadata();
		this.formGroup1.get( 'duration' ).valueChanges
			.pipe(
				untilDestroyed( this )
			)
			.subscribe( value => {
				value === 'duration' ? this.formGroup1Month.enable() : this.formGroup1Month.disable();
			} );
	}

	ngOnDestroy() {

	}

}
