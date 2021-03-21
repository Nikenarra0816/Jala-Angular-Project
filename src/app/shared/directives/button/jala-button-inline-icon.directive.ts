import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive( {
	selector: 'button[appJalaButtonInlineIcon]'
} )
export class JalaButtonInlineIconDirective implements AfterViewInit, OnChanges {
	@Input() set color( color: 'primary' | 'outline' | 'green' ) {

		this.removeAllClass();
		this.renderer.addClass( this.el.nativeElement, `button-jala-inline-icon-${ color ? color : 'primary' }` );
	}

	@Input() round: boolean;

	private iconImage: string;
	private mainContainer = this.renderer.createElement( 'div' );

	@Input() set icon( icon: 'setting' | 'edit' | 'close' | 'eyes' | 'plus' | 'minus' | 'plus-thick' | 'migrate' | 'download' | 'upload' | 'home' | 'left-arrow' ) {
		this.iconImage = `
				  <use xlink:href="assets/symbol-defs.svg#icon-${ icon ? icon : 'plus' }"></use>
			`;
	}

	constructor(
		private el: ElementRef,
		private renderer: Renderer2
	) {
	}

	private removeAllClass() {
		this.renderer.removeClass( this.el.nativeElement, 'button-jala-inline-icon-primary' );
		this.renderer.removeClass( this.el.nativeElement, 'button-jala-inline-icon-outline' );
		this.renderer.removeClass( this.el.nativeElement, 'button-jala-inline-icon-green' );
	}

	private _setText( el ) {
		const text = this.renderer.createElement( 'span' );
		this.renderer.setProperty( text, 'innerText', this.el.nativeElement.innerText );
		this.renderer.addClass( text, 'button-jala-inline-icon-text' );
		this.renderer.setProperty( this.el.nativeElement, 'innerText', '' );

		this.renderer.addClass( el, 'button-jala-inline-icon-container' );
		this.renderer.appendChild( this.el.nativeElement, el );
		this.renderer.appendChild( el, text );
	}

	private _setIcon( el ) {
		const svg = this.renderer.createElement( 'svg', 'svg' );
		this.renderer.addClass( svg, 'button-jala-inline-icon-svg' );
		this.renderer.setProperty( svg, 'innerHTML', this.iconImage );
		this.renderer.appendChild( el, svg );
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
		this.renderer.addClass( this.el.nativeElement, 'button-jala-inline-icon' );
		this._setRipple( this.el );

	}

	ngOnChanges( changes: SimpleChanges ): void {
		this._setText( this.mainContainer );
		this._setIcon( this.mainContainer );
	}
}
