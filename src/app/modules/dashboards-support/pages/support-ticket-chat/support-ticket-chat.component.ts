import { Component, OnInit } from '@angular/core';
import { DashboardSupportService } from '@core/services/dashboard-support/dashboard-support.service';
import { AuthenticationStoreService } from '@core/store/authentication/authentication-store.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ITicket } from '@shared/models/ticket.model';

@Component( {
	selector: 'app-support-ticket-chat',
	templateUrl: './support-ticket-chat.component.html',
	styleUrls: [ './support-ticket-chat.component.scss' ]
} )
export class SupportTicketChatComponent implements OnInit {

	ticket$: Observable<ITicket>;

	constructor(
		private http: DashboardSupportService,
		private user: AuthenticationStoreService,
	) {
	}

	input = new FormControl( '' );

	// pushMessage() {
	// 	if ( !( !this.input.value || !this.input.value.trim() ) ) {
	// 		const body: ITicketChat = {
	// 			message: this.input.value,
	// 			createdAt: format( new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx' ),
	// 			attachment: [],
	// 			from: 'client'
	// 		};
	// 		this.dataChat = [ ...this.dataChat, body ];
	// 		this.input.reset();
	// 	}
	// }


	ngOnInit() {
		this.ticket$ = this.http.getTicketById( this.user.authState.user[ 'custom:user_id' ] );
	}

}
