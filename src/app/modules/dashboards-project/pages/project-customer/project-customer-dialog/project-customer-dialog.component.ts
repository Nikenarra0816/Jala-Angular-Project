import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Customer, ICustomer, ICustomerJourney, ICustomerJourneyInterestsEntity } from '@shared/models/customer.model';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { Observable } from 'rxjs';
import { slider } from '@shared/animations/inOutAnimation';
import { ProjectCustomerInvoiceDownloadDialogComponent } from '@jala-modules/dashboards-project/pages/project-customer/project-customer-invoice-download-dialog/project-customer-invoice-download-dialog.component';

@Component( {
	selector: 'app-project-customer-dialog',
	templateUrl: './project-customer-dialog.component.html',
	styleUrls: [ './project-customer-dialog.component.scss' ],
	animations: [ slider ]
} )
export class ProjectCustomerDialogComponent implements OnInit {

	constructor(
		private dialog: MatDialog,
		public dialogRef: MatDialogRef<ProjectCustomerDialogComponent>,
		@Inject( MAT_DIALOG_DATA ) public value: Customer,
		private http: DashboardProjectService
	) {
	}


	dataJourney: Observable<ICustomerJourney[]>;
	dataProductArchived: ICustomerJourney[]; // nggawe interface iki soale podo
	dataProductInterestTable: ICustomerJourneyInterestsEntity[];
	isDetailTableShow = false;

	showDetailTable( data: ICustomerJourneyInterestsEntity[] ) {
		this.dataProductInterestTable = data;
		this.isDetailTableShow = true;
	}

	backToTable() {
		this.dataProductInterestTable = undefined;
		this.isDetailTableShow = false;
	}

	convertNameProduct( data: ICustomerJourneyInterestsEntity[] ) {
		return data.map( ( val ) => val.product ).join( ' ,' );
	}

	totalPriceProductInterest() {
		return this.dataProductInterestTable.reduce( ( acc, cur ) => acc + cur.productTotalPrice, 0 );
	}

	totalProductQty() {
		return this.dataProductInterestTable.reduce( ( acc, cur ) => acc + cur.productQty, 0 );
	}

	downloadInvoice( customer: ICustomerJourney ) {
		this.http.getCustomerInvoice( customer.customerUuid, customer.uuid )
			.subscribe( value1 => {
				const url = window.URL.createObjectURL( value1 );
				window.open( url );
			} );
	}

	openDialogInvoiceDownload( customer: ICustomerJourney ) {
		const dialogRef = this.dialog.open( ProjectCustomerInvoiceDownloadDialogComponent, {
			data: customer,
			width: '60rem',
			panelClass: [ 'jala-dialog', 'jala-dialog-padding-small' ]
		} );

		dialogRef.afterClosed().subscribe( result => {
		} );
	}

	close() {
		this.dialogRef.close();
	}

	ngOnInit() {
		this.dataJourney = this.http.getCustomerJourney( this.value.data.uuid );
		this.http.getCustomerProductArchived( this.value.data.uuid )
			.subscribe( value => this.dataProductArchived = value );
	}

}
