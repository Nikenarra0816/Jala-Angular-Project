import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileStoreService } from '@core/store/user-profile/user-profile-store.service';
import { filter, map, take, tap } from 'rxjs/operators';

@Injectable()
export class PermissionGuard implements CanActivate {

	constructor(
		private router: Router,
		private profileService: UserProfileStoreService,
	) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.profileService.user$
			.pipe(
				filter( value => !!value ),
				take( 1 ),
				map( value => {
					const data = next.data.permission;
					const roles = value.data.privileges;
					const x = roles[data.page][data.feature];
					if ( !x ) {
						this.router.navigateByUrl( '/dashboard/home' );
					}
					return x;
				} )
			);
	}

}
