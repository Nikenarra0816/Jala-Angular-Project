import { Directive, Input } from '@angular/core';
import {
	AbstractControl,
	AsyncValidator,
	AsyncValidatorFn,
	NG_ASYNC_VALIDATORS,
	ValidationErrors
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { DashboardProfileService } from '@core/services/dashboard-profile/dashboard-profile.service';

export function checkPhoneValidator( service: DashboardProfileService, initValue: string ): AsyncValidatorFn {
	return ( control: AbstractControl ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
		const debounceTime = 1000; // milliseconds
		/*if ( initValue === '+62' + control.value ) {
			return of( null );
		}*/
		if ( initValue === control.value ) {
			return of( null );
		}
		return timer( debounceTime )
			.pipe(
				switchMap( () => {
					/*return service.testPhoneAndEmail( { phone: '+62' + control.value } )
						.pipe(
							map(
								users => {
									return ( !users.pass ) ? { 'phoneExists': true } : null;
								}
							)
						);*/
					return service.testPhoneAndEmail( { phone: control.value } )
						.pipe(
							map(
								users => {
									return ( !users.pass ) ? { 'phoneExists': true } : null;
								}
							)
						);
				} ),
				first()
			);
	};
}

@Directive( {
	selector: '[appPhoneExists][formControlName],[appPhoneExists][formControl],[appPhoneExists][ngModel]',
	providers: [ { provide: NG_ASYNC_VALIDATORS, useExisting: CheckPhoneValidatorDirective, multi: true } ]
} )
export class CheckPhoneValidatorDirective implements AsyncValidator {
	@Input() initialValue: string;

	constructor( private service: DashboardProfileService ) {
	}

	validate( control: AbstractControl ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
		return checkPhoneValidator( this.service, this.initialValue )( control );
	}
}

export function checkEmailValidator( service: DashboardProfileService, initValue: string ): AsyncValidatorFn {
	return ( control: AbstractControl ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
		const debounceTime = 1000; // milliseconds
		if ( initValue === control.value ) {
			return of( null );
		}
		return timer( debounceTime )
			.pipe(
				switchMap( () => {
					return service.testPhoneAndEmail( { email: control.value } )
						.pipe(
							map(
								users => {
									return ( !users.pass ) ? { 'emailExists': true } : null;
								}
							)
						);
				} ),
				first()
			);
	};
}

@Directive( {
	selector: '[appEmailExists][formControlName],[appEmailExists][formControl],[appEmailExists][ngModel]',
	providers: [ { provide: NG_ASYNC_VALIDATORS, useExisting: CheckEmailValidatorDirective, multi: true } ]
} )
export class CheckEmailValidatorDirective implements AsyncValidator {
	@Input() initialValue: string;

	constructor( private service: DashboardProfileService ) {
	}

	validate( control: AbstractControl ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
		return checkEmailValidator( this.service, this.initialValue )( control );
	}
}
