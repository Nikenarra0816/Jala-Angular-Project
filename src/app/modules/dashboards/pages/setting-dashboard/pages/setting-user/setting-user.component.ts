import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting-user',
  templateUrl: './setting-user.component.html',
  styleUrls: ['./setting-user.component.scss']
})
export class SettingUserComponent implements OnInit {

	constructor( private fb: FormBuilder ) {
	}


	coverages$: Observable<any>;

	form = this.fb.group( {
		email: [ '', [ Validators.required, Validators.email ] ],
		role: [ [], [ Validators.required ] ]
	} );


	ngOnInit() {
  }

}
