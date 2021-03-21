import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipelineEmptyGuard } from '@core/guards/pipeline-empty.guard';
import { PipelineEmptyComponent } from '@jala-modules/dashboards-pipeline/pages/pipeline-empty/pipeline-empty.component';
import { PipelineListComponent } from '@jala-modules/dashboards-pipeline/pages/pipeline-list/pipeline-list.component';
import { PipelineDetailComponent } from '@jala-modules/dashboards-pipeline/pages/pipeline-detail/pipeline-detail.component';

const PIPELINE_ROUTE: Routes =
	[
		{
			path: '',
			pathMatch: 'full',
			redirectTo: 'empty'
		},
		{
			path: 'empty',
			component: PipelineEmptyComponent,
			canActivate: [ PipelineEmptyGuard ]
		},
		{
			path: 'list',
			component: PipelineListComponent
		},
		{
			path: ':id/detail',
			component: PipelineDetailComponent
		},
		{
			path: '**',
			redirectTo: 'empty'
		}
	];

@NgModule( {
	imports: [ RouterModule.forChild( PIPELINE_ROUTE ) ],
	exports: [ RouterModule ]
} )
export class DashboardsPipelineRoutingModule {
}
