import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive( {
	selector: 'button[appJalaButton]'
} )
export class JalaButtonDirective implements AfterViewInit {

	@Input() set color( color: 'primary' | 'outline' | 'green' | 'gray' | 'dark' ) {
		this.removeAllColor();
		this.renderer.addClass( this.el.nativeElement, `button-${ color }` );
	}

	constructor( private el: ElementRef, private renderer: Renderer2 ) {
	}

	ripple = this.renderer.createElement( 'div' );

	private removeAllColor() {
		this.renderer.removeClass( this.el.nativeElement, 'button-primary' );
		this.renderer.removeClass( this.el.nativeElement, 'button-outline' );
		this.renderer.removeClass( this.el.nativeElement, 'button-green' );
		this.renderer.removeClass( this.el.nativeElement, 'button-gray' );
		this.renderer.removeClass( this.el.nativeElement, 'button-dark' );
	}

	private _setRipple() {
		this.renderer.addClass( this.ripple, 'button-ripple' );
		this.renderer.setStyle( this.el.nativeElement, 'position', 'relative' );
		this.renderer.setStyle( this.el.nativeElement, 'overflow', 'hidden' );
		this.renderer.appendChild( this.el.nativeElement, this.ripple );
	}

	private _setText() {
		const text = this.renderer.createElement( 'span' );
		this.renderer.setProperty( text, 'innerText', this.el.nativeElement.innerText );
		this.renderer.addClass( text, 'button-jala-text' );
		this.renderer.setProperty( this.el.nativeElement, 'innerText', '' );
		this.renderer.appendChild( this.el.nativeElement, text );
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
		this._setText();
		this.renderer.addClass( this.el.nativeElement, 'button-jala' );
		this.renderer.addClass( this.el.nativeElement, 'button-primary' );
		this._setRipple();

	}
}
