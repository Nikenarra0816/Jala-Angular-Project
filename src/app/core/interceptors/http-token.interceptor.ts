import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, retry, switchMap, take, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>( null );

	get refreshToken$() {
		return this.refreshTokenSubject.asObservable();
	}

	set refreshToken( value: string ) {
		this.refreshTokenSubject.next( value );
	}

	constructor(
		private authService: AuthenticationService,
		private router: Router,
		private toastrService: ToastrService,
		private spinner: NgxSpinnerService
	) {
	}


	intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
		const token = localStorage.getItem( 'idToken' );
		/*if ( req.url.startsWith( 'https://api.dev.jala.ai/auth/' ) ) {
			headerModified = req.clone();
		} else {
			headerModified = req.clone( {
				setHeaders: { Authorization: `Bearer ${ token }` },
			} );
		}*/
		if ( token ) {
			req = this.addToken( req, token );
		}
		return next.handle( req )
			.pipe(
				retry( 2 ),
				catchError( err => {
					if ( err instanceof HttpErrorResponse && err.status === 0 ) {
						this.toastrService.error( `Internet Error`, `Error Code ${ err.status }` );
						this.spinner.hide();
						return throwError( err );
					} else if ( err instanceof HttpErrorResponse && err.status === 400 ) {
						if ( err.error.messageDetail ) {
							this.toastrService.error( `${ err.error.messageDetail.message }`, `Error Code ${ err.status }` );
							if ( err.error.messageDetail.reasons.length !== 0 ) {
								err.error.messageDetail.reasons.forEach( val => {
									this.toastrService.error( `${ val }` );
								} );
							}
						} else {
							this.toastrService.error( 'Error', `Error Code ${ err.status }` );
						}
						this.spinner.hide();
						return throwError( err );
					} else if ( err instanceof HttpErrorResponse && err.status === 401 ) {
						console.log( 'error 401' );
						this.spinner.hide();
						return this.handle401Error( req, next );
					} else if ( err instanceof HttpErrorResponse && err.status === 404 ) {
						this.toastrService.error( `${ err.error.message }`, `Error Code ${ err.status }` );
						this.spinner.hide();
						return throwError( err );
					} else if ( err instanceof HttpErrorResponse && err.status === 500 ) {
						this.toastrService.error( `Internal Server Error`, `Error Code ${ err.status }` );
						this.spinner.hide();
						return throwError( err );
					} else {
						this.toastrService.error( err.error.message, `Error Code ${ err.status }` );
						this.spinner.hide();
						return throwError( err );
					}
				} )
			);
	}

	private addToken( req: HttpRequest<any>, token: string ) {
		let headerModified;
		if ( req.url.startsWith( 'https://api.dev.jala.ai/auth/' ) ) {
			headerModified = req.clone();
		} else {
			headerModified = req.clone( {
				setHeaders: { Authorization: `Bearer ${ token }` },
			} );
		}
		return headerModified;
	}

	private handle401Error( request: HttpRequest<any>, next: HttpHandler ) {
		if ( this.isRefreshing ) {
			return this.refreshToken$
				.pipe(
					filter( token => token !== null ),
					take( 1 ),
					switchMap( jwt => {
						return next.handle( this.addToken( request, jwt ) );
					} )
				);
		} else {
			this.isRefreshing = true;
			this.refreshToken = null;

			return this.authService.refreshToken()
				.pipe(
					switchMap( token => {
						this.refreshToken = token.AuthenticationResult.IdToken;
						return next.handle( this.addToken( request, token.AuthenticationResult.IdToken ) );
					} ),
					finalize( () => {
						this.isRefreshing = false;
					} ),
					catchError( err => {
						this.authService.logout().pipe( tap( () => this.router.navigateByUrl( 'users' ) ) );
						return throwError( err );
					} )
				);
		}
	}
}
