import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { IProject, IProjectMetadata, Project } from '@shared/models/project.model';
import { addMonths, differenceInCalendarMonths, format, parseISO } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component( {
	selector: 'app-project-setting-information',
	templateUrl: './project-setting-information.component.html',
	styleUrls: [ './project-setting-information.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ProjectSettingInformationComponent implements OnInit, OnDestroy {

	@Input() dataProject: Project;
	@Input() metadata: IProjectMetadata;

	constructor(
		private fb: FormBuilder,
		private http: DashboardProjectService,
		private toastr: ToastrService,
		private router: Router
	) {
		this.formGroup.get( 'duration' ).valueChanges
			.pipe(
				untilDestroyed( this )
			)
			.subscribe( value => {
				value === 'duration' ? this.formGroupMonth.enable() : this.formGroupMonth.disable();
			} );
	}

	formGroup = this.fb.group( {
		name: [ '', Validators.required ],
		detail: [ '', Validators.required ],
		status: [ '', Validators.required ],
		duration: [ 'noDuration' ]
	} );
	formGroupMonth = this.fb.control( { value: 1, disabled: true } );

	setGroup( value: Project ) {
		this.formGroup.patchValue( {
			name: value.data.name,
			detail: value.data.detail,
			status: value.data.status
		} );
		if ( value.data.periodEnd ) {
			this.formGroup.patchValue( { duration: 'duration' }, { emitEvent: true } );
			const resSubstract = differenceInCalendarMonths( parseISO( value.data.periodEnd ), parseISO( value.data.periodStart ) );
			this.formGroupMonth.patchValue( resSubstract );
		}
		if ( value.summary.total_lead > 0 ) {
			this.formGroup.get( 'name' ).disable();
		}
	}

	submit( value: FormGroup ) {
		if ( value.invalid ) {
			return;
		}
		const body: Partial<IProject> = {
			name: value.value.name,
			detail: value.value.detail,
			status: value.value.status,
			periodEnd: null
		};
		if ( value.value.duration === 'duration' ) {
			const dur = this.formGroupMonth.value;
			body.periodEnd = format( addMonths( parseISO( this.dataProject.data.periodStart ), dur ), 'yyyy-MM-dd' );
		}
		this.http.updateProject( this.dataProject.data.id, body )
			.subscribe( value1 => {
				this.toastr.success( 'Your project has been successfully edited', 'Project Edit Success' );
				this.router.navigateByUrl( 'dashboard/project/list' );
			}, error => {
				this.toastr.error( 'Sorry your project can’t be edited please contact us or go to help', 'Project Edit Error' );
			} );
	}

	ngOnInit() {
		this.setGroup( this.dataProject );
	}


	ngOnDestroy(): void {
	}

}
