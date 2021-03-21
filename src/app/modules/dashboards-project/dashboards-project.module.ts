import { NgModule } from '@angular/core';
import { ProjectDetailComponent } from '@jala-modules/dashboards-project/pages/project-detail/project-detail.component';
import { ProjectEmptyComponent } from '@jala-modules/dashboards-project/pages/project-empty/project-empty.component';
import { ProjectListComponent } from '@jala-modules/dashboards-project/pages/project-list/project-list.component';
import { ProjectListGridViewComponent } from '@jala-modules/dashboards-project/pages/project-list/list-grid-view/project-list-grid-view.component';
import { ProjectListViewComponent } from '@jala-modules/dashboards-project/pages/project-list/list-view/project-list-view.component';
import { ProjectNewComponent } from '@jala-modules/dashboards-project/pages/project-new/project-new.component';
import { DashboardsProjectRoutingModule } from '@jala-modules/dashboards-project/dashboards-project-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProjectCampaignComponent } from './pages/project-campaign/project-campaign.component';
import { ProjectChannelComponent } from './pages/project-channel/project-channel.component';
import { ProjectLeadComponent } from './pages/project-lead/project-lead.component';
import { ProjectCampaignGridViewComponent } from './pages/project-campaign/project-campaign-grid-view/project-campaign-grid-view.component';
import { ProjectCampaignListViewComponent } from './pages/project-campaign/project-campaign-list-view/project-campaign-list-view.component';
import { ProjectChannelGridViewComponent } from './pages/project-channel/project-channel-grid-view/project-channel-grid-view.component';
import { ProjectChannelListViewComponent } from './pages/project-channel/project-channel-list-view/project-channel-list-view.component';
import { ProjectCampaignDialogComponent } from './pages/project-campaign/project-campaign-dialog/project-campaign-dialog.component';
import { ProjectChannelDialogComponent } from './pages/project-channel/project-channel-dialog/project-channel-dialog.component';
import { ProjectChannelAddComponent } from './pages/project-channel/project-channel-add/project-channel-add.component';
import { ProjectFormComponent } from './pages/project-form/project-form.component';
import { ProjectFormGuideDialogComponent } from './pages/project-form/project-form-guide-dialog/project-form-guide-dialog.component';
import { ProjectFormEditDialogComponent } from './pages/project-form/project-form-edit-dialog/project-form-edit-dialog.component';
import { ProjectFormAddComponent } from './pages/project-form/project-form-add/project-form-add.component';
import { DialogSuccessComponent } from './components/dialog-success/dialog-success.component';
import { SectionLeadsComponent } from './components/section-leads/section-leads.component';
import { ProjectLeadTableComponent } from './pages/project-lead/project-lead-table/project-lead-table.component';
import { OverlayLeadDetailComponent } from './components/overlay-lead-detail/overlay-lead-detail.component';
import { ProjectSettingComponent } from './pages/project-setting/project-setting.component';
import { ProjectSettingInformationComponent } from './pages/project-setting/project-setting-information/project-setting-information.component';
import { ProjectProductTableComponent } from './pages/project-product/project-product-table/project-product-table.component';
import { ProjectSettingStatusComponent } from './pages/project-setting/project-setting-status/project-setting-status.component';
import { ProjectProductEditDialogComponent } from './pages/project-product/project-product-edit-dialog/project-product-edit-dialog.component';
import { ProjectProductAddDialogComponent } from './pages/project-product/project-product-add-dialog/project-product-add-dialog.component';
import { DialogConfirmationComponent } from '@shared/components/dialog-confirmation/dialog-confirmation.component';
import { ProjectLeadDownloadDialogComponent } from './pages/project-lead/project-lead-download-dialog/project-lead-download-dialog.component';
import { ProjectLeadUploadDialogComponent } from './pages/project-lead/project-lead-upload-dialog/project-lead-upload-dialog.component';
import { ProjectAllLeadComponent } from './pages/project-all-lead/project-all-lead.component';
import { ProjectSettingStatusAddComponent } from './pages/project-setting/project-setting-status/project-setting-status-add/project-setting-status-add.component';
import { ProjectProductComponent } from './pages/project-product/project-product.component';
import { ProjectProductLeadComponent } from './pages/project-product/project-product-lead/project-product-lead.component';
import { ProjectCustomerComponent } from './pages/project-customer/project-customer.component';
import { ProjectCustomerTableComponent } from './pages/project-customer/project-customer-table/project-customer-table.component';
import { ProjectCustomerDialogComponent } from './pages/project-customer/project-customer-dialog/project-customer-dialog.component';
import { ProjectCustomerInvoiceDownloadDialogComponent } from './pages/project-customer/project-customer-invoice-download-dialog/project-customer-invoice-download-dialog.component';


@NgModule( {
	declarations: [
		ProjectDetailComponent,
		ProjectEmptyComponent,
		ProjectListComponent,
		ProjectListGridViewComponent,
		ProjectListViewComponent,
		ProjectNewComponent,
		ProjectCampaignComponent,
		ProjectChannelComponent,
		ProjectLeadComponent,
		ProjectCampaignGridViewComponent,
		ProjectCampaignListViewComponent,
		ProjectCampaignDialogComponent,
		ProjectChannelGridViewComponent,
		ProjectChannelListViewComponent,
		ProjectChannelDialogComponent,
		ProjectChannelAddComponent,
		ProjectFormComponent,
		ProjectFormGuideDialogComponent,
		ProjectFormEditDialogComponent,
		ProjectFormAddComponent,
		DialogSuccessComponent,
		SectionLeadsComponent,
		ProjectLeadTableComponent,
		OverlayLeadDetailComponent,
		ProjectSettingComponent,
		ProjectSettingInformationComponent,
		ProjectProductTableComponent,
		ProjectSettingStatusComponent,
		ProjectProductEditDialogComponent,
		ProjectProductAddDialogComponent,
		ProjectLeadDownloadDialogComponent,
		ProjectLeadUploadDialogComponent,
		ProjectAllLeadComponent,
		ProjectSettingStatusAddComponent,
		ProjectProductComponent,
		ProjectProductLeadComponent,
		ProjectCustomerComponent,
		ProjectCustomerTableComponent,
		ProjectCustomerDialogComponent,
		ProjectCustomerInvoiceDownloadDialogComponent,
	],
	imports: [
		CommonModule,
		DashboardsProjectRoutingModule,
		SharedModule
	],
	entryComponents: [
		DialogSuccessComponent,
		ProjectCampaignDialogComponent,
		ProjectChannelDialogComponent,
		ProjectFormGuideDialogComponent,
		ProjectFormEditDialogComponent,
		ProjectProductEditDialogComponent,
		ProjectProductAddDialogComponent,
		DialogConfirmationComponent,
		ProjectLeadDownloadDialogComponent,
		ProjectLeadUploadDialogComponent,
		ProjectSettingStatusAddComponent,
		ProjectCustomerDialogComponent,
		ProjectCustomerInvoiceDownloadDialogComponent
	]
} )
export class DashboardsProjectModule {
}
