import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '@core/services/authentication/authentication.service';
import {MustMatch} from '@shared/validators/matcherControl';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, query, style, transition, trigger} from '@angular/animations';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss'],
	animations: [
		trigger('routeAnimations', [
			transition('* => *', [
				// Intinya query iku sequence
				query(
					':enter, :leave',
					[style({width: '100%', display: 'block', transformOrigin: 'top'})],
					{optional: true}
				),
				query(':leave',
					[style({
						opacity: 1,
						visibility: 'visible',
						transform: 'translateX(0)',
						position: 'absolute',
						left: 0,
						top: 0
					})],
					{optional: true}),
				query(':enter',
					[style({opacity: 0, visibility: 'hidden', transform: 'translateX(100%)'})],
					{optional: true}),
				query(
					':leave',
					// here we apply a style and use the animate function to apply the style over 0.3 seconds
					[animate('.3s', style({opacity: 0, transform: 'translateX(-100%)'}))],
					{optional: true}
				),
				query(
					':enter',
					[animate('.3s', style({opacity: 1, visibility: 'visible', transform: 'translateX(0)'}))],
					{optional: true}
				)
			])
		])
	]
})
export class ChangePasswordComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private http: AuthenticationService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService,
		private router: Router,
		private route: ActivatedRoute
	) {
	}

	code = this.fb.control('', [Validators.required]);
	step = 1;
	formPass = this.fb.group({
		password: ['', Validators.required],
		retype: ['', Validators.required]
	}, {validators: MustMatch('password', 'retype')});

	next() {
		if (this.code.valid) {
			this.step = 2;
		} else {
			this.code.markAsTouched();
		}
	}

	back() {
		this.step = 1;
	}

	submit() {
		if (this.formPass.valid) {
			this.spinner.show();
			const code = this.route.snapshot.queryParamMap.get('code');
			const username = this.route.snapshot.queryParamMap.get('username');
			if (code) {
				this.http.forcePassword({username, code: this.code.value, password: this.formPass.get('password').value})
					.subscribe(
						() => {
							this.spinner.hide();
							this.router.navigateByUrl('dashboard');
						},
						() => {
							this.toastr.error('Something Wrong, Please Contact Us', 'Change Password Failed');
							this.spinner.hide();
						}
					);
			} else {
				this.http.forgetPassword({username, code: this.code.value, password: this.formPass.get('password').value})
					.subscribe(
						() => {
							this.spinner.hide();
							this.router.navigateByUrl('dashboard');
						},
						() => {
							this.toastr.error('Something Wrong, Please Contact Us', 'Change Password Failed');
							this.spinner.hide();
						}
					);
			}
		}
	}

	ngOnInit() {
		const code = this.route.snapshot.queryParamMap.get('code');
		if (code) {
			this.code.patchValue(code);
			this.next();
		}
	}

}
