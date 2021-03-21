import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITutorCategoryValues } from '@shared/models/tutorCategory.model';
import { DashboardSupportService } from '@core/services/dashboard-support/dashboard-support.service';
import { ITutorialValues } from '@shared/models/tutorial.model';
import { Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { tap } from 'rxjs/operators';

@Component( {
	selector: 'app-support-category',
	templateUrl: './support-category.component.html',
	styleUrls: [ './support-category.component.scss' ]
} )
export class SupportCategoryComponent implements OnInit, OnDestroy {

	pageShow = 0;

	arrTutorialCat: ITutorCategoryValues [];
	arrTutorialForChild: ITutorCategoryValues;
	tutorialData$: Observable<ITutorialValues>;


	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private tutCatService: DashboardSupportService,
	) {

	}

	changePage( urutan: number ) {
		this.pageShow = urutan;
		this.arrTutorialForChild = this.arrTutorialCat[ this.pageShow ];
	}

	ngOnInit() {
		const routeId = Number( this.activatedRoute.snapshot.paramMap.get( 'id' ) );
		const questionId = Number( this.activatedRoute.snapshot.queryParamMap.get( 'id' ) );
		this.tutorialData$ = this.tutCatService.tutorialData$
			.pipe(
				untilDestroyed( this ),
				tap( ( val ) => {
					if ( !val || isNaN( routeId ) ) {
						return this.router.navigate( [ 'help' ], { relativeTo: this.activatedRoute } );
					}
					this.tutCatService.getTutorCategory( routeId )
						.subscribe( data => {
							this.arrTutorialCat = data.values;
							if ( questionId ) {
								const index = this.arrTutorialCat.findIndex( value => value.id === questionId );
								this.changePage( index );
							} else {
								this.arrTutorialForChild = this.arrTutorialCat[ this.pageShow ];
							}
						} );
				} )
			);
	}

	ngOnDestroy(): void {
		this.tutCatService.tutorialData = undefined;
	}

}
