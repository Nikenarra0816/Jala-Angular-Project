export interface ITutorial {

	status: number;
	values: ITutorialValues[];

}

export interface ITutorialValues {

	id: number;
	name: string;
	detail: string;
	picture: string;
	urutan: number;
	category: number;

}

export interface ITutorialGambar {
	status: number;
	values?: (ITutorialGambarValues)[] | null;
}
export interface ITutorialGambarValues {
	id: number;
	detail: string;
	picture: string;
	create_at: string;
	create_by: number;
	update_at: string;
	update_by?: null;
	status: number;
	urutan: number;
	tutorial_content_id: number;
}

export interface ITutorialVideo {
	status: number;
	values?: (ITutorialVideoValues)[] | null;
}
export interface ITutorialVideoValues {
	id: number;
	detail: string;
	link: string;
	create_at: string;
	create_by: number;
	update_at: string;
	update_by?: null;
	status: number;
	urutan: number;
	tutorial_content_id: number;
}
