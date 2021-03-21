import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceStrict, parseISO } from 'date-fns';

@Pipe( {
	name: 'dateFormatDistance',
	pure: false
} )
export class DateFormatDistancePipe implements PipeTransform {

	transform( value: any, ...args: any[] ): any {
		const dateNow = new Date();
		const parse = parseISO( value );
		return formatDistanceStrict( parse, dateNow );
	}

}
