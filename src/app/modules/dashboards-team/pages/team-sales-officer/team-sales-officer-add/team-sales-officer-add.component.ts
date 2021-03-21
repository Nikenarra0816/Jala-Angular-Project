import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardSalesOfficerService } from '@core/services/dashboard-sales-officer/dashboard-sales-officer.service';
import { DashboardProfileService } from '@core/services/dashboard-profile/dashboard-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { checkEmailValidator, checkPhoneValidator } from '@shared/validators/asyncValidator';
import { ToastrService } from 'ngx-toastr';

@Component( {
	selector: 'app-team-sales-officer-add',
	templateUrl: './team-sales-officer-add.component.html',
	styleUrls: [ './team-sales-officer-add.component.scss' ]
} )
export class TeamSalesOfficerAddComponent implements OnInit {

	@ViewChild( 'stepper', { static: false } ) stepper: CdkStepper;

	constructor(
		private fb: FormBuilder,
		private http: DashboardSalesOfficerService,
		private http2: DashboardProfileService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService
	) {
	}

	teams$: Observable<any>;

	formGroup = this.fb.group( {
		teams: [ undefined, [ Validators.required ] ],
		name: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
		phone: [ '+62', [ Validators.required, Validators.minLength( 8 ), Validators.pattern( '^(\\+62)\\d{3}\\d+$' ) ] ],
		email: [ '', [ Validators.required, Validators.email ] ],
		address: [ '', [ Validators.required ] ],
		gender: [ 'male', [ Validators.required ] ],
	} );

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
			address: value.value.address,
			teamMembers: value.value.teams.map( value1 => {
				return { team: { id: value1.id } };
			} ),
		};
		this.http.createSalesOfficer( body )
			.pipe( tap( () => this.spinner.hide() ) )
			.subscribe( value1 => {
				this.stepper.next();
				this.toastr.success( 'Create Success' );
			}, error => {
				this.toastr.error( 'Create Error' );
			} );
	}

	ngOnInit() {
		this.teams$ = this.http.getAllTeamsIdAndName();
		this.formGroup.get( 'email' ).setAsyncValidators( checkEmailValidator( this.http2, undefined ) );
		this.formGroup.get( 'phone' ).setAsyncValidators( checkPhoneValidator( this.http2, undefined ) );
	}

}
