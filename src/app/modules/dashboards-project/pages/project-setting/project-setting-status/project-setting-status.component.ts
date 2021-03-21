import { Component, Input, OnInit } from '@angular/core';
import { IProjectMetadata, Project } from '@shared/models/project.model';
import { inOutAnimation } from '@shared/animations/inOutAnimation';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProjectSettingStatusAddComponent } from '@jala-modules/dashboards-project/pages/project-setting/project-setting-status/project-setting-status-add/project-setting-status-add.component';
import { tap } from 'rxjs/operators';

@Component( {
	selector: 'app-project-setting-status',
	templateUrl: './project-setting-status.component.html',
	styleUrls: [ './project-setting-status.component.scss' ],
	animations: [ inOutAnimation ]
} )
export class ProjectSettingStatusComponent implements OnInit {
	@Input() dataProject: Project;
	@Input() metadata: IProjectMetadata;

	// initialStatus: LeadStatus[];
	leadsStatus: ICustomLeadsStatus[] = [];
	checkLeadsStatus: ICustomLeadsStatus[] = [];
	customLeadsStatus: ICustomLeadsStatus[] = [];

	constructor(
		private http: DashboardProjectService,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private router: Router,
		private dialog: MatDialog
	) {
	}

	isChecked( item: ICustomLeadsStatus ) {
		const index = this.checkLeadsStatus.findIndex( value => {
			return value.name === item.name;
		} );
		return index !== -1;
	}

	changeStatus( item: ICustomLeadsStatus, checked ) {
		if ( checked ) {
			this.checkLeadsStatus.push( item );
		} else {
			const i = this.checkLeadsStatus.findIndex( value => value.name === item.name );
			this.checkLeadsStatus.splice( i, 1 );
		}
		this.checkLeadsStatus.sort( ( a, b ) => a.category.id - b.category.id );
	}

	changeValue( name, event ) {
		const index = this.checkLeadsStatus.findIndex( value => value.name === name );
		this.checkLeadsStatus[index].point = Number( event );
	}

	openDialog(): void {
		const dialogRef = this.dialog.open( ProjectSettingStatusAddComponent, {
			data: this.metadata
		} );

		dialogRef.afterClosed().subscribe( result => {
			if ( result ) {
				this.customLeadsStatus.push( result );
				this.customLeadsStatus.sort( ( a, b ) => a.category.id - b.category.id );
			}
		} );
	}

	submit() {
		this.spinner.show();
		const body = {
			leadStatuses: this.checkLeadsStatus.map( value => {
				if ( value.id === undefined ) {
					return {
						point: value.point,
						category: { id: value.category.id },
						sort: value.category.id,
						name: value.name
					};
				}
				return {
					point: value.point,
					id: value.id,
					category: { id: value.category.id },
					sort: value.category.id,
					name: value.name
				};
			} )
		};
		this.http.updateProject( this.dataProject.data.id, body )
			.pipe( tap( () => this.spinner.hide() ) )
			.subscribe(
				value => {
					this.toastr.success( 'Your project has been successfully added', 'Project Add Success' );
					this.router.navigateByUrl( 'dashboard/project/list' );
				}, error => {
					this.toastr.error( 'Sorry your project can’t be added please contact us or go to help', 'Project Add Error' );
				} );
	}

	ngOnInit(): void {
		this.http.getAllLeadStatus()
			.subscribe(
				value => {
					// this.initialStatus = value;
					this.leadsStatus = value.reduce( ( acc, cur ) => {
						return [ ...acc, ...cur.getStatusesEditProject ];
					}, [] );
					this.dataProject.data.leadStatuses.forEach( value1 => {
						const item = this.leadsStatus.find( value2 => value2.name === value1.name );
						if ( item ) {
							this.checkLeadsStatus.push( {
								id: value1.id,
								name: value1.name,
								point: value1.point,
								color: item.color,
								category: {
									id: value1.category.id
								}
							} );
							return;
						}
						const item2 = this.leadsStatus.find( value2 => value2.category.id === value1.category.id );
						if ( item2 ) {
							const x = {
								id: value1.id,
								name: value1.name,
								point: value1.point,
								color: item2.color,
								category: {
									id: value1.category.id
								}
							};
							this.checkLeadsStatus.push( x );
							this.customLeadsStatus.push( x );
							return;
						}
					} );

					this.metadata.custom_status.forEach( value1 => {

						value1.statuses.forEach( value2 => {
							const leadStatus = this.customLeadsStatus.findIndex( value3 => value3.name === value2.name );
							if ( leadStatus === -1 ) {
								this.customLeadsStatus.push( {
									id: undefined,
									name: value2.name,
									category: { id: value1.id },
									color: value1.color,
									point: value2.point
								} );
							}
						} );

					} );


					this.checkLeadsStatus.sort( ( a, b ) => a.category.id - b.category.id );
				}
			);
	}

}

interface ICustomLeadsStatus {
	id?: number;
	name: string;
	point: number;
	color: string;
	category: {
		id: number
	};
}
