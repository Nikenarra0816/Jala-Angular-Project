import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component( {
	selector: 'app-root',
	template: `
		<router-outlet></router-outlet>
		<ngx-spinner
			class="loader"
			bdColor="rgba(0,0,0,.7)"
			size="medium"
			color="#fff"
			type="timer"
			[fullScreen]="true">
			<p style="color: white"> Please Wait... </p>
		</ngx-spinner>
	`,
} )
export class AppComponent implements OnInit, OnDestroy {

	constructor(
		private spinner: NgxSpinnerService,
		private router: Router,
	) {
	}

	ngOnInit(): void {
		this.router.events
			.pipe( untilDestroyed( this ) )
			.subscribe( event => {
				if ( event instanceof RouteConfigLoadStart ) {
					this.spinner.show();
				} else if ( event instanceof RouteConfigLoadEnd ) {
					this.spinner.hide();
				}
			} );
	}

	ngOnDestroy(): void {
	}
}
