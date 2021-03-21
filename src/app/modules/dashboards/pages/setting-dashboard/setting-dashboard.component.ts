import { Component, OnInit } from '@angular/core';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { UserProfileStoreService } from '@core/store/user-profile/user-profile-store.service';
import { Observable } from 'rxjs';
import { User } from '@shared/models/user.model';

@Component( {
	selector: 'app-setting-dashboard',
	templateUrl: './setting-dashboard.component.html',
	styleUrls: [ './setting-dashboard.component.scss' ],
	animations: [
		trigger( 'routeAnimations', [
			transition( '* => *', [
				// Intinya query iku sequence
				query(
					':enter, :leave',
					[ style( { width: '100%', display: 'block', transformOrigin: 'top' } ) ],
					{ optional: true }
				),
				query( ':leave',
					[ style( { opacity: 1, visibility: 'visible', transform: 'translateX(0)', position: 'absolute', left: 0, top: 0 } ) ],
					{ optional: true } ),
				query( ':enter',
					[ style( { opacity: 0, visibility: 'hidden', transform: 'translateX(100%)' } ) ],
					{ optional: true } ),
				query(
					':leave',
					// here we apply a style and use the animate function to apply the style over 0.3 seconds
					[ animate( '.3s', style( { opacity: 0, transform: 'translateX(-100%)' } ) ) ],
					{ optional: true }
				),
				query(
					':enter',
					[ animate( '.3s', style( { opacity: 1, visibility: 'visible', transform: 'translateX(0)' } ) ) ],
					{ optional: true }
				)
			] )
		] )
	]
} )
export class SettingDashboardComponent implements OnInit {

	constructor(
		private store: UserProfileStoreService
	) {
	}

	dataUser: Observable<User>;

	ngOnInit() {
		this.dataUser = this.store.user$;
	}

}
