import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Campaign } from '@shared/models/campaign.model';
import { CustomStateService } from '@core/services/custom-state/custom-state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component( {
	selector: 'app-project-campaign-grid-view',
	templateUrl: './project-campaign-grid-view.component.html',
	styleUrls: [ './project-campaign-grid-view.component.scss' ]
} )
export class ProjectCampaignGridViewComponent implements OnInit {
	@Input() dataCampaign: Campaign[];
	@Output() editClicked = new EventEmitter<Campaign>();

	constructor(private filterLead: CustomStateService, private router: Router, private route: ActivatedRoute) {
	}

	jumpToLead( value ) {
		this.filterLead.setFilter = { getCampaign: value };
		this.router.navigate( [ '../', 'lead' ], { relativeTo: this.route } );
	}

	edit( value: Campaign ) {
		this.editClicked.emit( value );
	}

	ngOnInit() {
	}

}
