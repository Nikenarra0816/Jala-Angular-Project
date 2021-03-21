import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IProjectMetadata } from '@shared/models/project.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component( {
	selector: 'app-project-setting-status-add',
	templateUrl: './project-setting-status-add.component.html',
	styleUrls: [ './project-setting-status-add.component.scss' ]
} )
export class ProjectSettingStatusAddComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ProjectSettingStatusAddComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: IProjectMetadata,
		private fb: FormBuilder
	) {
		this.categoryList = this.data.categories.map( value => {
			return { value: value.id, sort: value.name };
		} );
	}

	formGroup1 = this.fb.group( {
		name: [ '', [ Validators.required ] ],
		category: [ '', [ Validators.required ] ]
	} );

	categoryList;

	close() {
		this.dialogRef.close();
	}

	save( value: FormGroup ) {
		if ( value.invalid ) {
			return;
		}
		const x = this.data.categories.find( value1 => value1.id === value.value.category );
		const result: ICustomLeadsStatus = {
			id: undefined,
			name: value.value.name,
			category: { id: x.id },
			color: x.color,
			point: 0
		};
		this.dialogRef.close( result );

	}

	ngOnInit() {
	}

}

interface ICustomLeadsStatus {
	id?: number;
	name: string;
	point: number;
	color: string;
	category: {
		id: number
	};
}
