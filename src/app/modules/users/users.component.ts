import { Component, OnInit } from '@angular/core';
import { animate, query, style, transition, trigger } from '@angular/animations';

@Component( {
	selector: 'app-users',
	templateUrl: './users.components.html',
	styleUrls: [ './users.components.scss' ],
	animations: [
		trigger( 'routeAnimations', [
			transition( '* => *', [
				// Intinya query iku sequence
				query(
					':enter, :leave',
					[ style( { width: '100%', display: 'block', transformOrigin: 'top' } ) ],
					{ optional: true }
				),
				query( ':leave',
					[ style( { opacity: 1, visibility: 'visible', transform: 'translateX(0)', position: 'absolute', left: 0, top: 0 } ) ],
					{ optional: true } ),
				query( ':enter',
					[ style( { opacity: 0, visibility: 'hidden', transform: 'translateX(100%)' } ) ],
					{ optional: true } ),
				query(
					':leave',
					// here we apply a style and use the animate function to apply the style over 0.3 seconds
					[ animate( '.3s', style( { opacity: 0, transform: 'translateX(-100%)' } ) ) ],
					{ optional: true }
				),
				query(
					':enter',
					[ animate( '.3s', style( { opacity: 1, visibility: 'visible', transform: 'translateX(0)' } ) ) ],
					{ optional: true }
				)
			] )
		] )
	]
} )
export class UsersComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
