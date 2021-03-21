import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
	name: 'currencyShort'
} )
export class CurrencyShortPipe implements PipeTransform {
	SI_SYMBOL = [ '', 'Ribu', 'Juta', 'Milyar', 'Triliun', 'Kuadriliun', 'Kuantiliun' ];

	transform( value: number, withoutRp = false, withoutSuffix = false, onlySuffix = false, ...args: any[] ): any {

		// tslint:disable-next-line:no-bitwise
		const tier = Math.log10( value ) / 3 | 0;

		// if zero, we don't need a suffix
		if ( tier === 0 ) {
			if ( withoutRp ) {
				return value;
			} else {
				return 'Rp.' + value;
			}
		}

		// get suffix and determine scale
		const suffix = this.SI_SYMBOL[tier];
		const scale = Math.pow( 10, tier * 3 );

		// scale the valueber
		const scaled = value / scale;
		let format = scaled.toFixed( 1 );
		// format number and add suffix
		if ( !withoutRp ) {
			format = 'Rp' + format;
		}
		if ( !withoutSuffix ) {
			format += ' ' + suffix;
		}
		if ( onlySuffix ) {
			return suffix;
		}

		return format;
	}


}
