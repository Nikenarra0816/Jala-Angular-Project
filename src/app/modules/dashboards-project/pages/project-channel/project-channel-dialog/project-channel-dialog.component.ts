import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Channel, IChannelMetadata } from '@shared/models/channel.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DashboardSalesTeamService } from '@core/services/dashboard-sales-team/dashboard-sales-team.service';
import { map, tap } from 'rxjs/operators';
import { addMonths, differenceInCalendarMonths, format, parseISO } from 'date-fns';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { urlValid } from '@shared/validators/urlValidator';

@Component( {
	selector: 'app-project-channel-dialog',
	templateUrl: './project-channel-dialog.component.html',
	styleUrls: [ './project-channel-dialog.component.scss' ]
} )
export class ProjectChannelDialogComponent implements OnInit, OnDestroy {

	constructor(
		public dialogRef: MatDialogRef<ProjectChannelDialogComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: { value: Channel, metadata: IChannelMetadata },
		private fb: FormBuilder,
		private http: DashboardProjectService,
		private http2: DashboardSalesTeamService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService
	) {
		this.formGroup1.get( 'duration' ).valueChanges
			.pipe(
				untilDestroyed( this )
			)
			.subscribe( value => {
				value === 'duration' ? this.formGroup1Month.enable() : this.formGroup1Month.disable();
			} );
	}

	isOnlineMedia = false;

	teams$: Observable<any[]>;
	metadata$: Observable<IChannelMetadata>;

	formGroup1 = this.fb.group( {
		name: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
		detail: [ '', [ Validators.required ] ],
		redirectUrl: [ '', [ Validators.required, urlValid ] ],
		teams: [ undefined, [ Validators.required ] ],
		status: [ '', [ Validators.required ] ],
		duration: [ 'noDuration' ]
	} );
	formGroup1Month = this.fb.control( { value: 1, disabled: true } );

	checkMedia() {
		const mediaIndex = this.data.metadata.medias.filter( value => value.id === this.data.value.data.media.id );
		if ( mediaIndex ) {
			this.isOnlineMedia = mediaIndex[ 0 ].type === 'online';
		}
		if ( !this.isOnlineMedia ) {
			this.formGroup1.removeControl( 'pageUrl' );
			this.formGroup1.removeControl( 'redirectUrl' );
		}
	}

	setValue( value: Channel ) {
		this.formGroup1.setValue( {
			name: value.data.name,
			detail: value.data.detail,
			duration: value.data.periodEnd ? 'duration' : 'noDuration',
			redirectUrl: value.data.redirectUrl,
			status: value.data.status,
			teams: value.data.teams.map( value1 => {
				return { id: value1.id, name: value1.name };
			} )
		} );
		if ( value.data.periodEnd ) {
			const duration = differenceInCalendarMonths(
				parseISO( value.data.periodEnd ),
				parseISO( value.data.periodStart )
			);
			this.formGroup1Month.setValue( duration );
			this.formGroup1Month.enable();
		}
		this.checkMedia();
		if ( value.data.totalLeads > 0 ) {
			this.formGroup1.get( 'name' ).disable();
		}
	}

	private setChannelBody( value ) {
		const body: Partial<any> = {
			name: value.name,
			detail: value.detail,
			periodStart: format( new Date(), 'yyyy-MM-dd' ),
			periodEnd: null,
			redirectUrl: value.redirectUrl,
			teams: value.teams,
			status: value.status
		};
		if ( value.duration === 'duration' ) {
			const dur = this.formGroup1Month.value;
			body.periodEnd = format( addMonths( new Date(), dur ), 'yyyy-MM-dd' );
		}
		return body;
	}

	save( value: FormGroup ) {
		if ( value.valid ) {
			this.spinner.show();
			const body = this.setChannelBody( value.value );
			this.http.updateChannel( this.data.value.data.id, body )
				.pipe(
					tap( () => this.spinner.hide() )
				)
				.subscribe(
					() => {
						this.dialogRef.close( 'change' );
					},
					( err ) => {
						console.log( err );
					} );
		}
	}


	ngOnInit() {
		this.metadata$ = this.http.getChannelMetadata();
		this.teams$ = this.http2.getAllSalesTeam()
			.pipe(
				map( value => value.map( value1 => value1.getIdAndName ) ),
			);
		this.setValue( this.data.value );
	}

	ngOnDestroy() {

	}

}
