import { Component, OnInit } from '@angular/core';
import { Form } from '@shared/models/form.model';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ProjectFormGuideDialogComponent } from '@jala-modules/dashboards-project/pages/project-form/project-form-guide-dialog/project-form-guide-dialog.component';
import { ProjectFormEditDialogComponent } from '@jala-modules/dashboards-project/pages/project-form/project-form-edit-dialog/project-form-edit-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component( {
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: [ './project-form.component.scss' ]
} )
export class ProjectFormComponent implements OnInit {

	dataForms$: Form[];

	constructor(
		private http: DashboardProjectService,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private dialog: MatDialog
	) {
	}

	copied( value ) {
		this.toastr.success( 'Script Copied' );
	}

	openGuide( value ) {
		if ( value ) {
			const dialogRef = this.dialog.open( ProjectFormGuideDialogComponent, {
				data: value
			} );
		}
	}

	openSetting( value: Form ) {
		const dialogRef = this.dialog.open( ProjectFormEditDialogComponent, {
			data: value
		} );

		dialogRef.afterClosed()
			.subscribe( val => {
				this.spinner.show();
				this.http.getAllForms()
					.subscribe( value1 => {
						this.dataForms$ = value1;
						this.spinner.hide();
					} );
			} );
	}

	ngOnInit() {
		this.http.getAllForms()
			.subscribe( value => {
				this.dataForms$ = value;
			} );
	}

}
