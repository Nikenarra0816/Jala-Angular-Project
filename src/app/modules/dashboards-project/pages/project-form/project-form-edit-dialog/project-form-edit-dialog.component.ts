import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Form, IFormFieldsEntity } from '@shared/models/form.model';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { urlValid } from '@shared/validators/urlValidator';
import { inOutAnimation } from '@shared/animations/inOutAnimation';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';

@Component( {
	selector: 'app-project-form-edit-dialog',
	templateUrl: './project-form-edit-dialog.component.html',
	styleUrls: [ './project-form-edit-dialog.component.scss' ],
	animations: [ inOutAnimation ]
} )
export class ProjectFormEditDialogComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ProjectFormEditDialogComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: Form,
		private http: DashboardProjectService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService
	) {
	}

	curValue: Form;

	curFields: IFormFieldsEntity[];
	allFields: IFormFieldsEntity[];
	diffFields: IFormFieldsEntity[];

	formGroupForm = this.fb.group( {
		name: [ '', [ Validators.required, Validators.minLength(6) ] ],
		pageUrl: [ '', [ Validators.required, urlValid ] ]
	} );

	get name() {
		return this.formGroupForm.get( 'name' );
	}

	get pageUrl() {
		return this.formGroupForm.get( 'pageUrl' );
	}

	diffCalculation() {
		this.diffFields = this.allFields.filter( x => {
			const index = this.curFields.findIndex( ( y ) => x.id === y.id );
			return index === -1;
		} );
	}

	updateDiff( id: number, action: 'add' | 'delete' ) {
		if ( action === 'add' ) {
			this.curFields.push( this.allFields.find( value => value.id === id ) );
		}
		if ( action === 'delete' ) {
			const index = this.curFields.findIndex( value => value.id === id );
			if ( !this.curFields[ index ].mandatory ) {
				this.curFields.splice( index, 1 );
			}
		}
		this.diffCalculation();
	}

	setValue( value: Form ) {
		if ( value.data.type === 'offline' ) {
			this.pageUrl.disable();
		}
		this.formGroupForm.setValue( { name: value.data.name, pageUrl: value.data.pageUrl } );
	}

	submit( value: FormGroup ) {
		if ( this.formGroupForm.invalid ) {
			this.formGroupForm.updateValueAndValidity();
			return;
		}
		if ( this.curFields.length === 0 ) {
			this.toastr.error( 'Please add Fields' );
			return;
		}
		this.spinner.show();
		const body = {
			name: value.value.name,
			fields: this.curFields.map( value1 => {
				return { id: value1.id };
			} ),
			pageUrl: null
		};
		if ( this.curValue.data.type === 'online' ) {
			body.pageUrl = value.value.pageUrl;
		}
		this.http.updateForms( this.curValue.data.id, body )
			.pipe(
				tap( () => this.spinner.hide() )
			)
			.subscribe( value1 => {
				this.toastr.success( 'Update Success' );
				this.dialogRef.close( 'update' );
			}, error => {
				this.toastr.error( 'Something Goes Wrong' );
			} );
	}

	close() {
		this.dialogRef.close();
	}

	ngOnInit() {
		this.curValue = this.data;
		this.curFields = this.curValue.data.fields;
		this.setValue( this.curValue );
		this.http.getFormMetadata()
			.subscribe( value => {
				this.allFields = value.fields;
				this.diffCalculation();
			} );
	}

}
