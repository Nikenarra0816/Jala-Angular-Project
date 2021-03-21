import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component( {
	selector: 'app-setting-usage',
	templateUrl: './setting-usage.component.html',
	styleUrls: [ './setting-usage.component.scss' ]
} )
export class SettingUsageComponent implements OnInit {

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
