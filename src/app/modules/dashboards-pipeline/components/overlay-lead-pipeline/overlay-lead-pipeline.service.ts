import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Lead } from '@shared/models/lead.model';
import { IColorUsed } from '@core/services/dashboard-pipeline/dashboard-pipeline.service';

export interface IOverlayConfig {
	lead: Lead;
	color: IColorUsed;
}

@Injectable()
export class OverlayLeadPipelineService {

	constructor() {
	}

	//////////// OVERLAY /////////////////
	// tslint:disable-next-line:variable-name
	private readonly _overlayValue = new Subject<IOverlayConfig>();

	public readonly overlayValue$ = this._overlayValue.asObservable();

	openOverlay( val: IOverlayConfig ) {
		this._overlayValue.next( val );
	}

	///////////////////////////////////////
}
