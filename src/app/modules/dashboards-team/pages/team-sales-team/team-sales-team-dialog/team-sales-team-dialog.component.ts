import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesTeam } from '@shared/models/sales-team.model';
import { DashboardSalesTeamService } from '@core/services/dashboard-sales-team/dashboard-sales-team.service';
import { checkEmailValidator, checkPhoneValidator } from '@shared/validators/asyncValidator';
import { DashboardProfileService } from '@core/services/dashboard-profile/dashboard-profile.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { switchMap, tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component( {
	selector: 'app-team-sales-team-dialog',
	templateUrl: './team-sales-team-dialog.component.html',
	styleUrls: [ './team-sales-team-dialog.component.scss' ]
} )
export class TeamSalesTeamDialogComponent implements OnInit, OnDestroy {

	constructor(
		public dialogRef: MatDialogRef<TeamSalesTeamDialogComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: SalesTeam,
		private fb: FormBuilder,
		private http: DashboardSalesTeamService,
		private http2: DashboardProfileService,
		private spinner: NgxSpinnerService,
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
		phone: [ '', [ Validators.required, Validators.minLength( 8 ), Validators.pattern( '^(\\+62)\\d{3}\\d+$' ) ] ],
		pic: [ '', [ Validators.required ] ],
		address: [ '', [ Validators.required ] ],
		coverage: [ undefined, [ Validators.required ] ]
	} );
	globalCoverage = this.fb.control( [ false ] );

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
			/*members: [ {
				id: this.data.getLeader.id,
				user: {
					id: this.data.getLeader.user.id,
					name: value.value.pic
				}
			} ],*/
			isGlobalCoverage: this.globalCoverage.value,
			locations: value.value.coverage ? value.value.coverage : []
		};
		this.http.updateSalesTeam( this.data.data.id, body )
			.pipe(
				switchMap( () => {
					return this.http2.updateUserById( this.data.getLeader.user.id,
						{
							name: value.value.pic,
							email: value.value.email,
							phone: value.value.phone
						} );
				} ),
				tap( () => this.spinner.hide() )
			)
			.subscribe( value1 => {
				this.dialogRef.close( 'change' );
			}, err => {
			} );
	}

	setFormValue( value: SalesTeam ) {
		this.formGroup.setValue( {
			name: value.data.name,
			email: value.data.email,
			phone: value.data.phone,
			pic: value.getLeader.user.name,
			address: value.data.address,
			coverage: value.data.locations.map( value1 => {
				return { id: value1.id, name: value1.name };
			} )
		} );
		this.globalCoverage.setValue( value.data.isGlobalCoverage );
		this.formGroup.get( 'email' ).setAsyncValidators( checkEmailValidator( this.http2, value.data.email ) );
		this.formGroup.get( 'phone' ).setAsyncValidators( checkPhoneValidator( this.http2, value.data.phone ) );
	}

	ngOnInit() {
		this.coverages$ = this.http.getAllSubCoverage();
		this.setFormValue( this.data );
	}

	ngOnDestroy(): void {
	}

}
