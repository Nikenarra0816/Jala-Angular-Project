import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PipelineEmptyAddComponent } from '@jala-modules/dashboards-pipeline/pages/pipeline-empty/pipeline-empty-add/pipeline-empty-add.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component( {
	selector: 'app-pipeline-empty',
	templateUrl: './pipeline-empty.component.html',
	styleUrls: [ './pipeline-empty.component.scss' ]
} )
export class PipelineEmptyComponent implements OnInit {

	constructor(
		private dialog: MatDialog,
		private router: Router,
		private activatedRoute: ActivatedRoute,
	) {
	}


	openDialog(): void {
		const dialogRef = this.dialog.open( PipelineEmptyAddComponent, {
			disableClose: true
		} );

		dialogRef.afterClosed().subscribe( result => {
			if ( result === 'success' ) {
				this.router.navigate( [ '../list' ], { relativeTo: this.activatedRoute } );
			}
		} );
	}


	ngOnInit() {
	}

}
