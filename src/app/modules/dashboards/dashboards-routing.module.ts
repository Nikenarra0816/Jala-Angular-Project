import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { SettingDashboardComponent } from './pages/setting-dashboard/setting-dashboard.component';
import { SettingProfileComponent } from './pages/setting-dashboard/pages/setting-profile/setting-profile.component';
import { SettingPasswordComponent } from './pages/setting-dashboard/pages/setting-password/setting-password.component';
import { SettingClientComponent } from './pages/setting-dashboard/pages/setting-client/setting-client.component';
import { SettingUserComponent } from './pages/setting-dashboard/pages/setting-user/setting-user.component';
import { SettingUsageComponent } from './pages/setting-dashboard/pages/setting-usage/setting-usage.component';
import { ReportDashboardComponent } from '@jala-dashboards/pages/report-dashboard/report-dashboard.component';
import { PermissionGuard } from '@core/guards/permission.guard';
import { CheckProfileGuard } from '@core/guards/check-profile.guard';

const APP_ROUTES: Routes = [
	{
		path: '',
		component: DashboardsComponent,
		canActivate: [ CheckProfileGuard ],
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'home'
			},
			{
				path: 'home',
				component: HomeDashboardComponent
			},
			{
				path: 'team',
				loadChildren: () => import('@jala-modules/dashboards-team/dashboards-team.module').then( res => res.DashboardsTeamModule )
			},
			{
				path: 'project',
				loadChildren: () => import('@jala-modules/dashboards-project/dashboards-project.module').then( res => res.DashboardsProjectModule )
			},
			{
				path: 'pipeline',
				loadChildren: () => import('@jala-modules/dashboards-pipeline/dashboards-pipeline.module').then( res => res.DashboardsPipelineModule ),
				canActivate: [ PermissionGuard ],
				data: {
					permission: { page: 'pipeline', feature: 'add' }
				}
			},
			{
				path: 'report',
				component: ReportDashboardComponent
			},
			{
				path: 'setting',
				component: SettingDashboardComponent,
				children: [
					{
						path: '',
						pathMatch: 'full',
						redirectTo: 'profile'
					},
					{
						path: 'profile',
						component: SettingProfileComponent
					},
					{
						path: 'password',
						component: SettingPasswordComponent
					},
					{
						path: 'client',
						component: SettingClientComponent
					},
					{
						path: 'user',
						component: SettingUserComponent
					},
					{
						path: 'usage',
						component: SettingUsageComponent
					},
					{
						path: '**',
						redirectTo: 'home'
					}
				]
			},
			{
				path: 'support',
				loadChildren: () => import('@jala-modules/dashboards-support/dashboard-support.module').then( res => res.DashboardsSupportModule )
			},
			{
				path: '**',
				redirectTo: 'home'
			}
		]
	}
];

@NgModule( {
	imports: [ RouterModule.forChild( APP_ROUTES ) ],
	exports: [ RouterModule ]
} )
export class DashboardsRoutingModule {
}
