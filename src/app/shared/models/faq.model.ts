export interface IFaq {
	status: number;
	values?: ( IFaqValues )[] | null;
}

export interface IFaqValues {
	id: number;
	frequently: string;
	question: string;
	create_at: string;
	create_by: number;
	update_at: string;
	update_by?: null;
	status: number;
	urutan: number;
	category: number;
}
