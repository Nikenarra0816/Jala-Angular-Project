import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './dashboards.component';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SettingDashboardComponent } from './pages/setting-dashboard/setting-dashboard.component';
import { SettingProfileComponent } from './pages/setting-dashboard/pages/setting-profile/setting-profile.component';
import { SettingPasswordComponent } from './pages/setting-dashboard/pages/setting-password/setting-password.component';
import { SettingClientComponent } from './pages/setting-dashboard/pages/setting-client/setting-client.component';
import { SettingUserComponent } from './pages/setting-dashboard/pages/setting-user/setting-user.component';
import { SettingUsageComponent } from './pages/setting-dashboard/pages/setting-usage/setting-usage.component';
import { ReportDashboardComponent } from './pages/report-dashboard/report-dashboard.component';
import { BsDatepickerModule } from 'ngx-bootstrap';


@NgModule( {
	declarations: [
		DashboardsComponent,
		HomeDashboardComponent,
		HeaderComponent,
		FooterComponent,
		SettingDashboardComponent,
		SettingProfileComponent,
		SettingPasswordComponent,
		SettingClientComponent,
		SettingUserComponent,
		SettingUsageComponent,
		ReportDashboardComponent,
	],
	imports: [
		CommonModule,
		DashboardsRoutingModule,
		SharedModule,
		BsDatepickerModule
	]
} )
export class DashboardsModule {
}
