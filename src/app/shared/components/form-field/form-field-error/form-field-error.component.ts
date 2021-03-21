import { Component, OnInit } from '@angular/core';

@Component( {
	selector: 'app-form-field-error',
	template: `
        <span class="form-field-error">
			<ng-content></ng-content>
		</span>
	`,
	styles: [ `
        .form-field-error {
            font-size: 1.2rem;
            color: #FF6E66;
        }` ]
} )
export class FormFieldErrorComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
