export interface ISalesTeam {
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
	members?: ( ISalesTeamMembersEntity )[] | null;
	locations?: ( ISalesTeamLocationsEntity )[] | null;
}

export interface ISalesTeamMembersEntity {
	id: number;
	role: 'leader' | 'member';
	isActive: boolean;
	user: {
		id: number;
		name: string;
	};
}

export interface ISalesTeamLocationsEntity {
	id: number;
	name: string;
	alias: string;
	location: {
		id: number;
	};
}

export interface ISalesTeamSummary {
	id: number;
	name: string;
	total_sales: number;
	total_channel: number;
	total_lead: number;
	total_point: number;
}


export class SalesTeam {
	public summary: ISalesTeamSummary | null;

	constructor( public data: ISalesTeam ) {
	}

	get getIdAndName() {
		return {
			id: this.data.id,
			name: this.data.name
		};
	}

	get getMember(): ISalesTeamMembersEntity[] {
		return this.data.members.filter( value => value.role === 'member' );
	}

	get getLeader(): ISalesTeamMembersEntity {
		return this.data.members.find( value => value.role === 'leader' );
	}
}
