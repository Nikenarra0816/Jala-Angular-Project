import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const expandedAnimation = trigger(
	'expanded',
	[
		state(
			'false',
			style( { height: '0px' } ),
		),
		state(
			'true',
			style( { height: '*' } ),
		),
		transition( 'false => true', animate( '.3s ease',
			style( { height: '*' } ) ) ),
		transition( 'true => false', animate( '.3s ease',
			style( { height: '0px' } ) ) ),
	]
);

export function expandedRightAnimation( duration: number = .3 ) {
	return trigger(
		'expanded',
		[
			state(
				'false',
				style( { transform: 'translateX(100%)', width: '0px' } ),
			),
			state(
				'true',
				style( { transform: 'translateX(0)', width: '*' } ),
			),
			transition( 'false => true', animate( `${ duration }s ease-in`,
				keyframes( [
					style( { width: '*', offset: 0 } ),
					style( { transform: 'translateX(100%)', offset: 0 } ),
					style( { transform: 'translateX(0)', offset: 1 } ),
				] ) ) ),
			transition( 'true => false', animate( `${ duration }s ease-in`,
				keyframes( [
					style( { transform: 'translateX(0)', offset: 0 } ),
					style( { transform: 'translateX(100%)', offset: 1 } ),
				] ) ) ),
		]
	);
}

export function inAndOutOpacity( duration: number = .3 ) {
	return trigger(
		'inAndOut',
		[
			state(
				'false',
				style( { display: 'none', opacity: 0 } ),
			),
			state(
				'true',
				style( { display: 'block', opacity: 1 } ),
			),
			transition( 'false => true', animate( `${ duration }s ease-in`,
				keyframes( [
					style( { display: 'block', offset: 0 } ),
					style( { opacity: 0, offset: 0 } ),
					style( { opacity: 1, offset: 1 } ),
				] ) ) ),
			transition( 'true => false', animate( `${ duration }s ease-in`,
				keyframes( [
					style( { opacity: 1, offset: 0 } ),
					style( { opacity: 0, offset: 1 } ),
				] ) ) ),
		]
	);
}
