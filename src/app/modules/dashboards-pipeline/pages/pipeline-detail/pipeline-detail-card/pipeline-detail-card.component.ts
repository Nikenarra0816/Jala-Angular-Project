import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Lead } from '@shared/models/lead.model';
import { IColorUsed } from '@core/services/dashboard-pipeline/dashboard-pipeline.service';
import { OverlayLeadPipelineService } from '@jala-modules/dashboards-pipeline/components/overlay-lead-pipeline/overlay-lead-pipeline.service';

@Component( {
	selector: 'app-pipeline-detail-card',
	templateUrl: './pipeline-detail-card.component.html',
	styleUrls: [ './pipeline-detail-card.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class PipelineDetailCardComponent implements OnChanges {
	@Input() dataParent: Lead;
	@Input() color: IColorUsed;

	constructor( private overlay: OverlayLeadPipelineService ) {
	}

	cardClicked() {
		this.overlay.openOverlay( { lead: this.dataParent, color: this.color } );
	}

	ngOnChanges( changes: SimpleChanges ): void {
	}

}
