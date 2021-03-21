import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from '@jala-modules/dashboards-project/pages/project-detail/project-detail.component';
import { ProjectEmptyComponent } from '@jala-modules/dashboards-project/pages/project-empty/project-empty.component';
import { ProjectListComponent } from '@jala-modules/dashboards-project/pages/project-list/project-list.component';
import { ProjectNewComponent } from '@jala-modules/dashboards-project/pages/project-new/project-new.component';
import { ProjectChannelAddComponent } from '@jala-modules/dashboards-project/pages/project-channel/project-channel-add/project-channel-add.component';
import { ProjectFormComponent } from '@jala-modules/dashboards-project/pages/project-form/project-form.component';
import { ProjectFormAddComponent } from '@jala-modules/dashboards-project/pages/project-form/project-form-add/project-form-add.component';
import { ProjectSettingComponent } from '@jala-modules/dashboards-project/pages/project-setting/project-setting.component';
import { EmptyProjectGuard } from '@core/guards/empty-project.guard';
import { ProjectChannelComponent } from '@jala-modules/dashboards-project/pages/project-channel/project-channel.component';
import { ProjectCampaignComponent } from '@jala-modules/dashboards-project/pages/project-campaign/project-campaign.component';
import { ProjectLeadComponent } from '@jala-modules/dashboards-project/pages/project-lead/project-lead.component';
import { ProjectAllLeadComponent } from '@jala-modules/dashboards-project/pages/project-all-lead/project-all-lead.component';
import { PermissionGuard } from '@core/guards/permission.guard';
import { ProjectProductComponent } from '@jala-modules/dashboards-project/pages/project-product/project-product.component';
import { ProjectProductLeadComponent } from '@jala-modules/dashboards-project/pages/project-product/project-product-lead/project-product-lead.component';
import { ProjectCustomerComponent } from '@jala-modules/dashboards-project/pages/project-customer/project-customer.component';

const PROJECT_ROUTE: Routes =
	[
		{
			path: '',
			pathMatch: 'full',
			redirectTo: 'empty',
		},
		{
			path: 'empty',
			component: ProjectEmptyComponent,
			canActivate: [ EmptyProjectGuard ]
		},
		{
			path: 'list',
			component: ProjectListComponent
		},
		{
			path: 'form',
			component: ProjectFormComponent
		},
		{
			path: 'new-form',
			component: ProjectFormAddComponent,
			canActivate: [ PermissionGuard ],
			data: {
				permission: { page: 'form', feature: 'add' }
			}
		},
		{
			path: 'new',
			component: ProjectNewComponent,
			canActivate: [ PermissionGuard ],
			data: {
				permission: { page: 'project', feature: 'add' }
			}
		},
		{
			path: 'all-lead',
			component: ProjectAllLeadComponent
		},
		{
			path: 'product',
			children: [
				{
					path: '',
					component: ProjectProductComponent
				},
				{
					path: 'lead',
					component: ProjectProductLeadComponent
				},
				{
					path: '**',
					redirectTo: ''
				}
			]
		},
		{
			path: ':id/detail',
			component: ProjectDetailComponent,
			children: [
				{
					path: '',
					pathMatch: 'full',
					redirectTo: 'campaign',
				},
				{
					path: 'campaign',
					component: ProjectCampaignComponent
				},
				{
					path: 'channel',
					component: ProjectChannelComponent
				},
				{
					path: 'lead',
					component: ProjectLeadComponent
				},
				{
					path: 'customer',
					component: ProjectCustomerComponent,
					canActivate: [ PermissionGuard ],
					data: {
						permission: { page: 'customer', feature: 'add' }
					}
				},
			]
		},
		{
			path: ':id/setting',
			component: ProjectSettingComponent,
			canActivate: [ PermissionGuard ],
			data: {
				permission: { page: 'project', feature: 'edit' }
			}
		},
		{
			path: ':id/new-channel',
			component: ProjectChannelAddComponent,
			canActivate: [ PermissionGuard ],
			data: {
				permission: { page: 'channel', feature: 'add' }
			}
		},
		{
			path: '**',
			redirectTo: 'empty'
		}
	];


@NgModule( {
	imports: [ RouterModule.forChild( PROJECT_ROUTE ) ],
	exports: [ RouterModule ]
} )
export class DashboardsProjectRoutingModule {
}
