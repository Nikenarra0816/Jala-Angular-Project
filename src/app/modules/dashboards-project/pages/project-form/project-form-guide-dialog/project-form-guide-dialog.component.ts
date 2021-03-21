import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component( {
	selector: 'app-project-form-guide-dialog',
	templateUrl: './project-form-guide-dialog.component.html',
	styleUrls: [ './project-form-guide-dialog.component.scss' ]
} )
export class ProjectFormGuideDialogComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ProjectFormGuideDialogComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: string,
		private toastr: ToastrService
	) {
	}

	copied( value ) {
		this.toastr.success('Script Copied');
	}

	close() {
		this.dialogRef.close();
	}

	ngOnInit() {
	}

}
