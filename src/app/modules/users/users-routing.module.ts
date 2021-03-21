import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { UsersComponent } from './users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordGuardService } from '@core/guards/change-password-guard.service';

const APP_ROUTES: Routes = [
	{
		path: '',
		component: UsersComponent,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent,
				data: {
					users: 'login'
				}
			},
			{
				path: 'forgot',
				component: ForgotComponent,
				data: {
					users: 'forgot'
				}
			},
			{
				path: 'change-password',
				component: ChangePasswordComponent,
				data: {
					users: 'change-password'
				},
				canActivate: [ ChangePasswordGuardService ]
			},
			{
				path: 'register',
				component: RegisterComponent,
				data: {
					users: 'register'
				}
			},
			{
				path: '**',
				redirectTo: 'login'
			}
		]
	},
	{
		path: '**',
		redirectTo: ''
	}

];


@NgModule( {
	imports: [ RouterModule.forChild( APP_ROUTES ) ],
	exports: [ RouterModule ]
} )
export class UsersRoutingModule {
}
