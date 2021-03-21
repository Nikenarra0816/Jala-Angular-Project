import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
	IOverlayConfig,
	OverlayLeadPipelineService
} from '@jala-modules/dashboards-pipeline/components/overlay-lead-pipeline/overlay-lead-pipeline.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { tap } from 'rxjs/operators';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { ILeadJourney } from '@shared/models/lead.model';

@Component( {
	selector: 'app-overlay-lead-pipeline',
	templateUrl: './overlay-lead-pipeline.component.html',
	styleUrls: [ './overlay-lead-pipeline.component.scss' ]
} )
export class OverlayLeadPipelineComponent implements OnInit, OnDestroy {

	isOpen = false;
	dataLead: Observable<IOverlayConfig>;
	dataJourney: Observable<ILeadJourney[]>;

	constructor(
		private overlay: OverlayLeadPipelineService,
		private http: DashboardProjectService
	) {
		this.dataLead = this.overlay.overlayValue$
			.pipe(
				untilDestroyed( this ),
				tap( ( value ) => {
					if ( !this.isOpen ) {
						this.open();
						this.dataJourney = this.http.getLeadsJourney( value.lead.data.uuid )
							.pipe( untilDestroyed( this ) );
					}
				} )
			);
	}

	open() {
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
	}

}
