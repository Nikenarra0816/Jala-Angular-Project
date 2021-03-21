import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { IProject, IProjectMetadata } from '@shared/models/project.model';
import { addMonths, format } from 'date-fns';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { inOutAnimation } from '@shared/animations/inOutAnimation';
import { ProjectSettingStatusAddComponent } from '@jala-modules/dashboards-project/pages/project-setting/project-setting-status/project-setting-status-add/project-setting-status-add.component';
import { MatDialog } from '@angular/material';
import { IProduct } from '@shared/models/product.model';

@Component( {
	selector: 'app-project-new',
	templateUrl: './project-new.component.html',
	styleUrls: [ './project-new.component.scss' ],
	animations: [ inOutAnimation ]
} )
export class ProjectNewComponent implements OnInit, OnDestroy {
	@ViewChild( 'step', { static: false } ) step: CdkStepper;

	/// For Form Group 3 ///
	// initialStatus: LeadStatus[];
	leadsStatus: ICustomLeadsStatus[];
	checkLeadsStatus: ICustomLeadsStatus[] = [];
	customLeadsStatus: ICustomLeadsStatus[] = [];
	metadata: IProjectMetadata;

	routerLink: any[];

	////////////////////////
	constructor(
		private fb: FormBuilder,
		private http: DashboardProjectService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService,
		private dialog: MatDialog
	) {
	}

	/////////////// FORM GROUP 1 ///////////////////
	formGroup1 = this.fb.group( {
		name: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
		detail: [ '', [ Validators.required ] ],
		duration: [ 'noDuration' ]
	} );
	formGroup1Month = this.fb.control( { value: 1, disabled: true } );

	////////////////////////////////////////////////

	/////////////// FORM GROUP 2 ///////////////////
	/*formGroup2 = this.fb.group( {
		products: this.fb.array( [ this.addFormGroup2() ] )
	} );

	addFormGroup2() {
		return this.fb.group( {
			name: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
			detail: [ '', [ Validators.required ] ],
			price: [ '', [ Validators.required, Validators.min( 0 ) ] ]
		} );
	}

	get productArr() {
		return this.formGroup2.get( 'products' ) as FormArray;
	}

	productGetter( i: number, search: string ) {
		const product = this.formGroup2.get( 'products' ) as FormArray;
		return product.at( i ).get( `${ search }` );
	}

	addProduct() {
		const products = this.formGroup2.get( 'products' ) as FormArray;
		products.push( this.addFormGroup2() );
	}

	deleteProduct( index: number ) {
		const products = this.formGroup2.get( 'products' ) as FormArray;
		products.removeAt( index );
	}*/

	listProduct: IProduct[] = [];
	selectedProduct: IProduct[] = [];

	changeSelectedProduct( val, id ) {
		if ( val ) {
			const index = this.listProduct.findIndex( value => value.id === id );
			this.selectedProduct.push( this.listProduct[index] );
		} else {
			const index = this.selectedProduct.findIndex( value => value.id === id );
			this.selectedProduct.splice( index, 1 );
		}
	}

	isProductSelected( id ) {
		return this.selectedProduct.findIndex( value => value.id === id ) !== -1;
	}

	////////////////////////////////////////////////

	/////////////// FORM GROUP 3 ///////////////////
	changeStatus( item: ICustomLeadsStatus, checked: boolean ) {
		if ( checked ) {
			this.checkLeadsStatus.push( item );
		} else {
			const i = this.checkLeadsStatus.findIndex( value => value.name === item.name );
			this.checkLeadsStatus.splice( i, 1 );
		}
		this.checkLeadsStatus.sort( ( a, b ) => a.category.id - b.category.id );
	}

	isChecked( item: ICustomLeadsStatus ) {
		const index = this.checkLeadsStatus.findIndex( value => {
			return value.name === item.name;
		} );
		return index !== -1;
	}

