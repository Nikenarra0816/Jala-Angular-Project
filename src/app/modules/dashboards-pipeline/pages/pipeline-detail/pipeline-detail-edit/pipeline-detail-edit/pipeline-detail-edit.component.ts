import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { IPipeline, IPipelineList } from '@shared/models/pipeline.model';
import { DashboardPipelineService } from '@core/services/dashboard-pipeline/dashboard-pipeline.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { IStatus } from '@shared/models/status.model';
import { flatMap, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component( {
	selector: 'app-pipeline-detail-edit',
	templateUrl: './pipeline-detail-edit.component.html',
	styleUrls: [ './pipeline-detail-edit.component.scss' ]
} )
export class PipelineDetailEditComponent implements OnInit, OnDestroy {

	constructor(
		public dialogRef: MatDialogRef<PipelineDetailEditComponent>,
		private http: DashboardProjectService,
		@Inject( MAT_DIALOG_DATA ) public data: { dataPipeline: IPipeline, dataPipelineList: IPipelineList },
		private http2: DashboardPipelineService,
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService
	) {
		this.formGroup1.get( 'status' ).valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( value => {
				const index = this.selectedDataStatus.findIndex( val => val.name === value );
				if ( index === -1 ) {
					this.selectedDataStatus.push( this.dataStatus.find( val => val.name === value ) );
				}
			} );
	}

	dataStatus: IStatus[] = [];
	formGroup1 = this.fb.group( {
		title: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
		status: [ '', [] ]
	} );
	selectedDataStatus: IStatus[] = [];

	closeDialog() {
		this.dialogRef.close();
	}

	deleteStatus( val: number ) {
		this.selectedDataStatus = this.selectedDataStatus.filter( value => value.id !== val );
	}

	save( value: FormGroup ) {
		if ( value.invalid ) {
			return;
		}
		if ( this.selectedDataStatus.length === 0 ) {
			return;
		}
		const body = {
			filters: {
				statuses: this.selectedDataStatus.map( value1 => {
					return { name: value1.name, id: value1.id };
				} )
			},
			name: value.value.title
		};
		this.spinner.show();
		this.http2.updatePipelineList( this.data.dataPipelineList.id, body )
			.pipe(
				tap( () => this.spinner.hide() )
			)
			.subscribe( val => {
				this.toastr.success( 'Your pipeline list has been successfully edited', 'Pipeline List Edit Success' );
				this.dialogRef.close( 'success' );
			}, error => {
				this.toastr.error( 'Sorry your pipeline list can’t be edited please contact us or go to help', 'Pipeline List Edit Error' );
			} );
	}

	ngOnInit() {
		const obs = [];
		this.data.dataPipeline.filters.projects.forEach( ( val ) => {
			obs.push( this.http.getStatusByProjectId( val.id ) );
		} );
		forkJoin( obs )
			.pipe( flatMap( x => x ) )
			.subscribe( ( value: IStatus[] ) => {
				value.forEach( value1 => {
					const i = this.dataStatus.findIndex( value2 => value2.name === value1.name );
					if ( i === -1 ) {
						this.dataStatus.push( value1 );
					}
				} );
				this.data.dataPipelineList.filters.statuses.forEach( value1 => {
					const res = this.dataStatus.find( value2 => value2.name === value1.name );
					if ( res ) {
						this.selectedDataStatus.push( res );
					}
				} );
				this.formGroup1.patchValue( {
					title: this.data.dataPipelineList.name
				} );
			} );
	}

	ngOnDestroy(): void {
	}

}
