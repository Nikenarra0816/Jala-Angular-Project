import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ITutorCategoryValues } from '@shared/models/tutorCategory.model';
import { DashboardSupportService } from '@core/services/dashboard-support/dashboard-support.service';
import { ITutorialGambar, ITutorialVideo } from '@shared/models/tutorial.model';
import { Observable } from 'rxjs';

@Component( {
	selector: 'app-support-category-body',
	templateUrl: './support-category-body.component.html',
	styleUrls: [ './support-category-body.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class SupportCategoryBodyComponent implements OnChanges {
	@Input() dataParent: ITutorCategoryValues;
	pageShow: 'VIDEO' | 'IMAGE' = 'IMAGE';
	dataImage$: Observable<ITutorialGambar>;
	dataVideo$: Observable<ITutorialVideo>;

	constructor( private http: DashboardSupportService, private cd: ChangeDetectorRef ) {
	}

	ngOnChanges( changes: SimpleChanges ): void {
		if ( changes.dataParent.currentValue ) {
			this.dataImage$ = this.http.getTutorGambar( this.dataParent.id );
			this.dataVideo$ = this.http.getTutorVideo( this.dataParent.id );
		}
	}

}
