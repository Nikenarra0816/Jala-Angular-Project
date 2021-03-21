export interface ILeadsStatusCategory {
	categories?: ( ILeadStatuses )[] | null;
}

export interface ILeadStatuses {
	id: number;
	name: string;
	sort: number;
	color: string;
	availability: string;
	statuses?: ( ILeadStatusesEntity )[] | null;
}

export interface ILeadStatusesEntity {
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

export interface IStatus {
	id: number;
	modifiedBy: number;
	modifiedAt: string;
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
	category: IStatusCategory;
}
export interface IStatusCategory {
	id: number;
	name: string;
	sort: number;
	color: string;
	picture: string;
	availability: string;
	enableReminder: boolean;
}


export class LeadStatus {

	constructor( public data: ILeadStatuses ) {
	}

	get getStatuses(): ILeadStatusesEntity[] {
		return this.data.statuses.reduce( ( acc, cur ) => {
			cur.color = this.data.color;
			return [ ...acc, cur ];
		}, [] );
	}

	get getStatusesSettingProject() {
		return this.data.statuses.reduce( ( acc, cur ) => {
			const obj = {
				id: cur.id,
				name: cur.name,
				point: cur.point,
				color: this.data.color,
				category: {
					id: cur.category.id
				}
			};
			return [ ...acc, obj ];
		}, [] );
	}
	get getStatusesEditProject() {
		return this.data.statuses.reduce( ( acc, cur ) => {
			const obj = {
				id: undefined,
				name: cur.name,
				point: cur.point,
				color: this.data.color,
				category: {
					id: cur.category.id
				}
			};
			return [ ...acc, obj ];
		}, [] );
	}
}
