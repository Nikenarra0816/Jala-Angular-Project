import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class CacheRequestService {

	private maxAge = 10000;
	private cache = new Map();

	get( req: HttpRequest<any> ): HttpResponse<any> | undefined {
		const url = req.urlWithParams;
		const cached = this.cache.get( url );

		if ( !cached ) {
			return undefined;
		}

		const isExpired = cached.expired < ( Date.now() - this.maxAge );
		if ( isExpired ) {
			this.cache.delete( url );
			return undefined;
		}
		return cached.response;
	}

	put( req: HttpRequest<any>, response: HttpResponse<any> ): void {
		const url = req.urlWithParams;
		const entry = { url, response, expired: Date.now() };
		this.cache.delete( url );
		this.cache.set( url, entry );
	}
}
