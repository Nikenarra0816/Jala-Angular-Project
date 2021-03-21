import { Pipe, PipeTransform } from '@angular/core';
import startCase from 'lodash-es/startCase';

@Pipe( {
	name: 'startCase'
} )
export class StartCasePipe implements PipeTransform {

	transform( value: string, ...args: any[] ): any {
		return startCase( value );
	}

}
