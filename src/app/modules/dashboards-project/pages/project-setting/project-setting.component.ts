import { Component, OnDestroy, OnInit } from '@angular/core';
import { appSmoothHeight } from '@shared/directives/smooth-height/smooth-height.directive';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { ActivatedRoute } from '@angular/router';
import { IProjectMetadata, Project } from '@shared/models/project.model';

@Component( {
	selector: 'app-project-setting',
	templateUrl: './project-setting.component.html',
	styleUrls: [ './project-setting.component.scss' ],
	animations: [ appSmoothHeight ]
} )
export class ProjectSettingComponent implements OnInit, OnDestroy {
	viewTabs = 1;
	projectId: string;
	public dataProject: Project;
	public metadata: IProjectMetadata;

	constructor( private http: DashboardProjectService, private activatedRoute: ActivatedRoute ) {
		this.projectId = this.activatedRoute.snapshot.paramMap.get( 'id' );
	}

	refreshApi() {
		this.http.getProjectWithSummaryById( this.projectId, true ).subscribe( value => this.dataProject = value );
		this.http.getProjectMetadata().subscribe( value => this.metadata = value );
	}

	ngOnInit() {
		this.refreshApi();
	}

	ngOnDestroy(): void {
	}
}
