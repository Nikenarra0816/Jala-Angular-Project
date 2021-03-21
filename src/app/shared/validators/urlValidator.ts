/////// VALIDATOR HTTP ///////////
import { AbstractControl } from '@angular/forms';

export function urlValid( control: AbstractControl ): { [ key: string ]: boolean } | null {
	if ( control.value !== undefined && typeof control.value !== 'object' ) {
		// const regex = '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$';
		const regex = '(https?|ftp):\\/\\/([-a-z0-9.]+)(\\/[-a-z0-9+&@#\\/%=~_|!:,.;])?(\\?[a-z0-9+&@#\\/%=~_|!:‌​,.;])?';
		if ( control.value.match( regex ) || control.value.includes( ' ' ) ) {
			return null;
		}
	}
	return { 'urlValid': true };
}
