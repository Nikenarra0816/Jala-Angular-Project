import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ICustomerJourney } from '@shared/models/customer.model';

@Component( {
	selector: 'app-project-customer-invoice-download-dialog',
	templateUrl: './project-customer-invoice-download-dialog.component.html',
	styleUrls: [ './project-customer-invoice-download-dialog.component.scss' ]
} )
export class ProjectCustomerInvoiceDownloadDialogComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ProjectCustomerInvoiceDownloadDialogComponent>,
		@Inject( MAT_DIALOG_DATA ) public value: ICustomerJourney,
	) {
	}

	close() {
		this.dialogRef.close();
	}

	ngOnInit() {
		console.log( this.value );
	}

}
