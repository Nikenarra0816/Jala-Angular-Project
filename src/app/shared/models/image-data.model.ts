export interface IImageData {
	field: string;
	origFile: string;
	status: boolean;
	newFile: string;
	fullPath: string;
}

export class ImageData {

	constructor( public payload: IImageData ) {
	}
}
