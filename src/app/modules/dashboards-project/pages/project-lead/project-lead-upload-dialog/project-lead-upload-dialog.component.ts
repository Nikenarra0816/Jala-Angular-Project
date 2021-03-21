import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { forkJoin } from 'rxjs';
import { Channel } from '@shared/models/channel.model';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { ApiUploadService } from '@core/services/api-upload.service';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/internal-compatibility';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { UserProfileStoreService } from '@core/store/user-profile/user-profile-store.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';
import { ApiService } from '@core/services/api.service';

interface WebsocketBody {
	code: number;
	message: string;
	step: number;
	totalStep: number;
}

@Component( {
	selector: 'app-project-lead-upload-dialog',
	templateUrl: './project-lead-upload-dialog.component.html',
	styleUrls: [ './project-lead-upload-dialog.component.scss' ]
} )
export class ProjectLeadUploadDialogComponent implements OnInit, OnDestroy {

	constructor(
		public dialogRef: MatDialogRef<ProjectLeadUploadDialogComponent>,
		@Inject( MAT_DIALOG_DATA ) public projectId: string,
		private userStore: UserProfileStoreService,
		private urlWs: ApiService,
		private http: DashboardProjectService,
		private http2: ApiUploadService,
		private toastr: ToastrService,
		private cd: ChangeDetectorRef,
		private spinner: NgxSpinnerService
	) {
		this.config = {
			url: `${ this.urlWs.getWsUrl }/import_lead?tenant_id=${ this.userStore.user.data.tenantId }`,
			openObserver: {
				next: () => {
					console.log( 'connection ok' );
					this.connectionReady = true;
				}
			}
		};
		this.ws = new WebSocketSubject( this.config );

		this.spinner.show();
	}

	/// WEBSOCKET CONFIG
	private connectionReady = false;
	config: WebSocketSubjectConfig<any>;
	ws: WebSocketSubject<any>;

	message: WebsocketBody;
	//////////////////////////////////////////////////
	// tslint:disable-next-line:variable-name
	_progress = false;

	get uploadOnProgress() {
		return this._progress;
	}

	set uploadOnProgress( val ) {
		this._progress = val;
		if ( val ) {
			this.channel.disable();
		} else {
			this.channel.enable();
		}
	}

	file: File;

	channel = new FormControl( '', [ Validators.required ] );
	allChannel: Channel[];

	downloadTemplate() {
		if ( this.channel.hasError( 'required' ) ) {
			return;
		}
		if ( this.uploadOnProgress ) {
			return;
		}
		if ( this.channel.value === '' ) {
			return this.toastr.error( 'Please Select Channel First', 'Error Download Template' );
		}
		this.http.getLeadsTemplate( this.channel.value )
			.subscribe( value => {
				saveAs( value, 'import_template.csv' );
			} );
	}

	closeDialog() {
		if ( !this.uploadOnProgress ) {
			this.dialogRef.close();
		}
	}

	selectFile( files ) {
		if ( this.uploadOnProgress ) {
			return;
		}
		const file = files[ 0 ];
		if ( file ) {
			this.file = file;
		}

	}

	uploadFile() {
		if ( this.uploadOnProgress ) {
			return;
		}
		if ( this.channel.hasError( 'required' ) ) {
			return;
		}
		if ( !this.file ) {
			return;
		}
		if ( this.connectionReady ) {
			this.spinner.show();
			this.http2.uploadExcel( this.file )
				.pipe(
					tap( () => this.spinner.hide() )
				)
				.subscribe( value => {
					const body = {
						channel_id: Number( this.channel.value ),
						file: value.payload.fullPath
					};
					console.log( body );
					this.ws.next( body );
				} );
		}
	}

	ngOnInit() {
		forkJoin(
			this.http.getAllChannelsByProject( this.projectId, undefined, true ),
			this.http.getChannelMetadata()
		)
			.pipe( untilDestroyed( this ), tap( () => this.spinner.hide() ) )
			.subscribe( value => {
				this.allChannel = value[ 0 ].filter( value1 => {
					return value[ 1 ].medias.find( value2 => value2.id === value1.data.media.id ).type === 'others';
				} );
			} );

		/*
		* TODO: KURANG IKI TOK KUDUNE
		*  PASANG ERROR AMBEK PROGRESS BAR
		* */
		this.ws
			.subscribe( ( value: WebsocketBody ) => {
				if ( value ) {
					this.uploadOnProgress = true;
					// Object.assign(this.message, value);
					this.message = value;
					this.cd.detectChanges();
					//// ERROR
					if ( this.message.code === 300 ) {
						this.toastr.error( value.message );
						setTimeout( () => {
							this.uploadOnProgress = false;
						}, 2000 );
					}
					//// DONE
					if ( this.message.code === 100 ) {
						this.toastr.success( value.message );
						setTimeout( () => {
							this.uploadOnProgress = false;
							this.closeDialog();
						}, 2000 );
					}

				} else {
					this.uploadOnProgress = false;
					this.message = undefined;
				}
			} );
	}

	ngOnDestroy() {
		this.ws.unsubscribe();
	}

}
