import { Component, Input } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';


@Component( {
	selector: 'app-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: [ './stepper.component.scss' ],
	providers: [ { provide: CdkStepper, useClass: StepperComponent } ]
} )
export class StepperComponent extends CdkStepper {
	@Input() headerCol = false;

	onClick( index ) {
		this.selectedIndex = index;
	}
}
