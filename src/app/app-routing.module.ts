import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '@core/guards/auth-guard.service';
import { LoginGuardService } from '@core/guards/login-guard.service';
import { CheckPaymentGuard } from '@core/guards/check-payment.guard';

const APP_ROUTES = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{
		path: 'users',
		loadChildren: () => import('./modules/users/users.module').then( res => res.UsersModule ),
		canActivate: [ LoginGuardService ]
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./modules/dashboards/dashboards.module').then( res => res.DashboardsModule ),
		canLoad: [ AuthGuardService ],
		canActivate: [ AuthGuardService /*, CheckPaymentGuard */ ]
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}
];


@NgModule( {
	imports: [ RouterModule.forRoot( APP_ROUTES, { scrollPositionRestoration: 'top' } ) ],
	exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
