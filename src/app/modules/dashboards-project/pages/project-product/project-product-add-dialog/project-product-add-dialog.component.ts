import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { ApiUploadService } from '@core/services/api-upload.service';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProduct, IProductPicture } from '@shared/models/product.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component( {
	selector: 'app-project-product-add-dialog',
	templateUrl: './project-product-add-dialog.component.html',
	styleUrls: [ './project-product-add-dialog.component.scss' ]
} )
export class ProjectProductAddDialogComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private http: DashboardProjectService,
		private http2: ApiUploadService,
		public dialogRef: MatDialogRef<ProjectProductAddDialogComponent>,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService
	) {
	}

	projects$: Observable<any[]>;

	newImage = [];
	newImageFile: File[] = [];

	formGroup1 = this.fb.group( {
		projects: [ null, [ Validators.required ] ],
		name: [ null, [ Validators.required, Validators.minLength( 6 ) ] ],
		detail: [ null, [ Validators.required ] ],
		price: [ null, [ Validators.required, Validators.min( 0 ) ] ],
		isActive: [ true ],
	} );

	addImage( files ) {
		const file: File = files[ 0 ];
		if ( file ) {
			if ( file.size < 1000000 ) {
				this.newImageFile.push( file );
				const reader = new FileReader();
				reader.readAsDataURL( file );
				reader.onload = ( ev ) => this.newImage.push( reader.result );
			} else {
				this.toastr.error( 'Image Size Max 1Mb', 'Error Max Size' );
			}
		}
	}

	close() {
		this.dialogRef.close();
	}

	submit( value: FormGroup ) {
		if ( this.formGroup1.invalid ) {
			this.formGroup1.markAllAsTouched();
			return;
		}
		this.spinner.show();
		const body: Partial<IProduct> = {
			name: value.value.name,
			detail: value.value.detail,
			price: value.value.price,
			isActive: value.value.isActive,
			projects: value.value.projects
		};
		let obsArr: Observable<any>;
		if ( Array.isArray( this.newImageFile ) && this.newImageFile.length ) {
			// obsArr = this.http.createProducts( value.value.project, [ body ] )
			obsArr = this.http.createProducts( [ body ] )
				.pipe(
					switchMap( value1 => {
							return this.http2.uploadMultipleImages( this.newImageFile )
								.pipe(
									map( value2 => {
										return value2.map( ( val ): Partial<IProductPicture> => {
											return { path: val.payload.fullPath, title: val.payload.field };
										} );
									} ),
									switchMap( ( val: Partial<IProductPicture[]> ) => this.http.createProductPicture( value1[ 0 ].id, val ) ),
								);
						}
					)
				);
		} else {
			// obsArr = this.http.createProducts( value.value.project, [ body ] );
			obsArr = this.http.createProducts( [ body ] );
		}
		obsArr
			.pipe(
				tap( () => this.spinner.hide() )
			)
			.subscribe( value1 => {
				this.toastr.success( 'Your product has been successfully added', 'Product Add Success' );
				this.dialogRef.close( 'updatePlease' );
			}, error => {
				this.toastr.error( 'Sorry your product can’t be added please contact us or go to help', 'Product Add Error' );
			} );
	}

	ngOnInit() {
		this.projects$ = this.http.getAllProjects()
			.pipe(
				map( value => {
					return value.map( value1 => {
						return {
							id: value1.data.id,
							name: value1.data.name,
						};
					} );
				} ),
				/*tap( () => {
					if ( this.projectId ) {
						this.formGroup1.patchValue( { project: this.projectId } );
					}
				} )*/
			);
	}

}
