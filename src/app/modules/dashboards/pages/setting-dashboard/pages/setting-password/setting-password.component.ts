import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MustMatch} from '@shared/validators/matcherControl';
import {AuthenticationService} from '@core/services/authentication/authentication.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
	selector: 'app-setting-password',
	templateUrl: './setting-password.component.html',
	styleUrls: ['./setting-password.component.scss']
})
export class SettingPasswordComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private http: AuthenticationService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService,
		private router: Router
	) {
	}

	form = this.fb.group({
		curPassword: ['', [Validators.required]],
		newPassword: ['', [Validators.required, Validators.minLength(8)]],
		retypePassword: ['', [Validators.required]],
	}, {validators: MustMatch('newPassword', 'retypePassword')});

	submit(value) {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			console.log('cok invalid');
			return;
		}

		this.spinner.show();
		const body = {
			oldPass: value.curPassword,
			newPass: value.newPassword
		};
		this.http.changePassword(body)
			.subscribe(() => {
				this.spinner.hide();
				this.toastr.success('Your password has been successfully changed', 'Password Update Success');
			}, error => {
				this.spinner.hide();
				this.toastr.error('Sorry your password can’t be changed please contact us or go to help', 'Password Update Error');
			});
	}

	forgetPass() {
		this.http.logout()
			.subscribe(() => {
				this.router.navigateByUrl('/users/forgot');
			});
	}

	ngOnInit() {
	}

}
