import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component( {
	selector: 'app-button-toggle',
	templateUrl: './button-toggle.component.html',
	styleUrls: [ './button-toggle.component.scss' ]
} )
export class ButtonToggleComponent implements OnInit {
	@Input() public value: string;
	@Output() setValue = new EventEmitter<string>();
	public selected = false;

	constructor() {
	}

	onClick() {
		this.setValue.emit( this.value );
	}

	ngOnInit() {
	}
}
