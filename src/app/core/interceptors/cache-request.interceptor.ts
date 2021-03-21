import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CacheRequestService } from '@core/services/cache-request/cache-request.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheRequestInterceptor implements HttpInterceptor {

	constructor( private cacheService: CacheRequestService ) {
	}

	intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
		if ( req.url.includes( 'rest/leads' ) ) {
			return next.handle( req );
		}
		if ( req.headers.has( 'force-get' ) ) {
			const headers = req.headers.delete( 'force-get' );
			const reqClone = req.clone( { headers } );
			return this.sendRequest( reqClone, next, this.cacheService );
		}

		if ( req.method === 'GET' ) {
			const cachedResponse = this.cacheService.get( req );
			return cachedResponse ? of( cachedResponse ) : this.sendRequest( req, next, this.cacheService );
		}
		return next.handle( req );
	}

	sendRequest(
		req: HttpRequest<any>,
		next: HttpHandler,
		cache: CacheRequestService ): Observable<HttpEvent<any>> {
		return next.handle( req ).pipe(
			tap( event => {
				if ( event instanceof HttpResponse ) {
					cache.put( req, event );
				}
			} )
		);
	}
}
