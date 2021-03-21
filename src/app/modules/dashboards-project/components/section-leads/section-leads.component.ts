import { Component, Input, OnInit } from '@angular/core';

@Component( {
	selector: 'app-section-leads',
	templateUrl: './section-leads.component.html',
	styleUrls: [ './section-leads.component.scss' ]
} )
export class SectionLeadsComponent implements OnInit {
	@Input() color: 'green' | 'gray' = 'gray';

	// @Input() icon: string;

	constructor() {
	}

	ngOnInit() {
	}

}
