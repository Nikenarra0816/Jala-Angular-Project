export interface ICoverage {
	id: number;
	name: string;
	alias: string;
	location: ( ICoverageLocation ) | null;

}

export interface ICoverageLocation {
	id: number;
}
