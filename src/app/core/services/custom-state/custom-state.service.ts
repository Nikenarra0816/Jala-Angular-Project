import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface IObj {
	[ key: string ]: number;
}

@Injectable()
export class CustomStateService {

	constructor() {
	}

	// tslint:disable-next-line:variable-name
	private _filter = new BehaviorSubject<IObj>( null );

	set setFilter( value: IObj ) {
		this._filter.next( value );
	}

	get getFilter(): Observable<IObj> {
		return this._filter.asObservable();
	}
}

