import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsSupportRoutingModule } from '@jala-modules/dashboards-support/dashboards-support-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SupportHomeComponent } from '@jala-modules/dashboards-support/pages/support-home/support-home.component';
import { SupportCreateTicketComponent } from './pages/support-create-ticket/support-create-ticket.component';
import { SupportTicketChatComponent } from './pages/support-ticket-chat/support-ticket-chat.component';
import { CollapsibleComponent } from './components/collapsible/collapsible.component';
import { SupportCategoryComponent } from './pages/support-category/support-category.component';
import { SupportImageCategoryComponent } from './pages/support-image-category/support-image-category.component';
import { SupportVideoCategoryComponent } from './pages/support-video-category/support-video-category.component';
import { SupportCategoryBodyComponent } from './pages/support-category-body/support-category-body.component';


@NgModule( {
	declarations: [
		SupportHomeComponent,
		SupportCreateTicketComponent,
		SupportTicketChatComponent,
		CollapsibleComponent,
		SupportCategoryComponent,
		SupportImageCategoryComponent,
		SupportVideoCategoryComponent,
		SupportCategoryBodyComponent,
	],
	imports: [
		CommonModule,
		DashboardsSupportRoutingModule,
		SharedModule
	]
} )
export class DashboardsSupportModule {
}
