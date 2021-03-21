import { AfterContentInit, Component, ContentChild, Input } from '@angular/core';
import { FormFieldInputGreenDirective } from '@shared/components/form-field-green/form-field-input-green.directive';

@Component( {
	selector: 'app-form-field-green',
	templateUrl: './form-field-green.component.html',
	styleUrls: [ './form-field-green.component.scss' ]
} )
export class FormFieldGreenComponent implements AfterContentInit {
	@Input() withoutLabel = false;
	@Input() icon: 'search' | 'filter';
	@Input() label: string;
	@Input() clearBtn = false;
	@ContentChild( FormFieldInputGreenDirective, { static: false } ) directive: FormFieldInputGreenDirective;

	constructor() {
	}

	clearValue() {
		this.directive.resetValue();
	}

	ngAfterContentInit(): void {
	}
}
