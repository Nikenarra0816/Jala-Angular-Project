import { Directive, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive( {
	selector: '[appFormFieldInput]'
} )
export class FormFieldInputDirective {

	constructor(
		private control: NgControl
	) {
	}

	@HostBinding( 'style.border-color' ) get isTouched() {
		if ( this.control.invalid && this.control.touched ) {
			return '#FF6E66';
		}
	}
	@HostBinding( 'style.background-color' ) get isDisabled() {
		if ( this.control.disabled ) {
			return '#cccccc';
		}
	}

}
