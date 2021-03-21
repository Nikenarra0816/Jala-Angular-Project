/*export interface Role {
	client: RolePage;
	admin: RolePage;
	sales: RolePage;
}*/

interface RolePermission {
	read: boolean;
	edit: boolean;
	add: boolean;
}

export interface RolePage {
	salesTeam: RolePermission;
	salesOfficer: RolePermission;
	project: RolePermission;
	campaign: RolePermission;
	channel: RolePermission;
	form: RolePermission;
	lead: RolePermission;
	allLead: RolePermission;
	pipeline: RolePermission;
	product: RolePermission;
	customer: RolePermission;
}

/*export const ROLE: Role = {
	client: {
		salesTeam: {
			add: true,
			edit: true,
			read: true
		},
		salesOfficer: {
			add: true,
			edit: true,
			read: true
		},
		project: {
			add: true,
			edit: true,
			read: true
		},
		campaign: {
			add: true,
			edit: true,
			read: true
		},
		channel: {
			add: true,
			edit: true,
			read: true
		},
		form: {
			add: true,
			edit: true,
			read: true
		},
		lead: {
			add: true,
			edit: true,
			read: true
		},
		allLead: {
			add: true,
			edit: true,
			read: true
		},
		pipeline: {
			add: true,
			edit: true,
			read: true
		},
		product: {
			add: true,
			edit: true,
			read: true
		}
	},
	admin: {
		salesTeam: {
			add: true,
			edit: true,
			read: true
		},
		salesOfficer: {
			add: true,
			edit: true,
			read: true
		},
		project: {
			add: false,
			edit: true,
			read: true
		},
		campaign: {
			add: true,
			edit: true,
			read: true
		},
		channel: {
			add: true,
			edit: true,
			read: true
		},
		form: {
			add: true,
			edit: true,
			read: true
		},
		lead: {
			add: true,
			edit: true,
			read: true
		},
		allLead: {
			add: true,
			edit: true,
			read: true
		},
		pipeline: {
			add: false,
			edit: false,
			read: false
		},
		product: {
			add: true,
			edit: true,
			read: true
		}
	},
	sales: {
		salesTeam: {
			add: false,
			edit: true,
			read: true
		},
		salesOfficer: {
			add: true,
			edit: true,
			read: true
		},
		project: {
			add: false,
			edit: false,
			read: true
		},
		campaign: {
			add: false,
			edit: false,
			read: true
		},
		channel: {
			add: false,
			edit: false,
			read: true
		},
		form: {
			add: false,
			edit: false,
			read: true
		},
		lead: {
			add: false,
			edit: false,
			read: true
		},
		allLead: {
			add: true,
			edit: true,
			read: true
		},
		pipeline: {
			add: false,
			edit: false,
			read: false
		},
		product: {
			add: false,
			edit: false,
			read: true
		}
	}
};*/
