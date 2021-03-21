import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import { tap } from 'rxjs/operators';

@Component( {
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private http: AuthenticationService,
		private spinner: NgxSpinnerService,
		private router: Router,
		private route: ActivatedRoute,
		private toastr: ToastrService,
	) {
	}

	loginForm = this.fb.group( {
		email: [ '', [ Validators.email, Validators.required ] ],
		password: [ '', [ Validators.required ] ]
	} );

	submitForm() {
		if ( this.loginForm.valid ) {
			this.spinner.show();
			this.http.login( this.loginForm.value )
				.pipe(
					tap( () => this.spinner.hide() )
				)
				.subscribe(
					() => {
						this.router.navigateByUrl( 'dashboard' );
					},
					( error: HttpErrorResponse ) => {
						console.log( error.error );
						if ( error.error.error_id === 41 ) {
							console.log('error catch');
							this.toastr.warning( 'Please change Your password before continue ', 'Change Password Required', {timeOut: 2000} );
							setTimeout(() => {
								this.router.navigate([`../change-password`], {
									queryParams: {username: this.loginForm.value.email, code: error.error.code},
									relativeTo: this.route
								});
							}, 2500);
						} else {
							this.toastr.error( error.error.message, 'Login Failed' );
							console.log('error catch else');
						}
					}
				);
		}
	}

	ngOnInit() {
	}

}
