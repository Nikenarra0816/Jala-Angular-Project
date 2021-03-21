import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
	private url = environment.api_url + '/rest/';
	private bareUrl = environment.api_url + '/';
	private urlReport = environment.api_url + '/report/performance/';
	private urlWs = environment.api_ws;

	private urlSupport = environment.api_url + '/content';
	// private urlSupport = 'http://localhost:9005';

	constructor() {
	}

	get getUrlSupport() {
		return this.urlSupport;
	}

	get getUrl() {
		return this.url;
	}

	get getBareUrl() {
		return this.bareUrl;
	}

	get getUrlReport() {
		return this.urlReport;
	}

	get getWsUrl() {
		return this.urlWs;
	}
	get getRegisterUrl() {
		return this.bareUrl + 'admin/';
	}

	needForce(): HttpHeaders {
		return new HttpHeaders( { 'force-get': 'force' } );
	}
}
