export interface ITicket {
	status: number;
	values?: (ITicketValuesEntity)[] | null;
}
export interface ITicketValuesEntity {
	id: number;
	category: number;
	title: string;
	description: string;
	status: number;
	user_id: number;
	create_at: string;
	update_at: string;
}
