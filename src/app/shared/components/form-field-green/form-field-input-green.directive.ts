import { Directive, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive( {
	selector: '[appFormFieldInputGreen]'
} )
export class FormFieldInputGreenDirective {

	constructor(
		private control: NgControl
	) {
	}

	@HostBinding( 'style.background-color' ) get isDisabled() {
		if ( this.control.disabled ) {
			return '#cccccc';
		}
	}

	resetValue() {
		this.control.reset();
	}

}
