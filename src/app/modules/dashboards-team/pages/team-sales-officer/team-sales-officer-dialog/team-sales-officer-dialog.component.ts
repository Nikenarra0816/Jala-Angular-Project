import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardProfileService } from '@core/services/dashboard-profile/dashboard-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardSalesOfficerService } from '@core/services/dashboard-sales-officer/dashboard-sales-officer.service';
import { Observable } from 'rxjs';
import { checkEmailValidator, checkPhoneValidator } from '@shared/validators/asyncValidator';
import { SalesOfficer } from '@shared/models/sales-officer.model';
import { tap } from 'rxjs/operators';

@Component( {
	selector: 'app-team-sales-officer-dialog',
	templateUrl: './team-sales-officer-dialog.component.html',
	styleUrls: [ './team-sales-officer-dialog.component.scss' ]
} )
export class TeamSalesOfficerDialogComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<TeamSalesOfficerDialogComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: SalesOfficer,
		private fb: FormBuilder,
		private http: DashboardSalesOfficerService,
		private http2: DashboardProfileService,
		private spinner: NgxSpinnerService,
	) {
	}

	teams$: Observable<any>;
	metadata$: Observable<any>;

	formGroup = this.fb.group( {
		teams: [ undefined, [ Validators.required ] ],
		name: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
		phone: [ '', [ Validators.required, Validators.minLength( 8 ), Validators.pattern( '^(\\+62)\\d{3}\\d+$' ) ] ],
		email: [ '', [ Validators.required, Validators.email ] ],
		address: [ '', [ Validators.required ] ],
		gender: [ undefined, [ Validators.required ] ],
		status: [ '', [ Validators.required ] ],
	} );

	setFormValue( value: SalesOfficer ) {
		this.formGroup.setValue( {
			name: value.data.name,
			email: value.data.email,
			phone: value.data.phone,
			gender: value.data.gender === 'notSpecified' ? null : value.data.gender,
			address: value.data.address,
			status: value.data.status,
			teams: value.data.teams.map( value1 => {
				return { id: value1.id, name: value1.name };
			} )
		} );
		this.formGroup.get( 'email' ).setAsyncValidators( checkEmailValidator( this.http2, value.data.email ) );
		this.formGroup.get( 'phone' ).setAsyncValidators( checkPhoneValidator( this.http2, value.data.phone ) );
	}

	save( value: FormGroup ) {
		if ( value.invalid ) {
			this.formGroup.markAllAsTouched();
			return;
		}
		this.spinner.show();
		const body = {
			name: value.value.name,
			email: value.value.email,
			phone: value.value.phone,
			gender: value.value.gender,
			status: value.value.status,
			address: value.value.address,
			teamMembers: value.value.teams.map( value1 => {
				return { team: { id: value1.id } };
			} ),
		};
		this.http.updateSalesOfficer( this.data.data.id, body )
			.pipe( tap( () => this.spinner.hide() ) )
			.subscribe( value1 => {
				this.dialogRef.close( 'change' );
			}, err => {
			} );
	}

	ngOnInit() {
		this.teams$ = this.http.getAllTeamsIdAndName();
		this.metadata$ = this.http.getSalesOfficerMetadata();
		this.setFormValue( this.data );
	}

}
