/*
export interface IProject {
	id: number;
	name: string;
	detail: string;
	status: string;
	periodStart: string;
	periodEnd: string;
	modifiedBy: number;
	modifiedAt: string;
	createdBy: number;
	createdAt: string;
	tenantId: number;
}
*/

export interface IProjectSummary {
	id: number;
	name: string;
	total_campaign: number;
	total_channel: number;
	total_product: number;
	total_lead: number;
	total_customer: number;
}


export class Project {
	summary: IProjectSummary | null;

	constructor( public data: IProject ) {
	}
}
/*

export interface IProjectMetadata {
	statuses?: ( string )[] | null;
	categories?: ( IProjectMetadataCategoriesEntity )[] | null;
}

export interface IProjectMetadataCategoriesEntity {
	id: number;
	name: string;
	sort: number;
	color: string;
	picture: string;
	availability: string;
	statuses?: ( IProjectMetadataStatusesEntity )[] | null;
	enableReminder: boolean;
}

export interface IProjectMetadataStatusesEntity {
	id: number;
	tenantCategory: string;
	name: string;
	detail: string;
	sort: number;
	point: number;
	color: string;
	category: {
		id: number;
	};
}
*/


export interface IProjectMetadata {
	statuses?: (string)[] | null;
	categories?: (IProjectMetadataCategoriesEntity)[] | null;
	custom_status?: (IProjectMetadataCustomStatusEntity)[] | null;
}
export interface IProjectMetadataCategoriesEntity {
	id: number;
	name: string;
	sort: number;
	color: string;
	picture: string;
	isActive: boolean;
	availability: string;
	statuses?: (IProjectMetadataStatusesEntity)[] | null;
	enableReminder: boolean;
}
export interface IProjectMetadataStatusesEntity {
	id: number;
	tenantCategory: string;
	isActive: boolean;
	name: string;
	detail: string;
	sort: number;
	point: number;
	color: string;
	category: {
		id: number;
	};
}

export interface IProjectMetadataCustomStatusEntity {
	id: number;
	name: string;
	color: string;
	statuses?: (IProjectMetadataStatusesEntity1)[] | null;
	enableReminder: boolean;
}
export interface IProjectMetadataStatusesEntity1 {
	point: number;
	name: string;
	detail: string;
	color: string;
}



export interface IProject {
	id: number;
	name: string;
	detail: string;
	periodStart: string;
	periodEnd?: string | null;
	status: string;
	modifiedBy?: number | null;
	modifiedAt?: string | null;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	leadStatuses?: (IProjectLeadStatusesEntity)[] | null;
	products?: (IProjectProductsEntity)[] | null;
}
export interface IProjectLeadStatusesEntity {
	id: number;
	modifiedBy?: number | null;
	modifiedAt?: string | null;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	name: string;
	detail: string;
	sort: number;
	point: number;
	color: string;
	project: {
		id: number;
	};
	category: {
		id: number;
	};
}
export interface IProjectProductsEntity {
	id: number;
	name: string;
	sort: number;
	price: number;
	minBookingPrice?: number | null;
	isActive: boolean;
	detail: string;
	modifiedBy?: number | null;
	modifiedAt?: string | null;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	project: {
		id: number;
	};
}
