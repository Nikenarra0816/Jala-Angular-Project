import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ILeadWithJourneyJourneysEntity, Lead, LeadWithJourney, ParamsLeadDownload } from '@shared/models/lead.model';
import * as XLSX from 'xlsx';
import { format, parseISO } from 'date-fns';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';

@Component( {
	selector: 'app-project-lead-download-dialog',
	templateUrl: './project-lead-download-dialog.component.html',
	styleUrls: [ './project-lead-download-dialog.component.scss' ]
} )
export class ProjectLeadDownloadDialogComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ProjectLeadDownloadDialogComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: { lead: Lead[], config?: ParamsLeadDownload, disableJourney?: false },
		private http: DashboardProjectService
	) {
	}

	withJourney = false;

	parseData( arr: Lead[] | LeadWithJourney[] ) {
		const data = [];
		if ( this.withJourney ) {
			arr.forEach( ( value: LeadWithJourney ) => {
				data.push( {
					Name: value.data.name,
					'Sales Officer': value.getSalesOfficer.name,
					Channel: value.getChannel.name,
					Campaign: value.getCampaign.name,
					Email: value.data.email ? value.data.email : '-',
					Phone: value.data.phone,
					Gender: value.data.gender,
					Category: value.getCategory.name,
					Status: value.getStatus.name,
					Notes: value.data.note ? value.data.note : '-',
					Created: format( parseISO( value.data.createdAt ), 'dd-MM-yyyy HH:mm' ),
					Updated: value.data.modifiedAt ? format( parseISO( value.data.modifiedAt ), 'dd-MM-yyyy HH:mm' ) : '-',
					Journey: this.mergeJourney( value.getJourney )
				} );
			} );
		} else {
			arr.forEach( ( value: LeadWithJourney ) => {
				data.push( {
					Name: value.data.name,
					'Sales Officer': value.getSalesOfficer.name,
					Channel: value.getChannel.name,
					Campaign: value.getCampaign.name,
					Email: value.data.email ? value.data.email : '-',
					Phone: value.data.phone,
					Gender: value.data.gender,
					Category: value.getCategory.name,
					Status: value.getStatus.name,
					Notes: value.data.note ? value.data.note : '-',
					Created: format( parseISO( value.data.createdAt ), 'dd-MM-yyyy HH:mm' ),
					Updated: value.data.modifiedAt ? format( parseISO( value.data.modifiedAt ), 'dd-MM-yyyy HH:mm' ) : '-',
				} );
			} );
		}
		return data;
	}

	exportAsExcel() {
		if ( this.withJourney ) {
			this.http.getLeadsWithJourney( this.data.config )
				.subscribe( arr => {
					const data = this.parseData( arr );
					this.downloadFileToBrowser( data, 'xlsx' );
				} );
		} else {
			const data = this.parseData( this.data.lead );
			this.downloadFileToBrowser( data, 'xlsx' );
		}
	}

	exportAsCSV() {
		if ( this.withJourney ) {
			this.http.getLeadsWithJourney( this.data.config )
				.subscribe( arr => {
					const data = this.parseData( arr );
					this.downloadFileToBrowser( data, 'csv' );
				} );
		} else {
			const data = this.parseData( this.data.lead );
			this.downloadFileToBrowser( data, 'csv' );
		}
	}

	mergeJourney( val: ILeadWithJourneyJourneysEntity[] ) {
		let x = '';
		val.forEach( ( value, i, array ) => {
			x += value.status.status + ' ' + format( parseISO( value.createdAt ), 'dd/MM/yyyy HH:mm' ) + ( array.length - 1 === i ? '' : ' | ' );
		} );
		return x;
	}

	downloadFileToBrowser( data, type: 'xlsx' | 'csv' ) {
		const date = format( new Date(), 'ddMMyyyy' );
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet( data );
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet( wb, ws, 'Sheet1' );
		XLSX.writeFile( wb, `Leads${ date }.${ type }`, { bookType: type } );
		this.dialogRef.close();
	}

	ngOnInit() {
	}

}
