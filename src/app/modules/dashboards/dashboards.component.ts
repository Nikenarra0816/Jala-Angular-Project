import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationStoreService } from '@core/store/authentication/authentication-store.service';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ToastrService } from 'ngx-toastr';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { DashboardProfileService } from '@core/services/dashboard-profile/dashboard-profile.service';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { LeadsStoreService } from '@core/store/leads/leads-store.service';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserProfileStoreService } from '@core/store/user-profile/user-profile-store.service';

@Component( {
	selector: 'app-dashboards',
	templateUrl: './dashboards.component.html',
	styleUrls: [ './dashboards.component.scss' ],
	animations: [
		trigger( 'routeAnimations', [
			transition( '* <=> *', [
				// Set a default  style for enter and leave
				query( ':enter, :leave', [
					style( {
						position: 'absolute',
						left: 0,
						transformOrigin: 'top',
						width: '100%',
					} ),
				], { optional: true } ),
				query( ':enter', [
					style( {
						opacity: 0, transform: 'scale(.95) translateY(0)'
					} ),
				], { optional: true } ),
				// Animate the new page in
				query( ':leave', [
					animate( '300ms ease', style( { opacity: 0, transform: 'scale(.95) translateY(0)' } ) ),
				], { optional: true } ),
				query( ':enter', [
					animate( '300ms ease', style( { opacity: 1, transform: 'scale(1) translateY(0)' } ) ),
				], { optional: true } ),
			] ),
		] )
	]
} )
export class DashboardsComponent implements OnInit, OnDestroy {

	constructor(
		private storeProfile: UserProfileStoreService,
		private store2: LeadsStoreService,
		private http: DashboardProfileService,
		private http2: DashboardProjectService,
		private toastr: ToastrService,
		private router: Router,
	) {
	}

	prepareRoute( outlet: RouterOutlet ) {
		return outlet && outlet.activatedRouteData;
	}

	ngOnInit() {
		this.storeProfile.user$
			.pipe(
				untilDestroyed( this ),
				tap( value => this.toastr.success( `Welcome Back ${ value.data.name }`, 'Login Success' ) ),
				filter( value => !value.isProfileComplete ),
				take( 1 ),
			)
			.subscribe( value => {
				setTimeout( () => {
					this.router.navigateByUrl( '/dashboard/setting' );
					this.toastr.warning( 'Please Complete your profile before continue', 'User Profile Setting' );
				}, 1000 );
			} );
		this.http2.setStoreAllLeads()
			.pipe( untilDestroyed( this ) )
			.subscribe( value => {
			} );
	}

	ngOnDestroy(): void {
	}
}
