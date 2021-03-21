import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {IToken} from '@shared/models/user.model';
import {AuthenticationStoreService} from '@core/store/authentication/authentication-store.service';
import {ApiService} from '@core/services/api.service';

@Injectable()
export class AuthenticationService {

	constructor(
		private http: HttpClient,
		private authStore: AuthenticationStoreService,
		private apiService: ApiService
	) {
	}

	private url = this.apiService.getBareUrl + 'auth';

	login(payload: any) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		};
		const formData = new HttpParams()
			.set('username', payload.email)
			.set('password', payload.password)
			.set('grant_type', 'password');

		return this.http.post<IToken>(this.url + '/token', formData.toString(), httpOptions)
			.pipe(
				tap(value => this.authStore.login({
					idToken: value.AuthenticationResult.IdToken,
					accessToken: value.AuthenticationResult.AccessToken,
					refreshToken: value.AuthenticationResult.RefreshToken
				}))
			);
	}

	logout() {
		return of({logout: true})
			.pipe(
				tap(() => this.authStore.logout())
			);
	}

	refreshToken(): Observable<IToken> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		};

		const formData = new HttpParams()
			.set('grant_type', 'refresh_token')
			.set('refresh_token', localStorage.getItem('refreshToken'));

		return this.http.post<IToken>(this.url + '/token', formData.toString(), httpOptions)
			.pipe(
				tap(value => this.authStore.refreshToken({
					idToken: value.AuthenticationResult.IdToken,
					accessToken: value.AuthenticationResult.AccessToken
				}))
			);
	}

	forcePassword(body: { username: string, password: string, code: string }) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		};
		const formData = new HttpParams()
			.set('username', body.username)
			.set('password', body.password)
			.set('code', body.code)
			.set('grant_type', 'force_password');

		return this.http.post<IToken>(this.url + '/token', formData.toString(), httpOptions)
			.pipe(
				tap(value => this.authStore.login({
					idToken: value.AuthenticationResult.IdToken,
					accessToken: value.AuthenticationResult.AccessToken,
					refreshToken: value.AuthenticationResult.RefreshToken
				}))
			);
	}

	forgotPassword(email: string) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		};
		const formData = new HttpParams()
			.set('username', email);

		return this.http.post<any>(this.url + '/forgot', formData.toString(), httpOptions);
	}

	forgetPassword(body: { username: string, password: string, code: string }) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		};
		const formData = new HttpParams()
			.set('username', body.username)
			.set('password', body.password)
			.set('code', body.code)
			.set('grant_type', 'forgot_password');

		return this.http.post<IToken>(this.url + '/token', formData.toString(), httpOptions)
			.pipe(
				tap(value => this.authStore.login({
					idToken: value.AuthenticationResult.IdToken,
					accessToken: value.AuthenticationResult.AccessToken,
					refreshToken: value.AuthenticationResult.RefreshToken
				}))
			);
	}

	changePassword(body: { oldPass: string, newPass: string }) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		};
		const formData = new HttpParams()
			.set('password_new', body.newPass)
			.set('password_old', body.oldPass)
			.set('access_token', localStorage.getItem('accessToken'));

		return this.http.post<IToken>(this.url + '/change_password', formData.toString(), httpOptions);
	}
}
