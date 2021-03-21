import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ITutorialVideo } from '@shared/models/tutorial.model';

@Component( {
	selector: 'app-support-video-category',
	templateUrl: './support-video-category.component.html',
	styleUrls: [ './support-video-category.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )

export class SupportVideoCategoryComponent implements OnChanges {
	@Input() dataParent: ITutorialVideo;

	urls: SafeResourceUrl[];

	constructor( public sanitizer: DomSanitizer ) {
	}

	isLoading: boolean[];

	domSanitizer( url: string ): SafeResourceUrl {
		const parsedUrl = this.parseUrlYoutube( url );
		return this.sanitizer.bypassSecurityTrustResourceUrl( 'https://youtube.com/embed/' + parsedUrl );
	}

	parseUrlYoutube( url ) {
		const regex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
		const r = url.match( regex );
		return r[ 1 ];
	}

	isLoaded( i ) {
		if ( i === -1 ) {
			return;
		}
		this.isLoading[ i ] = false;
	}

	ngOnChanges( changes: SimpleChanges ): void {
		const dataParent = changes.dataParent;
		if ( dataParent.currentValue ) {
			if ( dataParent.currentValue.values.length !== 0 ) {
				this.urls = dataParent.currentValue.values.map( val => this.domSanitizer( val.link ) );
				this.isLoading = Array.from( Array( this.urls.length ), () => true );
			}
		}
	}
}
