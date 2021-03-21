import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
	selector: 'app-collapsible',
	templateUrl: './collapsible.component.html',
	styleUrls: ['./collapsible.component.scss'],
	animations: [trigger('expandCollapse', [
		state('false', style({
			height: '0px',
			visibility: 'hidden'
		})),
		state('true', style({
			height: '*',
			visibility: 'visible'
		})),
		transition('true <=> false', animate('.3s ease'))]
	)]
})
export class CollapsibleComponent {

	@Input() title: string;
	@Output() clicked = new EventEmitter();
	@Input() isOpen = false;

	changeState() {
		this.isOpen = !this.isOpen;
		this.clicked.emit(this.isOpen);
	}

	// constructor() { }

	// ngOnInit() {
	// }

}
