import { SupportCategoryComponent } from './pages/support-category/support-category.component';
import { SupportTicketChatComponent } from './pages/support-ticket-chat/support-ticket-chat.component';
import { SupportCreateTicketComponent } from './pages/support-create-ticket/support-create-ticket.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SupportHomeComponent } from '@jala-modules/dashboards-support/pages/support-home/support-home.component';

const SUPPORT_ROUTE: Routes =
	[
		{
			path: '',
			pathMatch: 'full',
			redirectTo: 'help',
		},
		{
			path: 'help',
			component: SupportHomeComponent,
			children: [
				{
					path: '',
					pathMatch: 'full',
					redirectTo: 'create-ticket',
				},
				{
					path: 'create-ticket',
					component: SupportCreateTicketComponent
				},
				{
					path: 'ticket-list',
					component: SupportTicketChatComponent
				},
			]
		},
		{
			path: 'category/:id',
			component: SupportCategoryComponent,
		},
		{
			path: '**',
			redirectTo: 'help'
		}
	];

@NgModule( {
	imports: [ RouterModule.forChild( SUPPORT_ROUTE ) ],
	exports: [ RouterModule ]
} )
export class DashboardsSupportRoutingModule {
}
