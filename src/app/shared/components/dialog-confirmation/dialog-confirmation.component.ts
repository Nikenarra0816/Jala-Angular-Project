import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component( {
	selector: 'app-dialog-confirmation',
	templateUrl: './dialog-confirmation.component.html',
	styleUrls: [ './dialog-confirmation.component.scss' ]
} )
export class DialogConfirmationComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<DialogConfirmationComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: { h3: string },
	) {
	}

	closeDialog( val ) {
		this.dialogRef.close( val );
	}

	ngOnInit() {
	}

}
