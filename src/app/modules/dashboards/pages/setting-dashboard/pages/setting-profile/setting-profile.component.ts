import { ToastrService } from 'ngx-toastr';
import { DashboardProfileService } from '@core/services/dashboard-profile/dashboard-profile.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IUser, User } from '@shared/models/user.model';
import { UserProfileStoreService } from '@core/store/user-profile/user-profile-store.service';
import { checkEmailValidator, checkPhoneValidator } from '@shared/validators/asyncValidator';
import { ApiUploadService } from '@core/services/api-upload.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


@Component( {
	selector: 'app-setting-profile',
	templateUrl: './setting-profile.component.html',
	styleUrls: [ './setting-profile.component.scss' ]
} )
export class SettingProfileComponent implements OnInit, OnDestroy {

	constructor(
		private fb: FormBuilder,
		// private store: AuthenticationStoreService,
		private store: UserProfileStoreService,
		private http: DashboardProfileService,
		private http2: ApiUploadService,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private router: Router ) {
	}

	private initialValue: User;
	picture: string;
	newPicture: File;
	form = this.fb.group( {
		name: [ '', [ Validators.required ] ],
		// pass: [ '', [ Validators.required ] ],
		email: [ '', [ Validators.required, Validators.email ] ],
		phone: [ '', [ Validators.required, Validators.minLength( 8 ), Validators.pattern( '^(\\+62)\\d{3}\\d+$' ) ] ],
		company: [ '', [ Validators.required ] ],
		pic: [ '', [ Validators.required ] ],
		address: [ '', [ Validators.required ] ]
	} );

	/*
	* Untuk set / mengisi form
	* */
	setForm( value: User ) {
		this.form.patchValue( {
			name: value.data.name,
			email: value.data.email,
			phone: value.data.phone,
			company: value.data.company,
			pic: value.data.pic,
			address: value.data.address
		} );
		this.picture = value.data.picture;
	}

	submitForm( value ) {
		/* Cek Untuk valid atau tidak, jika tidak maka tidak bisa submit*/
		if ( this.form.valid ) {
			const body: Partial<IUser> = {
				name: value.name,
				address: value.address,
				/* Email tak comment disek karena ketok e api ne nabih gurung isok ngganti email */
				/* Company juga gak tak melokno soale, gurung onok ndek api*/
				// email: value.email,
				company: value.company,
				phone: value.phone,
				pic: value.pic,
				picture: this.picture
			};
			/*
			* Nek iki strategy ne. IF user ingin ganti picture
			* maka upload image dulu, ambil path urlnya
			* update const body.picture dengan path yg diperoleh dari uploadImage ketika sukses
			* dan dilanjutkan ke method PUT updateUserById
			* */
			this.spinner.show();
			let obs: Observable<any>;
			if ( this.newPicture ) {
				// upload
				obs = this.http2.uploadImage( this.newPicture )
					.pipe(
						switchMap( value1 => {
							body.picture = value1.payload.fullPath;
							return this.http.updateUserById( this.initialValue.data.id, body );
						} )
					);
			} else {
				obs = this.http.updateUserById( this.initialValue.data.id, body );
			}
			obs.subscribe( value1 => {
				this.store.user = value1;
				this.spinner.hide();
				this.toastr.success( 'Your profile has been successfully changed', 'Profile Update Success' );
				this.router.navigateByUrl( 'dashboard' );
			}, error => {
				this.spinner.hide();
				this.toastr.error( 'Sorry your profile can’t be changed please contact us or go to help', 'Profile Update Error' );
			} );
		} else {
			this.form.markAllAsTouched();
		}
	}


	ngOnInit() {
		/*
		* Opoo kok nggawe store gak nggawe http getUserById
		* Soale njaluk'e yayan iku ketika di home ngecek profile kosong maka di redirect ke page Profile iki
		* Dan mau gak mau ketika login atau refresh browser iku getUserById di halaman home dan menCACHE nya di STORE SERVICE
		* maka dari iku gak perlu api call lagi dan ambil datanya dari cache yang di home tadi
		*
		* Kalau semisal nggak perlu skenario diatas ya langsung aja hilangin call method //this.store.user$//
		* diganti dengan >>>>>>>>>>>>> this.http.getUserById( value.user[ 'custom:user_id' ] ) ) <<<<<<<<<<<<<<<<<<<<<<<
		* dimana >>>>>>>>> value.user[ 'custom:user_id' ] ) <<<<<<<<<<<<< iki iku id dari user karena dibutuhkan untuk api call
		* !!!!!!!!!!!!! Dan Depedency Injector untuk store mu tak ganti ke UserProfileStoreService !!!!!!!!!!!!!!!
		* ^^^^^^^^^^^^^ btw, yang diatas iki posisine ndek CONSTRUCTOR ^^^^^^^^^^^^^^^
		* !!!!!!!!!!!!! Saole awakdewe ambil curValue ne tekan this.store.user$ tempat cache nya USER !!!!!!!!!!!!!!!!
		* */

		this.store.user$
			.pipe(
				untilDestroyed( this )
			)
			.subscribe( value => {
				/*
				* Method ndek iso iki gawe ngeset Form atau ngisi form, dan memasukkan value dari subscribe ke method tsb.
				* !!!!!!! Oh iyo, ndek html mu mau value ambek placeholder tak ilangi, karena saat iki awakdewe nggawe !!!!!!!!!!!!
				* !!!!!!! REACTIVE FORM ANGULAR dan iki fitur tekan angular !!!!!!!!!!
				*/
				if ( value ) {
					this.setForm( value );
					this.initialValue = value;
					this.form.get( 'email' ).setAsyncValidators( checkEmailValidator( this.http, value.data.email ) );
					this.form.get( 'phone' ).setAsyncValidators( checkPhoneValidator( this.http, value.data.phone ) );
				} else {
					this.router.navigateByUrl( 'dashboard' );
				}
				/*this.user = {
					name: value.name,
					email: value.email,
					phone: value.phone,
					company: '',
					pic: value.pic,
					address: value.address
				};
				if ( !value.isProfileComplete ) {
					setTimeout( () => {
						this.router.navigateByUrl( '/dashboard/setting' );
					}, 1000 );
				}*/
			} );
	}

	ngOnDestroy(): void {
	}
}
