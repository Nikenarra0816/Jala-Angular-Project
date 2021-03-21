import {
	ComponentFactory,
	ComponentFactoryResolver,
	ComponentRef,
	Directive,
	Input,
	OnChanges,
	SimpleChanges,
	TemplateRef,
	ViewContainerRef
} from '@angular/core';
import { LoaderSpinnerV2Component } from '@shared/components/loader-spinner-v2/loader-spinner-v2.component';

@Directive( {
	selector: '[appLoaderSpinner]'
} )
export class LoaderSpinnerDirective implements OnChanges {

	loadingFactory: ComponentFactory<LoaderSpinnerV2Component>;
	loadingComponent: ComponentRef<LoaderSpinnerV2Component>;
	@Input() appLoaderSpinner: boolean;
	@Input() appLoaderSpinnerBg: string;

	constructor(
		private templateRef: TemplateRef<any>,
		private vcRef: ViewContainerRef,
		private componentFactoryResolver: ComponentFactoryResolver
	) {
		// Create resolver for loading component
		this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory<LoaderSpinnerV2Component>( LoaderSpinnerV2Component );
	}

	create() {
		this.loadingComponent = this.vcRef.createComponent( this.loadingFactory );
		const color = this.appLoaderSpinnerBg;
		if ( color ) {
			this.loadingComponent.instance.backgroundColor = color;
		}
	}

	destroy() {
		this.vcRef.createEmbeddedView( this.templateRef );
	}

	createOrDestroyComponent( loading: boolean ): void {
		this.vcRef.clear();
		loading ? this.create() : this.destroy();
	}

	ngOnChanges( changes: SimpleChanges ): void {
		this.createOrDestroyComponent( this.appLoaderSpinner );
	}

}
