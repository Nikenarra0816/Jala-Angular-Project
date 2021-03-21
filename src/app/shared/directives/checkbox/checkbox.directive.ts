import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive( {
	selector: 'input[type="checkbox"][appCheckbox]'
} )
export class CheckboxDirective {
	svg = `
	<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M14.7803 0.299139C14.4874 -0.0997131 14.0126 -0.0997131 13.7197 0.299139L4.73421 12.5347L1.28035 7.83158C0.987465 7.43273 0.512621 7.43277 0.219682 7.83158C-0.0732275 8.23039 -0.0732275 8.87698 0.219682 9.27584L4.20388 14.701C4.49667 15.0998 4.97186 15.0995 5.26454 14.701L14.7803 1.74343C15.0732 1.34462 15.0732 0.697992 14.7803 0.299139Z" fill="#9B9B9B"/>
	</svg>
	`;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2,
		private control: NgControl
	) {
		// this.renderer.setStyle( this.el.nativeElement, 'display', 'none' );
		this.init( this.el );
	}

	init( el: ElementRef ) {
		const cbx = this.renderer.createElement( 'div' );
		this.renderer.addClass( cbx, 'checkbox-box' );
		this.renderer.setProperty( cbx, 'innerHTML', this.svg );
		this.renderer.appendChild( cbx, el.nativeElement );
	}
}
