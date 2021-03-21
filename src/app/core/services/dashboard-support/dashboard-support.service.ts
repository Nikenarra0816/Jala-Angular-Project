import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFaq } from '@shared/models/faq.model';
import { ITutorial, ITutorialGambar, ITutorialValues, ITutorialVideo } from '@shared/models/tutorial.model';
import { ITutorCategory } from '@shared/models/tutorCategory.model';
import { ApiService } from '@core/services/api.service';
import { ITicket } from '@shared/models/ticket.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DashboardSupportService {
	apiUrl = this.apiService.getUrlSupport + '/faq/1';
	apiUrlTutorial = this.apiService.getUrlSupport + '/tutorial/1';
	apiUrlContent = this.apiService.getUrlSupport + '/tutorial_content/';
	apiUrlVideo = this.apiService.getUrlSupport + '/tutorial_video/';
	apiUrlGambar = this.apiService.getUrlSupport + '/tutorial_gambar/';
	apiUrlTicket = this.apiService.getUrlSupport + '/ticket';

	// tslint:disable-next-line:variable-name
	private _tutorialData = new BehaviorSubject<ITutorialValues>(undefined);

	get tutorialData$() {
		return this._tutorialData.asObservable();
	}

	set tutorialData( value: ITutorialValues ) {
		this._tutorialData.next( value );
	}

	constructor( private http: HttpClient, private apiService: ApiService ) {
	}

	getFaq() {
		return this.http.get<IFaq>( this.apiUrl );
	}

	getTutorial() {
		return this.http.get<ITutorial>( this.apiUrlTutorial );
	}

	getTutorCategory( id ) {
		return this.http.get<ITutorCategory>( this.apiUrlContent + id );
	}

	getTutorVideo( id ) {
		return this.http.get<ITutorialVideo>( this.apiUrlVideo + id );
	}

	getTutorGambar( id ) {
		return this.http.get<ITutorialGambar>( this.apiUrlGambar + id );
	}

	createTicket( body ) {
		return this.http.post( this.apiUrlTicket, body );
	}

	getTicketById( id ) {
		return this.http.get<ITicket>( this.apiUrlTicket + `/1/${ id }` );
	}

}
