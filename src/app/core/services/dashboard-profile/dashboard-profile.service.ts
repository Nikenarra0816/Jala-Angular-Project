import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { IUser, User } from '@shared/models/user.model';
import { ApiService } from '../api.service';
import { UserProfileStoreService } from '@core/store/user-profile/user-profile-store.service';

export interface ICheckTest {
	pass: boolean;
	test?: ( TestEntity )[] | null;
}

export interface TestEntity {
	pass: boolean;
	message: string;
}

@Injectable()
export class DashboardProfileService {
	private url = this.apiService.getUrl + 'users';
	private urlProfile = this.apiService.getBareUrl + 'profile';

	constructor( private http: HttpClient, private apiService: ApiService, private store: UserProfileStoreService ) {
	}

	getUserById( id: string ) {
		return this.http.get<IUser>( this.url + `/${ id }` )
			.pipe(
				map( value => new User( value ) ),
				tap( value => this.store.user = value )
			);
	}

	getProfile() {
		return this.http.get<IUser>( this.urlProfile )
			.pipe(
				map( value => new User( value ) ),
				tap( value => this.store.user = value )
			);
	}

	//////////// For test phone and email /////////////
	testPhoneAndEmail( body: { phone?: string, email?: string } ) {
		return this.http.post<ICheckTest>( this.url + '?test=true', [ body ] );
	}

	///////////////////////////////////////////////////
	////////////        Update User       /////////////
	updateUserById( id: number, body ) {
		return this.http.put<IUser>( this.url + `/${ id }`, body )
			.pipe(
				map( value => new User( value ) ),
				// tap( value => this.store.user = value )
			);
	}
}
