import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive( {
	selector: '[appIntersection]'
} )
export class IntersectionDirective implements AfterViewInit, OnDestroy {
	@Output() appIntersection = new EventEmitter();

	// tslint:disable-next-line:variable-name
	private _intersectionObserver?: IntersectionObserver;

	constructor(
		// tslint:disable-next-line:variable-name
		private _el: ElementRef
	) {
	}

	ngAfterViewInit(): void {
		this._intersectionObserver = new IntersectionObserver( entries => {
			this.checkForIntersection( entries );
		}, {} );
		this._intersectionObserver.observe( ( this._el.nativeElement ) as Element );
	}

	private checkForIntersection = ( entries: Array<IntersectionObserverEntry> ) => {
		entries.forEach( ( entry: IntersectionObserverEntry ) => {
			if ( this.checkIfIntersecting( entry ) ) {
				this.appIntersection.emit();
			}
		} );
	};

	private checkIfIntersecting( entry: IntersectionObserverEntry ) {
		return ( entry as any ).isIntersecting && entry.target === this._el.nativeElement;
	}

	ngOnDestroy(): void {
		this._intersectionObserver.unobserve( ( this._el.nativeElement ) as Element );
		this._intersectionObserver.disconnect();
	}

}
