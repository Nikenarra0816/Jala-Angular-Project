export interface ITutorCategory {
	status: number;
	values?: (ITutorCategoryValues)[] | null;
}
export interface ITutorCategoryValues {
	id: number;
	detail: string;
	create_at: string;
	create_by: number;
	update_at: string;
	update_by?: null;
	status: number;
	urutan: number;
	tutorial_id: number;
}