	changeValue( name, event: string ) {
		const index = this.checkLeadsStatus.findIndex( value => value.name === name );
		this.checkLeadsStatus[index].point = Number( event );
	}

	openDialog(): void {
		const dialogRef = this.dialog.open( ProjectSettingStatusAddComponent, {
			data: this.metadata
		} );

		dialogRef.afterClosed().subscribe( result => {
			if ( result ) {
				this.customLeadsStatus.push( result );
				this.customLeadsStatus.sort( ( a, b ) => a.category.id - b.category.id );
			}
		} );
	}

	////////////////////////////////////////////////

	nextStep( form: FormGroup ) {
		if ( form.valid ) {
			this.step.next();
		} else {
			form.markAllAsTouched();
		}
	}

	setProjectDetail( value ) {
		const body: Partial<IProject> = {
			name: value.name,
			detail: value.detail,
			periodStart: format( new Date(), 'yyyy-MM-dd' )
		};
		if ( value.duration === 'duration' ) {
			const dur = this.formGroup1Month.value;
			body.periodEnd = format( addMonths( new Date(), dur ), 'yyyy-MM-dd' );
		}
		return body;
	}

	/*setProducts( value ) {
		return products = value.products;
	}*/

	setLeadStatus() {
		return this.checkLeadsStatus.map( value => {
			return {
				point: value.point,
				category: { id: value.category.id },
				sort: value.category.id,
				name: value.name
			};
		} );
	}

	submitProject() {
		this.spinner.show();
		const body: any = {
			leadStatuses: this.setLeadStatus(),
			...this.setProjectDetail( this.formGroup1.value ),
		};
		if ( this.listProduct.length !== 0 ) {
			body.products = this.selectedProduct.map( value => ( { id: value.id } ) );
		}
		/*this.http.createProducts(this.formGroup2.value.products)
			.subscribe(value => console.log(value))*/

		this.http.createProject( body )
			.pipe(
				/*switchMap( value => {
					const projectId = value[0].id;
					const body1 = this.formGroup2.value.products.map( value1 => ( { ...value, projects: [ { id: projectId } ] } ) );
					return this.http.createProducts( body1 );
				} ),*/
				tap( () => this.spinner.hide() )
			)
			.subscribe(
				value => {
					this.step.next();
					this.routerLink = [ '../', value[0].id, 'detail', 'campaign' ];
					this.toastr.success( 'Your project has been successfully added', 'Project Add Success' );
				}, error => {
					this.toastr.error( 'Sorry your project can’t be added please contact us or go to help', 'Project Add Error' );
				} );
	}

	ngOnInit() {
		this.http.getProjectMetadata()
			.subscribe( value => {
				this.metadata = value;
				this.metadata.custom_status.forEach( value1 => {

					value1.statuses.forEach( value2 => {

						this.customLeadsStatus.push( {
							id: undefined,
							name: value2.name,
							category: { id: value1.id },
							color: value1.color,
							point: value2.point
						} );

					} );

				} );
			} );
		this.http.getAllLeadStatus()
			.subscribe(
				value => {
					// this.initialStatus = value;
					this.leadsStatus = value.reduce( ( acc, cur ) => {
						return [ ...acc, ...cur.getStatusesSettingProject ];
					}, [] );
					this.checkLeadsStatus = this.leadsStatus.filter( value1 => value1.id === 1 );
				}
			);
		this.http.getAllProduct()
			.subscribe( value => {
				this.listProduct = value;
			} );
		this.formGroup1.get( 'duration' ).valueChanges
			.pipe(
				untilDestroyed( this )
			)
			.subscribe( value => {
				value === 'duration' ? this.formGroup1Month.enable() : this.formGroup1Month.disable();
			} );
	}

	ngOnDestroy(): void {
	}

}


interface ICustomLeadsStatus {
	id?: number;
	name: string;
	point: number;
	color: string;
	category: {
		id: number
	};
}
