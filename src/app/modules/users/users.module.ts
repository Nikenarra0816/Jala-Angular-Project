import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UsersRoutingModule } from './users-routing.module';
import { ForgotComponent } from './forgot/forgot.component';
import { UsersComponent } from './users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from '@shared/shared.module';
import { RegisterComponent } from './register/register.component';


@NgModule( {
	declarations: [
		LoginComponent,
		ForgotComponent,
		UsersComponent,
		ChangePasswordComponent,
		RegisterComponent,
	],
	imports: [
		CommonModule,
		UsersRoutingModule,
		SharedModule,
	]
} )
export class UsersModule {
}
