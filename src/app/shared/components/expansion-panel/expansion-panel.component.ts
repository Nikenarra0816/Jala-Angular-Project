import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component( {
	selector: 'app-expansion-panel',
	templateUrl: './expansion-panel.component.html',
	styleUrls: [ './expansion-panel.component.scss' ],
	animations: [ trigger( 'expandCollapse', [
		state( 'false', style( {
			height: '0px',
			visibility: 'hidden'
		} ) ),
		state( 'true', style( {
			height: '*',
			visibility: 'visible'
		} ) ),
		transition( 'true <=> false', animate( '.3s ease' ) ) ]
	) ]
} )
export class ExpansionPanelComponent implements OnInit {
	@Input() title: string;
	@Input() isOpen = true;


	constructor() {
	}

	changeState() {
		this.isOpen = !this.isOpen;
	}

	ngOnInit() {
	}

}
