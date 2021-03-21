import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '@shared/models/user.model';

@Injectable()
export class UserProfileStoreService {

	constructor() {
	}

	private readonly USER = new BehaviorSubject<User>( null );

	/*get user(): User {
		return this.USER.getValue();
	}*/

	set user( val: User ) {
		this.USER.next( val );
	}

	get user() {
		return this.USER.getValue();
	}

	readonly user$ = this.USER.asObservable();
}
