import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive( {
	selector: 'button[appJalaButtonIcon]'
} )
export class JalaButtonIconDirective implements AfterViewInit {
	@Input() set color( color: 'red' | 'green' | 'blue' | 'gray' | 'red-inverse' ) {

		this.removeAllClass();
		if ( color === 'red' ) {
			this.renderer.addClass( this.el.nativeElement, 'button-jala-icon-red' );
		} else if ( color === 'green' ) {
			this.renderer.addClass( this.el.nativeElement, 'button-jala-icon-green' );
		} else if ( color === 'red-inverse' ) {
			this.renderer.addClass( this.el.nativeElement, 'button-jala-icon-red-inverse' );
		} else if ( color === 'blue' ) {
			this.renderer.addClass( this.el.nativeElement, 'button-jala-icon-blue' );
		} else if ( color === 'gray' ) {
			this.renderer.addClass( this.el.nativeElement, 'button-jala-icon-gray--inverse' );
		}
	}

	@Input() round: boolean;

	@Input() set icon( icon: 'setting' | 'edit' | 'close' | 'eyes' | 'plus' | 'minus' | 'plus-thick' | 'migrate' | 'whatsapp' | 'phone' | 'email' | 'search' ) {
		const iconImage = `
				<svg class="button-jala-icon-svg">
				  <use xlink:href="assets/symbol-defs.svg#icon-${ icon }"></use>
				</svg>`;
		this.renderer.setProperty( this.el.nativeElement, 'innerHTML', iconImage );
	}

	private removeAllClass() {
		this.renderer.removeClass( this.el.nativeElement, 'button-jala-icon-red' );
		this.renderer.removeClass( this.el.nativeElement, 'button-jala-icon-blue' );
		this.renderer.removeClass( this.el.nativeElement, 'button-jala-icon-green' );
		this.renderer.removeClass( this.el.nativeElement, 'button-jala-icon-gray--inverse' );
		this.renderer.removeClass( this.el.nativeElement, 'button-jala-icon-red-inverse' );
	}

	constructor( private el: ElementRef, private renderer: Renderer2 ) {
		this.renderer.addClass( this.el.nativeElement, 'button-jala-icon' );
		this.renderer.addClass( this.el.nativeElement, 'button-jala-icon-red' );
	}

	private _setRipple( el: ElementRef ) {
		const ripple = this.renderer.createElement( 'div' );
		this.renderer.addClass( ripple, 'button-ripple' );
		this.renderer.setStyle( el.nativeElement, 'position', 'relative' );
		this.renderer.setStyle( el.nativeElement, 'overflow', 'hidden' );
		this.renderer.appendChild( el.nativeElement, ripple );
	}

	@HostListener( 'click' ) click() {
		this.renderer.addClass( this.el.nativeElement.lastElementChild, 'button-ripple-active' );
		this.renderer.addClass( this.el.nativeElement, 'button-click' );
		setTimeout( () => {
			this.renderer.removeClass( this.el.nativeElement.lastElementChild, 'button-ripple-active' );
			this.renderer.removeClass( this.el.nativeElement, 'button-click' );
		}, 500 );
	}

	ngAfterViewInit(): void {
		this._setRipple( this.el );

		if ( this.round ) {
			this.renderer.addClass( this.el.nativeElement, 'button-jala-icon-round' );
			this.renderer.addClass( this.el.nativeElement.firstElementChild, 'button-jala-icon-svg-round' );
		}

	}
}
