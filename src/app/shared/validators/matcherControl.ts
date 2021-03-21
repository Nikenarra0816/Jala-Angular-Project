import { AbstractControl, FormGroup } from '@angular/forms';

export function passwordMatcher( c: AbstractControl ): { [ key: string ]: boolean } | null {
	const password = c.get( 'password' );
	const confirmPassword = c.get( 'confirmPassword' );

	if ( password.pristine || confirmPassword.pristine ) {
		return null;
	}

	if ( password.value === confirmPassword.value ) {
		return null;
	}
	return { match: true };
}

export function emailMatcher( c: AbstractControl ): { [ key: string ]: boolean } | null {
	const emailControl = c.get( 'email' );
	const confirmControl = c.get( 'confirmEmail' );

	if ( emailControl.pristine || confirmControl.pristine ) {
		return null;
	}

	if ( emailControl.value === confirmControl.value ) {
		return null;
	}
	return { match: true };
}

export function MustMatch(controlName: string, matchingControlName: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];

		if (matchingControl.errors && !matchingControl.errors.mustMatch) {
			// return if another validator has already found an error on the matchingControl
			return;
		}

		// set error on matchingControl if validation fails
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ mustMatch: true });
		} else {
			matchingControl.setErrors(null);
		}
	};
}
