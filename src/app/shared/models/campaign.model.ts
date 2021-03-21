export interface ICampaign {
	id: number;
	name: string;
	detail: string;
	picture: string;
	periodStart?: string;
	periodEnd?: string;
	status: string;
	modifiedBy?: null;
	modifiedAt: string;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	project: {
		id: number;
	};
}

export interface ICampaignMetadata {
	statuses: [
		'running',
		'hold',
		'stop'
	];
}

export interface ICampaignSummary {
	id: number;
	name: string;
	total_channel: number;
	total_lead: number;
}


export class Campaign {
	summary: ICampaignSummary | null;

	constructor( public data: ICampaign ) {
	}

	get getCampaignId() {
		return { id: this.data.id };
	}
}
