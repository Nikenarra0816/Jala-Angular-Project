import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Project } from '@shared/models/project.model';

@Component( {
	selector: 'app-project-list-grid-view',
	templateUrl: './project-list-grid-view.component.html',
	styleUrls: [ './project-list-grid-view.component.scss' ],
} )
export class ProjectListGridViewComponent implements OnInit, OnDestroy {
	@Input() dataProject: Project[];

	constructor() {
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
	}
}
