import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationStoreService } from '@core/store/authentication/authentication-store.service';
import { DashboardSupportService } from '@core/services/dashboard-support/dashboard-support.service';
import { ApiUploadService } from '@core/services/api-upload.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component( {
	selector: 'app-support-create-ticket',
	templateUrl: './support-create-ticket.component.html',
	styleUrls: [ './support-create-ticket.component.scss' ]
} )
export class SupportCreateTicketComponent implements OnInit {
	@ViewChild( 'upload', { static: true } ) uploadEl: ElementRef;

	constructor(
		private fb: FormBuilder,
		private toastr: ToastrService,
		private user: AuthenticationStoreService,
		private http: DashboardSupportService,
		private http2: ApiUploadService,
		private spinner: NgxSpinnerService
	) {
	}

	newImage = [];
	newImageFile: File[] = [];

	formGroup = this.fb.group( {
		title: [ '', [ Validators.required ] ],
		description: [ '', [ Validators.required ] ]
	} );

	addImage( files ) {
		const file: File = files[ 0 ];
		if ( file ) {
			const index = this.newImageFile.findIndex( value => value.name === file.name );
			if ( index !== -1 ) {
				this.toastr.error( 'Image is already added', 'Error Duplicate' );
			} else if ( file.size < 1000000 ) {
				this.newImageFile.push( file );
				const reader = new FileReader();
				reader.readAsDataURL( file );
				reader.onload = () => this.newImage = [ ...this.newImage, reader.result ];
			} else {
				this.toastr.error( 'Image Size Max 1Mb', 'Error Max Size' );
			}

			this.uploadEl.nativeElement.value = '';
		}
	}

	deleteImage( val: number ) {
		this.newImage.splice( val, 1 );
		this.newImageFile.splice( val, 1 );
		this.uploadEl.nativeElement.value = '';
	}

	editImage( files, index: number, event ) {
		const file: File = files[ 0 ];
		if ( file ) {
			const isAlready = this.newImageFile[ index ].name === file.name;
			const isAlreadyArr = this.newImageFile.findIndex( value => value.name === file.name ) !== -1;

			if ( isAlready ) {
				this.toastr.success( `It's the same Image`, 'Nothing Changed' );
			} else if ( isAlreadyArr ) {
				this.toastr.error( 'Image is already added', 'Error Duplicate' );
			} else {
				if ( file.size < 1000000 ) {
					this.newImageFile[ index ] = file;
					const reader = new FileReader();
					reader.readAsDataURL( file );
					reader.onload = () => this.newImage[ index ] = reader.result;
				} else {
					this.toastr.error( 'Image Size Max 1Mb', 'Error Max Size' );
				}
			}
			event.target.value = '';
		}
	}

	get isFormValid() {
		return this.formGroup.valid;
	}

	submit() {
		if ( this.isFormValid ) {
			const body = {
				category: 1,
				title: this.formGroup.value.title,
				description: this.formGroup.value.description,
				user_id: Number( this.user.authState.user[ 'custom:user_id' ] ),
				attach: []
			};
			let obs: Observable<any>;
			this.spinner.show();
			if ( this.newImageFile.length !== 0 ) {
				obs = this.http2.uploadMultipleImages( this.newImageFile )
					.pipe(
						switchMap( value => {
							body.attach = value.map( value1 => value1.payload.fullPath );
							return this.http.createTicket( body );
						} )
					);
			} else {
				obs = this.http.createTicket( body );
			}
			obs.pipe(
				tap( () => this.spinner.hide() )
			).subscribe(
				value => {
					this.toastr.success( 'Please Wait Thank You', 'Submit Ticket Success' );
				}, error => {
					this.toastr.error( 'Please inform us', 'Submit Ticket Error' );
				} );
		}
	}

	ngOnInit() {
		console.log( this.user.authState.user[ 'custom:user_id' ] );
	}

}
