import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { IProduct } from '@shared/models/product.model';
import { map } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ProjectProductAddDialogComponent } from '@jala-modules/dashboards-project/pages/project-product/project-product-add-dialog/project-product-add-dialog.component';
import { MatDialog } from '@angular/material';
import { ProjectProductEditDialogComponent } from '@jala-modules/dashboards-project/pages/project-product/project-product-edit-dialog/project-product-edit-dialog.component';

interface IdAndName {
	id: any;
	name: string;
}

@Component( {
	selector: 'app-project-product',
	templateUrl: './project-product.component.html',
	styleUrls: [ './project-product.component.scss' ]
} )
export class ProjectProductComponent implements OnInit, OnDestroy {

	constructor(
		private http: DashboardProjectService,
		private activatedRoute: ActivatedRoute,
		private fb: FormBuilder,
		private dialog: MatDialog,
	) {
		this.projectId = Number( this.activatedRoute.snapshot.queryParamMap.get( 'projectId' ) );
		this.formFilter.valueChanges
			.pipe(
				untilDestroyed( this ),
				map( value => {
					const x = value;
					Object.keys( x ).forEach( ( key ) => {
						return ( ( x[ key ] === null ) || ( x[ key ] === undefined ) ) && delete x[ key ];
					} );
					return x;
				} ) )
			.subscribe( value => {
				let tempData = this.dataProduct;
				if ( value.hasOwnProperty( 'project' ) ) {
					tempData = tempData.filter( value1 => {
						const index = value1.projects.findIndex(value2 => value2.id === value.project);
						return index !== -1;
					} );
				}
				if ( value.hasOwnProperty( 'status' ) ) {
					tempData = tempData.filter( value1 => value1.isActive === value.status );
				}
				this.dataProductTable = tempData;
			} );
	}

	//////////////////////
	dataProduct: IProduct[];
	dataProductTable: IProduct[];
	dataForFilter: { project: IdAndName[], status: IdAndName[] };

	//////////////////////

	private projectId: number;
	formFilter = this.fb.group( {
		project: [],
		status: [],
	} );

	addProduct() {
		const dialogRef = this.dialog.open( ProjectProductAddDialogComponent, {
			// data: this.projectId
		} );

		dialogRef.afterClosed().subscribe( result => {
			if ( result === 'updatePlease' ) {
				this.setAll();
			}
		} );
	}

	editProduct( value: IProduct ) {
		const dialogRef = this.dialog.open( ProjectProductEditDialogComponent, {
			data: value
		} );

		dialogRef.afterClosed().subscribe( result => {
			if ( result === 'updatePlease' ) {
				this.setAll();
			}
		} );
	}

	setAll() {
		// forkJoin(
		// 	this.http.getAllProduct(),
		// 	this.http.getAllProject(),
		// )
		this.http.getAllProduct()
			.subscribe( value => {
				/// FROM this.http.getAllProjects() = value[0]
				/// FROM this.http.getAllProduct() = value[1]
				// set FILTER VALUE
				this.dataForFilter = {
					project: value.reduce<IdAndName[]>( ( acc, cur ) => {
						cur.projects.forEach( value1 => {
							const i = acc.findIndex( value2 => value2.id === value1.id );
							if ( i === -1 ) {
								acc.push( {
									id: value1.id,
									name: value1.name,
								} );
							}
						} );
						return acc;
					}, [] ),
					status: value.reduce( ( acc, cur ) => {
						if ( !acc.some( value1 => value1.id === cur.isActive ) ) {
							acc.push( {
								id: cur.isActive,
								name: cur.isActive ? 'Active' : 'Inactive'
							} );
						}
						return acc;
					}, [] )
				};
				this.dataProduct = value;
				this.dataProductTable = value;
				if ( this.projectId ) {
					this.formFilter.patchValue( { project: this.projectId } );
				}
			} );
	}

	ngOnInit() {
		this.setAll();
	}

	ngOnDestroy(): void {
	}

}
