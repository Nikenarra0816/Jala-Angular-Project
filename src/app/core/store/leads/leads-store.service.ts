import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILead } from '@shared/models/lead.model';
import { filter, switchMap, tap } from 'rxjs/operators';
import { format } from 'date-fns';
import { IUser } from '@shared/models/user.model';

@Injectable()
export class LeadsStoreService {

	constructor( private storage: StorageMap ) {
	}

	isReady$ = new BehaviorSubject( false );
	// tslint:disable-next-line:variable-name
	private _isNeedUpdate = new BehaviorSubject<any>( undefined );

	// tslint:disable-next-line:variable-name
	private _leadTemp = new BehaviorSubject<ILead[]>( [] );

	get isReady() {
		return this.isReady$.asObservable();
	}

	get isNeedUpdate$() {
		return this._isNeedUpdate.asObservable();
	}

	set isNeedUpdate( val ) {
		this._isNeedUpdate.next( val );
	}

	set leadTemp( val: ILead[] ) {
		const leads = this._leadTemp.getValue();
		this._leadTemp.next( [ ...leads, ...val ] );
	}

	writeLeadTempToStorage() {
		const leads = this._leadTemp.getValue();
		return this.writeStorage( leads )
			.pipe( tap( () => this._leadTemp.next( [] ) ) );
	}

	hasStorage() {
		return this.storage.has( 'lead' );
	}

	updateStorage( newLeads: ILead[] ) {
		return this.storage.get( 'lead' )
			.pipe(
				switchMap( ( oldLeads: ILead[] ) => {
					// Update or push new
					const newValue = oldLeads;
					for ( const lead of newLeads ) {
						const index = newValue.findIndex( value1 => value1.uuid === lead.uuid );
						if ( index === -1 ) {
							newValue.push( lead );
						} else {
							newValue[index] = lead;
						}
					}

					return this.writeStorage( newValue );
				} ),
				tap( () =>
					localStorage.setItem( 'lastLeadsUpdate', format( new Date(), 'yyyy-MM-dd HH:mm:ss' ) )
				)
			)
			;
	}

	writeStorage( value: ILead[] ): Observable<any> {
		this.isReady$.next( false );
		return this.storage.set( 'lead', value )
			.pipe(
				tap( () => {
					localStorage.setItem( 'lastLeadsUpdate', format( new Date(), 'yyyy-MM-dd HH:mm:ss' ) );
					this.isReady$.next( true );
				} )
			);
	}

	getAllValue() {
		return this.isReady$
			.pipe(
				filter( value => value ),
				switchMap( () => this.storage.get<IUser[]>( 'lead' ) )
			);
	}

	deleteStorage() {
		localStorage.removeItem( 'lastLeadsUpdate' );
		this.isReady$.next( false );
		return this.storage.delete( 'lead' );
	}
}
