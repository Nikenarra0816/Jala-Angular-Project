import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { Project } from '@shared/models/project.model';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ColorEvent } from 'ngx-color';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardPipelineService } from '@core/services/dashboard-pipeline/dashboard-pipeline.service';
import { tap } from 'rxjs/operators';

@Component( {
	selector: 'app-pipeline-empty-add',
	templateUrl: './pipeline-empty-add.component.html',
	styleUrls: [ './pipeline-empty-add.component.scss' ]
} )
export class PipelineEmptyAddComponent implements OnInit, OnDestroy {

	constructor(
		public dialogRef: MatDialogRef<PipelineEmptyAddComponent>,
		private fb: FormBuilder,
		private http: DashboardProjectService,
		private http2: DashboardPipelineService,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService
	) {
		this.formGroup1.get( 'project' ).valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( value => {
				/* TODO: FOR NOW ONLY SUPPORT 1 PROJECT
				const index = this.selectedProject.findIndex( val => val.data.id === value );
				if ( index === -1 ) {
					this.selectedProject.push( this.dataProject.find( val => val.data.id === value ) );
				}
				*/
				this.selectedProject = [ this.dataProject.find( val => val.data.id === value ) ];
			} );
	}

	dataProject: Project[];
	selectedProject: Project[] = [];
	templateColor: string[] = [ '#E69E9E', '#E9A985', '#E8CF8F', '#D4E184', '#565656',
		'#7CD5BA', '#9CD5D9', '#96CEEE', '#858EDF', '#E99FEB', '#E3759D', '#C4C4C4' ];
	colorPicked = '#9CD5D9';

	formGroup1 = this.fb.group( {
		title: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
		project: [ '', [] ]
	} );


	save( value: FormGroup ) {
		if ( value.invalid ) {
			return;
		}
		const body = {
			color: this.colorPicked,
			filters: {
				projects: this.selectedProject.map( value1 => {
					return { id: value1.data.id };
				} )
			},
			name: value.value.title
		};
		this.http2.createPipeline( body )
			.pipe( tap( () => this.spinner.hide() ) )
			.subscribe( value1 => {
				this.toastr.success( 'Your pipeline has been successfully added', 'Pipeline Add Success' );
				this.dialogRef.close( 'success' );
			}, error => {
				this.toastr.error( 'Sorry your pipeline can’t be added please contact us or go to help', 'Pipeline Add Error' );
			} );
	}

	deleteProject( val: number ) {
		this.selectedProject = this.selectedProject.filter( value => value.data.id !== val );
	}

	colorChange( value: ColorEvent ) {
		this.colorPicked = value.color.hex;
	}

	closeDialog() {
		this.dialogRef.close();
	}

	ngOnInit() {
		this.http.getAllProjects()
			.subscribe( value => {
				this.dataProject = value;
			} );
	}

	ngOnDestroy(): void {
	}

}
