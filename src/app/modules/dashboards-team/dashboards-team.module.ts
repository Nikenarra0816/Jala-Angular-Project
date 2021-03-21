import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DashboardsTeamRoutingModule } from '@jala-modules/dashboards-team/dashboards-team-routing.module';
import { TeamEmptyComponent } from '@jala-modules/dashboards-team/pages/team-empty/team-empty.component';
import { TeamListComponent } from './pages/team-list/team-list.component';
import { TeamSalesTeamComponent } from './pages/team-sales-team/team-sales-team.component';
import { TeamSalesTeamGridViewComponent } from './pages/team-sales-team/team-sales-team-grid-view/team-sales-team-grid-view.component';
import { TeamSalesTeamListViewComponent } from './pages/team-sales-team/team-sales-team-list-view/team-sales-team-list-view.component';
import { TeamSalesOfficerComponent } from './pages/team-sales-officer/team-sales-officer.component';
import { OverlayTeamDetailComponent } from './components/overlay-team-detail/overlay-team-detail.component';
import { TeamSalesOfficerListViewComponent } from './pages/team-sales-officer/team-sales-officer-list-view/team-sales-officer-list-view.component';
import { TeamSalesOfficerGridViewComponent } from './pages/team-sales-officer/team-sales-officer-grid-view/team-sales-officer-grid-view.component';
import { OverlayOfficerDetailComponent } from './components/overlay-officer-detail/overlay-officer-detail.component';
import { TeamSalesTeamDialogComponent } from './pages/team-sales-team/team-sales-team-dialog/team-sales-team-dialog.component';
import { TeamSalesTeamAddComponent } from './pages/team-sales-team/team-sales-team-add/team-sales-team-add.component';
import { TeamSalesOfficerDialogComponent } from './pages/team-sales-officer/team-sales-officer-dialog/team-sales-officer-dialog.component';
import { TeamSalesOfficerAddComponent } from './pages/team-sales-officer/team-sales-officer-add/team-sales-officer-add.component';
import { TeamSalesOfficerMigrateComponent } from './pages/team-sales-officer/team-sales-officer-migrate/team-sales-officer-migrate.component';
import { TeamSalesOfficerMigrateTableComponent } from './pages/team-sales-officer/team-sales-officer-migrate-table/team-sales-officer-migrate-table.component';


@NgModule( {
	declarations: [
		TeamEmptyComponent,
		TeamListComponent,
		TeamSalesTeamComponent,
		TeamSalesTeamGridViewComponent,
		TeamSalesTeamListViewComponent,
		TeamSalesOfficerComponent,
		OverlayTeamDetailComponent,
		TeamSalesOfficerListViewComponent,
		TeamSalesOfficerGridViewComponent,
		OverlayOfficerDetailComponent,
		TeamSalesTeamDialogComponent,
		TeamSalesTeamAddComponent,
		TeamSalesOfficerDialogComponent,
		TeamSalesOfficerAddComponent,
		TeamSalesOfficerMigrateComponent,
		TeamSalesOfficerMigrateTableComponent
	],
	imports: [
		CommonModule,
		DashboardsTeamRoutingModule,
		SharedModule
	],
	entryComponents: [
		TeamSalesTeamDialogComponent,
		TeamSalesOfficerDialogComponent
	]
} )
export class DashboardsTeamModule {
}
