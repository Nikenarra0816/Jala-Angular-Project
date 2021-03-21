import { Component, Input, OnInit } from '@angular/core';

@Component( {
	selector: 'app-card-list-summary',
	templateUrl: './card-list-summary.component.html',
	styleUrls: [ './card-list-summary.component.scss' ]
} )
export class CardListSummaryComponent implements OnInit {

	@Input() icon: 'campaign' | 'channel' | 'lead' | 'product' | 'click' |'sales-team'| 'sales-officer' | 'customer-1';
	@Input() values: number;
	@Input() title: string;

	constructor() {
	}

	ngOnInit() {
	}

}
