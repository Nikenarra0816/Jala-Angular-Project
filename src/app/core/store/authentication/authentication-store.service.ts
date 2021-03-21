import { Injectable } from '@angular/core';
import { ITokenUser } from '../../../shared/models/user.model';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


export interface IAuthenticationState {
	isLoggedIn: boolean;
	user: ITokenUser;
}

@Injectable()
export class AuthenticationStoreService {

	private initState: IAuthenticationState = {
		isLoggedIn: false,
		user: undefined
	};

	constructor( private router: Router ) {
	}

	private readonly AUTHSTATE = new BehaviorSubject<IAuthenticationState>( this.initState );
	private readonly GUARDSTATE = new ReplaySubject<boolean>( 1 );

	set guardState( payload: boolean ) {
		this.GUARDSTATE.next( payload );
	}

	get authState(): IAuthenticationState {
		return this.AUTHSTATE.getValue();
	}

	set authState( payload: IAuthenticationState ) {
		this.AUTHSTATE.next( payload );
	}

	readonly authState$: Observable<IAuthenticationState> = this.AUTHSTATE.asObservable();

	login( payload: { idToken: string, refreshToken: string, accessToken: string } ) {
		this.authState = {
			isLoggedIn: true,
			user: new JwtHelperService().decodeToken( payload.idToken )
		};
		localStorage.setItem( 'idToken', payload.idToken );
		localStorage.setItem( 'refreshToken', payload.refreshToken );
		localStorage.setItem( 'accessToken', payload.accessToken );
		// this.router.navigate( [ '/dashboard' ] );
		this.guardState = true;
	}

	refreshToken( payload: { idToken: string, accessToken: string } ) {
		localStorage.setItem( 'idToken', payload.idToken );
		localStorage.setItem( 'accessToken', payload.accessToken );
		this.authState = {
			isLoggedIn: true,
			user: new JwtHelperService().decodeToken( payload.idToken )
		};
		this.guardState = true;
		// this.router.navigate( [ '/dashboard' ] );
	}

	logout() {
		this.authState = this.initState;
		this.guardState = false;
		localStorage.removeItem( 'idToken' );
		localStorage.removeItem( 'refreshToken' );
		localStorage.removeItem( 'accessToken' );
		// this.router.navigate( [ '/users/login' ] );
	}

	get guardState$(): Observable<boolean> {
		return this.GUARDSTATE.asObservable()
			.pipe(
				first(),
				take( 1 )
			);
	}
}
