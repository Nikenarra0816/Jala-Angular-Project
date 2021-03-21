import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationStoreService } from '@core/store/authentication/authentication-store.service';
import { UserProfileStoreService } from '@core/store/user-profile/user-profile-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter, take, tap } from 'rxjs/operators';

@Directive( {
	selector: '[appPermission]'
} )
export class PermissionDirective implements OnInit, OnDestroy {
	@Input() appPermission: { page: string, feature: string };

	constructor(
		// private authService: AuthenticationStoreService,
		private viewContainerRef: ViewContainerRef,
		private templateRef: TemplateRef<any>,
		private profileService: UserProfileStoreService,
	) {
	}

	ngOnInit(): void {
		this.profileService.user$
			.pipe(
				untilDestroyed( this ),
				filter( value => !!value ),
				take( 1 ),
			)
			.subscribe( value => {
				const roles = value.data.privileges;
				const x = roles[this.appPermission.page][this.appPermission.feature];
				if ( x ) {
					this.viewContainerRef.createEmbeddedView( this.templateRef );
				} else {
					this.viewContainerRef.clear();
				}
			} );
	}

	ngOnDestroy(): void {
	}
}
