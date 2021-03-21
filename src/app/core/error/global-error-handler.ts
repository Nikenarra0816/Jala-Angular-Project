import { ErrorHandler, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor(
		private toastr: ToastrService
	) {
	}

	/*private get toastrService(): ToastrService {
		return this.injector.get( ToastrService );
	}*/

	handleError( error: Error | HttpErrorResponse ): void {
		if ( error instanceof HttpErrorResponse ) {
			this.toastr.error( `${ error.status }`, `${ error.message }` );
		} else {
			this.toastr.error( 'Error', 'Error occurred' );
			// console.log("Jangan Ngegas")
			console.log( error.stack );
			// this.notif.error( `${ err.status }`, err.error.message );
		}
	}
}
