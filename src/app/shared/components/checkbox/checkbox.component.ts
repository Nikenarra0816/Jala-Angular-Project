import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component( {
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: [ './checkbox.component.scss' ],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef( () => CheckboxComponent ),
			multi: true
		}
	]
} )
export class CheckboxComponent implements ControlValueAccessor {
	@Output() checked = new EventEmitter<boolean>();
	@Input() controlID = 'default';
	value: boolean;
	propagateChange: ( val: boolean ) => void;
	onTouched: () => void;
	disabled = false;

	// jancok = this.cok.asObservable().pipe( takeLast( 1 ), tap( val => console.log( val ) ) );

	constructor() {
	}

	registerOnChange( fn: any ): void {
		this.propagateChange = fn;
	}

	registerOnTouched( fn: any ): void {
		this.onTouched = fn;
	}

	setDisabledState( isDisabled: boolean ): void {
		this.disabled = isDisabled;
	}

	writeValue( val: boolean ): void {
		this.value = val ? val : false;
	}

	onChange( value: boolean ) {
		this.value = value;
		this.propagateChange( value );
		this.checked.emit( value );
	}

	onClick( el: HTMLInputElement ) {
		if ( !this.disabled ) {
			this.onChange( !this.value );
			el.focus();
		}
	}


}
