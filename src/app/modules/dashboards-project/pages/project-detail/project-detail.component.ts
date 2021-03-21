import { Component, OnInit } from '@angular/core';
import { appSmoothHeight } from '@shared/directives/smooth-height/smooth-height.directive';

@Component( {
	selector: 'app-project-detail',
	templateUrl: './project-detail.component.html',
	styleUrls: [ './project-detail.component.scss' ],
	animations: [ appSmoothHeight ]
} )
export class ProjectDetailComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
