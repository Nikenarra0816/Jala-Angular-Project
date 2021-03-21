import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'numberShort'
})
export class NumberShortPipe implements PipeTransform {
	SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

	transform(value: number, ...args: any[]): any {

		// tslint:disable-next-line:no-bitwise
		const tier = Math.log10(value) / 3 | 0;

		// if zero, we don't need a suffix
		if (tier === 0) {
			return value;
		}

		// get suffix and determine scale
		const suffix = this.SI_SYMBOL[tier];
		const scale = Math.pow(10, tier * 3);

		// scale the valueber
		const scaled = value / scale;

		// format number and add suffix
		return scaled.toFixed(1) + suffix;
	}

}
