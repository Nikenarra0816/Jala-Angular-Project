import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@core/services/authentication/authentication.service';
import {FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'app-forgot',
	templateUrl: './forgot.component.html',
	styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

	constructor(
		private http: AuthenticationService,
		private toastr: ToastrService,
		private router: Router,
		private route: ActivatedRoute
	) {
	}

	email = new FormControl(null, Validators.required);

	submit() {
		if (this.email.valid) {
			this.http.forgotPassword(this.email.value)
				.subscribe(() => {
					this.toastr.success('Password Recovery has been sent to Your email', 'Password Recovery', {timeOut: 2000});
					setTimeout(() => {
						this.router.navigate([`../change-password`], {
							queryParams: {username: this.email.value},
							relativeTo: this.route
						});
					}, 2500);
				});
		}
	}

	ngOnInit() {
	}

}
