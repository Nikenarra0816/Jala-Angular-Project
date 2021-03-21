import { Component, ContentChild, Input } from '@angular/core';
import { FormFieldInputDirective } from './form-field-input.directive';
import { AbstractControl, NgControl } from '@angular/forms';

@Component( {
	selector: 'app-form-field',
	templateUrl: './form-field.component.html',
	styleUrls: [ './form-field.component.scss' ]
} )
export class FormFieldComponent {
	@Input() label: string;
	@ContentChild( FormFieldInputDirective, { static: false } ) directive: FormFieldInputDirective;
	@ContentChild( NgControl, { static: false } ) control: NgControl;

	constructor() {
	}

	get first() {
		return this.control.invalid && this.control.touched;
	}

	required() {
		return hasRequiredField( this.control.control );
	}

}

export const hasRequiredField = ( abstractControl: AbstractControl ): boolean => {
	if ( abstractControl.validator ) {
		const validator = abstractControl.validator( {} as AbstractControl );
		if ( validator && validator.required ) {
			return true;
		}
	}
	if ( abstractControl[ 'controls' ] ) {
		for ( const controlName in abstractControl[ 'controls' ] ) {
			if ( abstractControl[ 'controls' ][ 'required' ] ) {
				if ( hasRequiredField( abstractControl[ 'controls' ][ 'required' ] ) ) {
					return true;
				}
			}
		}
	}
	return false;
};
