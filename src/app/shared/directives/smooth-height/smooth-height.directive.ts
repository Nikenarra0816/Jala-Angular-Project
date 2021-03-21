import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

export const appSmoothHeight = trigger( 'grow', [
	transition( 'void <=> *', [] ),
	transition( '* <=> *',
		[
			style( { height: '{{startHeight}}px' } ),
			animate( '.3s ease' ) ],
		{ params: { startHeight: 0 } } )
] );

@Directive( {
	selector: '[appSmoothHeight]'
} )
export class SmoothHeightDirective implements OnChanges {

	@Input()
	appSmoothHeight;
	pulse: boolean;
	startHeight: number;

	constructor( private element: ElementRef ) {
	}

	@HostBinding( 'style.display' ) display = 'block';

	@HostBinding( 'style.overflow' ) overflow = 'hidden';

	@HostBinding( '@grow' )
	get grow() {
		return { value: this.pulse, params: { startHeight: this.startHeight } };
	}

	setStartHeight() {
		this.startHeight = this.element.nativeElement.clientHeight;
	}

	ngOnChanges( changes ) {
		this.setStartHeight();
		this.pulse = !this.pulse;
	}

}
