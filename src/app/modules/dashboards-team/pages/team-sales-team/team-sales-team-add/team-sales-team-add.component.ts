import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardSalesTeamService } from '@core/services/dashboard-sales-team/dashboard-sales-team.service';
import { DashboardProfileService } from '@core/services/dashboard-profile/dashboard-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { checkEmailValidator, checkPhoneValidator } from '@shared/validators/asyncValidator';
import { CdkStepper } from '@angular/cdk/stepper';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component( {
	selector: 'app-team-sales-team-add',
	templateUrl: './team-sales-team-add.component.html',
	styleUrls: [ './team-sales-team-add.component.scss' ]
} )
export class TeamSalesTeamAddComponent implements OnInit, OnDestroy {
	@ViewChild( 'stepper', { static: false } ) stepper: CdkStepper;

	constructor(
		private fb: FormBuilder,
		private http: DashboardSalesTeamService,
		private http2: DashboardProfileService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService
	) {
		this.globalCoverage.valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( value => {
				if ( value ) {
					this.formGroup.get( 'coverage' ).disable();
					this.formGroup.get( 'coverage' ).reset();
				} else {
					this.formGroup.get( 'coverage' ).enable();
				}
			} );
	}

	coverages$: Observable<any>;

	formGroup = this.fb.group( {
		name: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
		email: [ '', [ Validators.required, Validators.email ] ],
		phone: [ '+62', [ Validators.required, Validators.minLength( 8 ), Validators.pattern( '^(\\+62)\\d{3}\\d+$' ) ] ],
		pic: [ '', [ Validators.required ] ],
		address: [ '', [ Validators.required ] ],
		coverage: [ [], [ Validators.required ] ]
	} );
	globalCoverage = this.fb.control( false );

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
			address: value.value.address,
			members: [ {
				role: 'leader',
				user: {
					name: value.value.pic,
					email: value.value.email,
					phone: value.value.phone,
					address: value.value.address,
				}
			} ],
			isGlobalCoverage: this.globalCoverage.value,
			locations: value.value.coverage ? value.value.coverage : []
		};
		this.http.createSalesTeam( body )
			.pipe( tap( () => this.spinner.hide() ) )
			.subscribe( value1 => {
				this.stepper.next();
				this.toastr.success( 'Create Success' );
			}, error => {
				this.toastr.error( 'Create Error' );
			} );
	}

	ngOnInit() {
		this.coverages$ = this.http.getAllSubCoverage();
		this.formGroup.get( 'email' ).setAsyncValidators( checkEmailValidator( this.http2, undefined ) );
		this.formGroup.get( 'phone' ).setAsyncValidators( checkPhoneValidator( this.http2, undefined ) );
	}

	ngOnDestroy(): void {
	}

}
