export interface IForm {
	id: number;
	name: string;
	detail?: null;
	type: string;
	pageUrl?: null;
	modifiedBy: number;
	modifiedAt: string;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	channels?: ( IFormChannelsEntity )[] | null;
	fields?: ( IFormFieldsEntity )[] | null;
	script: string;
}

export interface IFormChannelsEntity {
	id: number;
	name: string;
	detail: string;
	picture: string;
	periodStart: string;
	periodEnd: string;
	redirectUrl: string;
	uniqueCode: string;
	click: number;
	defaultChannel: boolean;
	status: string;
	modifiedBy: number;
	modifiedAt: string;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	campaign: {
		id: number;
	};
	media: {
		id: number;
	};
	form: {
		id: number;
	};
}

export interface IFormFieldsEntity {
	id: number;
	name: string;
	type: string;
	mandatory: boolean;
	displayedAs: string;
	alias: string;
	parameters?: null;
}

export class Form {
	constructor( public data: IForm ) {
	}
}

export interface IFormMetadata {
	types?: ( string )[] | null;
	fields?: ( IFormFieldsEntity )[] | null;
}
