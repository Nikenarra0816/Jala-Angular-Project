import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ITutorialGambar } from '@shared/models/tutorial.model';

@Component( {
	selector: 'app-support-image-category',
	templateUrl: './support-image-category.component.html',
	styleUrls: [ './support-image-category.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class SupportImageCategoryComponent implements OnInit {
	@Input() dataParent: ITutorialGambar;

	constructor() {
	}

	ngOnInit(): void {
	}

}
