import * as Color from 'color';

export function darkenColor( color: string, value: number ): string {
	return Color( color ).darken( value ).saturate( 0.4 ).hex();
}

export function shadowColored( color: string, value: number ): string {
	return Color( color ).alpha( value );
}

export function lightenColor( color: string, value: number ): string {
	return Color( color ).saturate( value ).hex();
}
