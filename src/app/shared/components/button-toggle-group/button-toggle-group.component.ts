import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { ButtonToggleComponent } from '@shared/components/button-toggle-group/button-toggle/button-toggle.component';

@Component( {
	selector: 'app-button-toggle-group',
	templateUrl: './button-toggle-group.component.html',
	styleUrls: [ './button-toggle-group.component.scss' ]
} )
export class ButtonToggleGroupComponent implements AfterContentInit {
	@ContentChildren( ButtonToggleComponent ) buttons: QueryList<ButtonToggleComponent>;
	@Input() public value;
	@Output() valueChange = new EventEmitter<string>();


	constructor() {
	}

	setValue( val: string ) {
		this.buttons.forEach( value => value.selected = false );
		this.buttons.find( value => value.value === val ).selected = true;
		this.valueChange.next( val );
		this.value = val;
	}

	ngAfterContentInit() {
		this.buttons.forEach( ( buttonEach ) => {
			buttonEach.setValue.subscribe( val => {
				this.setValue( val );
			} );
		} );

		const button = this.buttons.find( buttonFind => {
			return buttonFind.value === this.value;
		} );
		button.selected = true;
	}

}
