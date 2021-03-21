import { Component, Input } from '@angular/core';

@Component( {
	selector: 'app-loader-spinner-v2',
	templateUrl: './loader-spinner-v2.component.html',
	styleUrls: [ './loader-spinner-v2.component.scss' ]
} )
export class LoaderSpinnerV2Component {
	@Input( 'backgroundColor' ) set bgColor( val: string ) {
		this.backgroundColor = val;
	}
	@Input( 'height' ) set heightSpinner( val: string ) {
		this.height = val;
	}

	// tslint:disable-next-line:variable-name
	private _backgroundColor = 'transparent';
	// tslint:disable-next-line:variable-name
	private _height = '30rem';

	public set backgroundColor( val ) {
		this._backgroundColor = val;
	}

	public get backgroundColor() {
		return this._backgroundColor;
	}

	public set height( val ) {
		this._height = val;
	}

	public get height() {
		return this._height;
	}

	constructor() {
	}

}
