import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component( {
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: [ './select.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class SelectComponent implements ControlValueAccessor, OnInit {
	@Input() placeholder = '';
	@Input() dataAll: any[];
	@Input() bindLabel = 'name';
	@Input() bindValue = 'value';

	labelInUsed: string;
	valueInUsed: string;

	value: string;
	propagateChange: ( val: string ) => void;
	onTouched: () => void;
	disabled = false;

	constructor( private el: ElementRef, private cd: ChangeDetectorRef, private control: NgControl ) {
		control.valueAccessor = this;
	}

	get valueName() {
		if ( this.dataAll ) {
			return this.dataAll.find( value1 => this.getByPath( value1, this.bindValue ) === this.value );
		}
	}

	get hasError() {
		return this.control.invalid && this.control.touched;
	}

	openDropdown = false;

	open() {
		if ( !this.disabled ) {
			this.openDropdown = !this.openDropdown;
			if ( !this.openDropdown ) {
				this.onTouched();
			}
		}
	}

	registerOnChange( fn: any ): void {
		this.propagateChange = fn;
	}

	registerOnTouched( fn: any ): void {
		this.onTouched = fn;
	}

	setDisabledState( isDisabled: boolean ): void {
		this.openDropdown = false;
		this.disabled = isDisabled;
	}

	writeValue( val: string ): void {
		this.value = val ? val : '';
	}

	onChange( value ) {
		this.value = this.getByPath( value, this.bindValue );
		this.propagateChange( this.value );
	}

	ngOnInit(): void {
	}

	@HostListener( 'document:click', [ '$event' ] )
	onClick( event ) {
		if ( !this.el.nativeElement.contains( event.target ) ) {
			if ( this.openDropdown ) {
				this.open();
				this.cd.detectChanges();
			}
		}
	}

	getByPath( obj, path ) {
		path = path
			.replace( /\[/g, '.' )
			.replace( /]/g, '' )
			.split( '.' );

		path.forEach( ( level ) => {
			obj = obj[ level ];
		} );
		return obj;
	}


}
