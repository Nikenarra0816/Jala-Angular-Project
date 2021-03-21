/*export interface ISalesOfficer {
	id: number;
	name: string;
	email: string;
	phone: string;
	role: string;
	status: string;
	address: string;
	pic?: null;
	company?: null;
	picture?: null;
	cognitoId: string;
	timezone: number;
	modifiedBy: number;
	modifiedAt: string;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	teamMembers?: ( ISalesOfficerTeamMembersEntity )[] | null;
}

export interface ISalesOfficerTeamMembersEntity {
	id: number;
	role: string;
	isActive: boolean;
	modifiedBy: number;
	modifiedAt: string;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	team: {
		id: number;
	};
	user: {
		id: number;
	};
}*/

export interface ISalesOfficer {
	id: number;
	name: string;
	email: string;
	phone: string;
	role: string;
	status: string;
	isOnline: boolean;
	address: string;
	gender: string;
	pic?: null;
	company?: null;
	picture?: null;
	cognitoId: string;
	timezone: number;
	reminder: number;
	modifiedBy: number;
	modifiedAt: string;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	teams?: ( ISalesOfficerTeamsEntity )[] | null;
}

export interface ISalesOfficerTeamsEntity {
	id: number;
	name: string;
}

export interface ISalesOfficerSummary {
	id: number;
	name: string;
	total_team: number;
	total_channel: number;
	total_lead: number;
	total_point: number;
}


export class SalesOfficer {
	public summary: ISalesOfficerSummary;

	constructor( public data: ISalesOfficer ) {
	}
}

export interface ISalesOfficerMetadata {
	roles?: (string)[] | null;
	statuses?: (string)[] | null;
}


/*export interface ISalesOfficerMember {
	id: number;
	role: string;
	isActive: boolean;
	modifiedBy: number;
	modifiedAt: string;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	user: {
		id: number;
	};
	team: {
		id: number;
		name: string;
		description: string;
		address: string;
		email: string;
		phone: string;
		isActive: boolean;
		isGlobalCoverage: boolean;
		modifiedBy: number;
		modifiedAt: string;
		createdBy: number;
		createdAt: string;
		tenantId: number;
	};
}*/
