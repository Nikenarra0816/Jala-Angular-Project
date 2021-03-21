import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamEmptyComponent } from '@jala-modules/dashboards-team/pages/team-empty/team-empty.component';
import { EmptyTeamGuard } from '@core/guards/empty-team.guard';
import { TeamListComponent } from '@jala-modules/dashboards-team/pages/team-list/team-list.component';
import { TeamSalesTeamComponent } from '@jala-modules/dashboards-team/pages/team-sales-team/team-sales-team.component';
import { TeamSalesOfficerComponent } from '@jala-modules/dashboards-team/pages/team-sales-officer/team-sales-officer.component';
import { TeamSalesTeamAddComponent } from '@jala-modules/dashboards-team/pages/team-sales-team/team-sales-team-add/team-sales-team-add.component';
import { TeamSalesOfficerAddComponent } from '@jala-modules/dashboards-team/pages/team-sales-officer/team-sales-officer-add/team-sales-officer-add.component';
import { TeamSalesOfficerMigrateComponent } from '@jala-modules/dashboards-team/pages/team-sales-officer/team-sales-officer-migrate/team-sales-officer-migrate.component';
import { PermissionGuard } from '@core/guards/permission.guard';

const TEAM_ROUTE: Routes =
	[
		{
			path: '',
			pathMatch: 'full',
			redirectTo: 'empty',
		},
		{
			path: 'empty',
			component: TeamEmptyComponent,
			canActivate: [ EmptyTeamGuard ]
		},
		{
			path: 'list',
			component: TeamListComponent
		},
		{
			path: 'sales-team',
			component: TeamSalesTeamComponent
		},
		{
			path: 'new-sales-team',
			component: TeamSalesTeamAddComponent,
			canActivate: [ PermissionGuard ],
			data: {
				permission: { page: 'salesTeam', feature: 'add' }
			}
		},
		{
			path: 'sales-officer',
			component: TeamSalesOfficerComponent
		},
		{
			path: 'new-sales-officer',
			component: TeamSalesOfficerAddComponent
		},
		{
			path: 'migrate-sales-officer',
			component: TeamSalesOfficerMigrateComponent
		},
		{
			path: '**',
			redirectTo: 'empty'
		}
	];

@NgModule( {
	imports: [ RouterModule.forChild( TEAM_ROUTE ) ],
	exports: [ RouterModule ]
} )
export class DashboardsTeamRoutingModule {
}
