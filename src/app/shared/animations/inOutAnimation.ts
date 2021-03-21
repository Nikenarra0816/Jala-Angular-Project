import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const inOutAnimation = trigger(
	'inOutAnimation',
	[
		transition(
			':enter',
			[
				style( { transform: 'translateX(-100%)', opacity: 0 } ),
				animate( '.3s ease-out',
					style( { transform: 'translateX(0)', opacity: 1 } ) )
			]
		),
		transition(
			':leave',
			[
				style( { transform: 'translateX(0)', opacity: 1 } ),
				animate( '.3s ease-in',
					style( { transform: 'translateX(100%)', opacity: 0 } ) )
			]
		)
	]
);

export const inOutAnimationCustom = trigger(
	'inOutAnimation',
	[
		transition(
			':enter',
			[
				style( { transform: 'translateX(-100%)', opacity: 0 } ),
				animate( '3s ease-out',
					style( { transform: 'translateX(0)', opacity: 1 } ) )
			]
		),
		transition(
			':leave',
			[
				style( { transform: 'translateX(0)', opacity: 1, position: 'absolute' } ),
				animate( '3s ease-in',
					style( { transform: 'translateX(100%)', opacity: 0 } ) )
			]
		),
	]
);

export const slider =
	trigger( 'inOutAnimation', [
		transition( 'isRight => void', [
				style( { transform: 'translateX(0)', opacity: 1, position: 'absolute', top: 0 } ),
				animate( '.3s ease',
					style( { transform: 'translateX(100%)', opacity: 1 } ) )
			]
		),
		transition( 'void => isRight', [
				style( { transform: 'translateX(100%)', opacity: 1 } ),
				animate( '.3s ease',
					style( { transform: 'translateX(0)', opacity: 1 } ) )
			]
		),
		transition( 'isLeft => void', [
				style( { transform: 'translateX(0)', opacity: 1, position: 'absolute' } ),
				animate( '.3s ease',
					style( { transform: 'translateX(-100%)', opacity: 1 } ) )
			]
		),
		transition( 'void => isLeft', [
				style( { transform: 'translateX(-100%)', opacity: 1 } ),
				animate( '.3s ease',
					style( { transform: 'translateX(0)', opacity: 1 } ) )
			]
		)
	] );

function slideTo( direction ) {
	const optional = { optional: true };
	return [
		query( ':enter, :leave', [
			style( {
				position: 'absolute',
			} )
		], optional ),
		query( ':enter', [
			style( { transform: `translateX(${ direction === 'right' ? '100%' : '-100%' })` } )
		], optional ),
		group( [
			query( ':leave', [
				animate( '600ms ease', style( { transform: `translateX(${ direction === 'left' ? '100%' : '-100%' })` } ) )
			], optional ),
			query( ':enter', [
				animate( '600ms ease', style( { transform: `translateX(0)` } ) )
			], optional )
		] ),
	];
}


export const inOutAnimationTopRight = trigger(
	'inOutAnimation',
	[
		transition(
			':enter',
			[
				style( { transform: 'scale(0)', opacity: 0, transformOrigin: 'top right' } ),
				animate( '.3s ease-out',
					style( { transform: 'scale(1)', opacity: 1, transformOrigin: 'top right' } ) )
			]
		),
		transition(
			':leave',
			[
				style( { transform: 'scale(1)', opacity: 1, transformOrigin: 'top right' } ),
				animate( '.3s ease-in',
					style( { transform: 'scale(0)', opacity: 0, transformOrigin: 'top right' } ) )
			]
		)
	]
);
