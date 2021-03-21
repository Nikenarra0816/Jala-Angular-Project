import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component( {
	selector: 'app-setting-client',
	templateUrl: './setting-client.component.html',
	styleUrls: [ './setting-client.component.scss' ]
} )
export class SettingClientComponent implements OnInit {

	constructor( private fb: FormBuilder ) {
	}

	form = this.fb.group( {
		text: [ '', [ Validators.required ] ],
		pass: [ '', [ Validators.required ] ],
		email: [ '', [ Validators.required, Validators.email ] ],
	} );

	ngOnInit() {
	}

}
