import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { IProduct, IProductPicture } from '@shared/models/product.model';
import { forkJoin, Observable, ObservableInput } from 'rxjs';
import { ApiUploadService } from '@core/services/api-upload.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component( {
	selector: 'app-project-product-edit-dialog',
	templateUrl: './project-product-edit-dialog.component.html',
	styleUrls: [ './project-product-edit-dialog.component.scss' ]
} )
export class ProjectProductEditDialogComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private http: DashboardProjectService,
		private http2: ApiUploadService,
		public dialogRef: MatDialogRef<ProjectProductEditDialogComponent>,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		@Inject( MAT_DIALOG_DATA ) public data: IProduct ) {
	}

	imageList: IProductPicture[] = [];
	newImage = [];
	newImageFile: File[] = [];
	projects$: Observable<any[]>;

	formGroup1 = this.fb.group( {
		name: [ null, [ Validators.required, Validators.minLength( 6 ) ] ],
		detail: [ null, [ Validators.required ] ],
		price: [ null, [ Validators.required, Validators.min( 0 ) ] ],
		isActive: [ null ],
		projects: [ undefined, [ Validators.required ] ],
	} );

	setGroup( value ) {
		this.formGroup1.setValue( {
			name: value.name,
			detail: value.detail,
			price: value.price,
			isActive: value.isActive,
			projects: value.projects.map( value1 => {
				return { id: value1.id, name: value1.name };
			} )
		} );
	}

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
		const obsArr: ObservableInput<any>[] = [];
		if ( Array.isArray( this.newImageFile ) && this.newImageFile.length ) {
			const img = this.http2.uploadMultipleImages( this.newImageFile )
				.pipe(
					map( value1 => {
						return value1.map( ( val ): Partial<IProductPicture> => {
							return { path: val.payload.fullPath, title: val.payload.field };
						} );
					} ),
					switchMap( ( val: Partial<IProductPicture[]> ) => this.http.createProductPicture( this.data.id, val ) ),
				);
			obsArr.push( img );
		}
		obsArr.push( this.http.updateProduct( this.data.id, body ) );
		forkJoin( obsArr )
			.pipe( tap( () => this.spinner.hide() ) )
			.subscribe( value1 => {
				this.toastr.success( 'Your product has been successfully edited', 'Product Edit Success' );
				this.dialogRef.close( 'updatePlease' );
			}, error => {
				this.toastr.error( 'Sorry your product can’t be edited please contact us or go to help', 'Product Edit Error' );
			} );
	}

	ngOnInit() {
		this.projects$ = this.http.getAllProjects()
			.pipe(
				map( value => value.map( value1 => {
					return { id: value1.data.id, name: value1.data.name };
				} ) ),
			);
		this.setGroup( this.data );
		this.http.getProductPicturesById( this.data.id )
			.subscribe( value => this.imageList = value );
	}

}
