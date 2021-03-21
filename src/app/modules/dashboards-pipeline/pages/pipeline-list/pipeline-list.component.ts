import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardPipelineService } from '@core/services/dashboard-pipeline/dashboard-pipeline.service';
import { Observable } from 'rxjs';
import { IPipeline } from '@shared/models/pipeline.model';
import { ToastrService } from 'ngx-toastr';
import { darkenColor } from '@shared/function/colorFunction';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, switchMap, tap } from 'rxjs/operators';
import { PipelineEmptyAddComponent } from '@jala-modules/dashboards-pipeline/pages/pipeline-empty/pipeline-empty-add/pipeline-empty-add.component';
import { MatDialog } from '@angular/material';
import { DialogConfirmationComponent } from '@shared/components/dialog-confirmation/dialog-confirmation.component';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component( {
	selector: 'app-pipeline-list',
	templateUrl: './pipeline-list.component.html',
	styleUrls: [ './pipeline-list.component.scss' ]
} )
export class PipelineListComponent implements OnInit, OnDestroy {

	data: Observable<IPipeline[]>;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private http: DashboardPipelineService,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private dialog: MatDialog,
	) {
	}

	changeColor( val, num ) {
		return darkenColor( val, num );
	}

	changeTitle( val: Partial<IPipeline> ) {
		this.spinner.show();
		this.http.updatePipeline( val.id, { name: val.name } )
			.pipe( tap( () => this.spinner.hide() ) )
			.subscribe( value => {
				this.toastr.success( 'Your pipeline has been successfully updated', 'Pipeline Update Success' );
				this.data = this.http.getAllPipeline();
			}, error => {
				this.toastr.error( 'Sorry your pipeline can’t be updated please contact us or go to help', 'Pipeline Update Error' );
			} );
	}

	jumpToDetail( val: IPipeline ) {
		this.http.colorUsed = { color: val.color, secondaryColor: this.changeColor( val.color, 0.5 ) };
		this.router.navigate( [ '../', val.id, 'detail' ], { relativeTo: this.activatedRoute } );
	}

	deletePipeline( val: IPipeline ) {
		const data = {
			h3: `Are you sure want to delete ${ val.name } ?`,
		};
		const dialogRef = this.dialog.open( DialogConfirmationComponent, { data } );
		dialogRef.afterClosed()
			.pipe(
				untilDestroyed( this ),
				filter( value => value ),
				switchMap( value => {
					return this.http.deletePipeline( val.id );
				} )
			)
			.subscribe( ( value ) => {
				this.data = this.http.getAllPipeline();
			} );
	}

	openAddDialog(): void {
		const dialogRef = this.dialog.open( PipelineEmptyAddComponent, {
			disableClose: true
		} );

		dialogRef.afterClosed().subscribe( result => {
			if ( result === 'success' ) {
				this.data = this.http.getAllPipeline();
			}
		} );
	}

	ngOnInit() {
		this.data = this.http.getAllPipeline();
	}

	ngOnDestroy(): void {
	}
}
