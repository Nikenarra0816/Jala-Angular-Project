import { Lead } from '@shared/models/lead.model';

export interface IPipeline {
	id: number;
	name: string;
	color: string;
	sort: number;
	status: string;
	modifiedBy: string;
	modifiedAt: string;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	totalLeads: number;
	filters: IPipelineFilters;
}

export interface IPipelineFilters {
	projects?: ( IPipelineProjectsEntity )[] | null;
}

export interface IPipelineProjectsEntity {
	id: number;
	name: string;
}

export interface IPipelineList {
	id: number;
	name: string;
	sort: number;
	modifiedBy?: null;
	modifiedAt?: null;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	pipeline: {
		id: number;
	};
	filters: IPipelineListFilters;
}

export interface IPipelineListFilters {
	statuses?: ( IPipelineListStatusesEntity )[] | null;
}

export interface IPipelineListStatusesEntity {
	id: number;
	name: string;
	project: {
		id: number;
	};
}

export interface IPipelineListAndLead {
	pipeline: IPipelineList;
	lead: Lead[];
}
