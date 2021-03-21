import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component( {
	selector: 'app-dialog-success',
	templateUrl: './dialog-success.component.html',
	styleUrls: [ './dialog-success.component.scss' ]
} )
export class DialogSuccessComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<DialogSuccessComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: { h1: string, h3: string, button: string },
	) {
	}

	closeDialog() {
		this.dialogRef.close();
	}

	ngOnInit() {
	}

}
