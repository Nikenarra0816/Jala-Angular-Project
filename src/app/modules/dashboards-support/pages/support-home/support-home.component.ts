import { FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashboardSupportService } from '@core/services/dashboard-support/dashboard-support.service';
import { ITutorialValues } from '@shared/models/tutorial.model';
import { IFaqValues } from '@shared/models/faq.model';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ITutorCategoryValues } from '@shared/models/tutorCategory.model';


interface Question {
	id: number;
	category: string;
	question: string;
}

@Component( {
	selector: 'app-support-home',
	templateUrl: './support-home.component.html',
	styleUrls: [ './support-home.component.scss' ],
	animations: [ trigger( 'expandCollapse', [
		state( 'false', style( {
			height: '0px',
			visibility: 'hidden'
		} ) ),
		state( 'true', style( {
			height: '*',
			visibility: 'visible'
		} ) ),
		transition( 'true <=> false', animate( '.3s ease' ) ) ]
	) ]
} )
export class SupportHomeComponent implements OnInit, OnDestroy {
	// Search

	searchInput = this.fb.control( '' );

	arrQuestion: ITutorCategoryValues[];
	arrResult: ITutorCategoryValues[];
	faqOpen;
	showResult = false;
	arrFaq: IFaqValues[];
	arrTutorial: ITutorialValues[];

	constructor(
		private fb: FormBuilder,
		private faqService: DashboardSupportService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		this.searchInput.valueChanges
			.pipe(
				untilDestroyed( this )
			)
			.subscribe( ( value: string ) => {
					if ( value === '' ) {
						this.showResult = false;
					} else {
						this.arrResult = this.arrQuestion.filter( value1 => {
							if ( value1.detail ) {
								this.showResult = true;
								return value1.detail.toLowerCase().indexOf( value.trim().toLowerCase() ) >= 0;
							}
						} );
						if ( this.arrResult.length === 0 ) {
							this.showResult = false;
						}
					}
				}
			);
	}

	jumpPage( val: ITutorialValues ) {
		this.faqService.tutorialData = val;
		this.router.navigate( [ '../category', val.id ], { relativeTo: this.activatedRoute } );
	}

	jumpPageDetail( tutorialId, questionId ) {
		this.faqService.tutorialData = this.arrTutorial.find( value => value.id === tutorialId );
		this.router.navigate( [ '../category', tutorialId ], { queryParams: { id: questionId }, relativeTo: this.activatedRoute } );
	}

	ngOnInit() {
		this.faqService.getFaq()
			.subscribe( data => {
					this.arrFaq = data.values;
				}
			);

		this.faqService.getTutorial()
			.pipe(
				tap( value => this.arrTutorial = value.values ),
				switchMap( value => {
					return forkJoin( value.values.map( value1 => this.faqService.getTutorCategory( value1.id ) ) );
				} ),
				map( value => value.map( value1 => value1.values ) ),
				map( value => value.reduce( ( acc, cur ) => {
					cur.forEach( value1 => acc.push( value1 ) );
					return acc;
				}, [] ) )
			)
			.subscribe( data => {
					this.arrQuestion = data;
				}
			);
	}

	ngOnDestroy(): void {
	}

}
