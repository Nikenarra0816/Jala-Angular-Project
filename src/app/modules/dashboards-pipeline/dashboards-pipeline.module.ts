import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsPipelineRoutingModule } from '@jala-modules/dashboards-pipeline/dashboards-pipeline-routing.module';
import { SharedModule } from '@shared/shared.module';
import { PipelineEmptyComponent } from './pages/pipeline-empty/pipeline-empty.component';
import { PipelineListComponent } from './pages/pipeline-list/pipeline-list.component';
import { PipelineDetailComponent } from './pages/pipeline-detail/pipeline-detail.component';
import { PipelineEmptyAddComponent } from './pages/pipeline-empty/pipeline-empty-add/pipeline-empty-add.component';
import { ColorTwitterModule } from 'ngx-color/twitter';
import { PipelineDetailCardComponent } from './pages/pipeline-detail/pipeline-detail-card/pipeline-detail-card.component';
import { PipelineListCardComponent } from './pages/pipeline-list/pipeline-list-card/pipeline-list-card.component';
import { PipelineDetailListComponent } from './pages/pipeline-detail/pipeline-detail-list/pipeline-detail-list.component';
import { PipelineDetailAddComponent } from './pages/pipeline-detail/pipeline-detail-add/pipeline-detail-add.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayLeadPipelineComponent } from './components/overlay-lead-pipeline/overlay-lead-pipeline.component';
import { OverlayLeadPipelineService } from '@jala-modules/dashboards-pipeline/components/overlay-lead-pipeline/overlay-lead-pipeline.service';
import { DialogConfirmationComponent } from '@shared/components/dialog-confirmation/dialog-confirmation.component';
import { PipelineDetailEditComponent } from './pages/pipeline-detail/pipeline-detail-edit/pipeline-detail-edit/pipeline-detail-edit.component';

@NgModule( {
	providers: [ OverlayLeadPipelineService ],
	declarations: [
		PipelineEmptyComponent,
		PipelineListComponent,
		PipelineDetailComponent,
		PipelineEmptyAddComponent,
		PipelineDetailCardComponent,
		PipelineListCardComponent,
		PipelineDetailListComponent,
		PipelineDetailAddComponent,
		OverlayLeadPipelineComponent,
		PipelineDetailEditComponent,
	],
	imports: [
		CommonModule,
		DashboardsPipelineRoutingModule,
		SharedModule,
		ColorTwitterModule,
		ScrollingModule
	],
	entryComponents: [
		PipelineEmptyAddComponent,
		PipelineDetailAddComponent,
		DialogConfirmationComponent,
		PipelineDetailEditComponent,
	]
} )
export class DashboardsPipelineModule {
}
