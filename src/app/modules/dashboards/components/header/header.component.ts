import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { switchMap, tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserProfileStoreService } from '@core/store/user-profile/user-profile-store.service';
import { User } from '@shared/models/user.model';
import { LeadsStoreService } from '@core/store/leads/leads-store.service';

@Component( {
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
} )
export class HeaderComponent implements OnInit, OnDestroy {

	// @Input() header : any;
	public name: Observable<User>;
	public openLogout = false;

	constructor(
		private http: AuthenticationService,
		private store: UserProfileStoreService,
		private storeLead: LeadsStoreService,
		private router: Router
	) {
	}

	logout() {
		this.http.logout()
			.pipe(
				tap( () => this.router.navigateByUrl( '/users' ) ),
				switchMap( () => this.storeLead.deleteStorage() )
			)
			.subscribe();
	}

	ngOnInit() {
		this.name = this.store.user$
			.pipe(
				untilDestroyed( this )
			);
	}

	ngOnDestroy(): void {
	}

}
