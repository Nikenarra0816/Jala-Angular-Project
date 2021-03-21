import { ISalesTeam } from '@shared/models/sales-team.model';



export interface IChannelMetadata {
	statuses?: ( string )[] | null;
	mediaTypes?: ( string )[] | null;
	medias?: ( IChannelMetadataMedias )[] | null;
}

export interface IChannelMetadataMedias {
	id: number;
	name: string;
	type: string;
	sort: number;
	picture?: string | null;
}


export class Channel {

	constructor( public data: IChannel ) {
	}
}


export interface IChannel {
	id: number;
	name: string;
	detail: string;
	picture: string;
	periodStart: string;
	periodEnd?: null;
	redirectUrl?: string | null;
	uniqueCode: string;
	click: number;
	defaultChannel: boolean;
	status: string;
	modifiedBy?: number | null;
	modifiedAt?: string | null;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	media: {
		id: number;
	};
	campaign: {
		id: number;
		project: {
			id: number;
		};
	};
	form ?: IChannelForm | null;
	teams?: (ISalesTeam)[] | null;
	channelUrl?: string | null;
	clickRate: number;
	totalTeam: number;
	totalSales: number;
	totalLeads: number;
}

export interface IChannelForm {
	id: number;
	name: string;
	detail?: string | null;
	type: string;
	pageUrl?: string | null;
	modifiedBy?: number | null;
	modifiedAt: string;
	createdBy: number;
	createdAt: string;
	tenantId: number;
}
