import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DashboardProjectService } from '@core/services/dashboard-project/dashboard-project.service';
import { MatDialog } from '@angular/material';
import { Customer } from '@shared/models/customer.model';
import { ProjectCustomerDialogComponent } from '@jala-modules/dashboards-project/pages/project-customer/project-customer-dialog/project-customer-dialog.component';
import { debounceTime, map, tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { addDays, isWithinInterval, parseISO, startOfDay } from 'date-fns';
import { ActivatedRoute } from '@angular/router';

@Component( {
	selector: 'app-project-customer',
	templateUrl: './project-customer.component.html',
	styleUrls: [ './project-customer.component.scss' ]
} )
export class ProjectCustomerComponent implements OnInit, OnDestroy {

	constructor(
		private fb: FormBuilder,
		private http: DashboardProjectService,
		private activeRoute: ActivatedRoute,
		private dialog: MatDialog
	) {
		this.projectId = Number( this.activeRoute.parent.snapshot.paramMap.get( 'id' ) );
		this.formFilter.valueChanges
			.pipe(
				untilDestroyed( this ),
				debounceTime( 500 ),
				map( value => {
					const x = value;
					Object.keys( x ).forEach( ( key ) => {
						return ( ( x[key] === null ) || ( x[key] === undefined ) || ( key === 'getDate' ) ) && delete x[key];
					} );
					return x;
				} )
			)
			.subscribe( result => {

				const arrOfKey = Object.keys( result );
				/* IKI DATA TABLE */
				let allResult: Customer[] = this.dataCustomer;
				arrOfKey.forEach( objKeys => {
					allResult = allResult.filter( val => {
						// SET FILTER UNTUK STATUS MENGGUNAKAN NAME DARIPADA MENGGUNAKAN ID
						// Per tgl 22/05/2020
						if ( objKeys === 'getStatus' ) {
							return val.getStatus.name === result[objKeys];
						}
						return val[objKeys].id === result[objKeys];
					} );
				} );
				const date = this.getDate.value;
				if ( date ) {
					allResult = allResult.filter( value => {
						const parseDate = parseISO( value.data.createdAt );
						return isWithinInterval(
							parseDate,
							{
								start: startOfDay( date[0] ),
								end: addDays( startOfDay( date[1] ), 1 )
							} );
					} );
				}
				this.dataForTable = allResult;
				this.initialDataForTable = allResult;
				this.dataForChart1 = this.forChart1( allResult );
				this.searchInputForm.reset( '' );
			} );

		this.searchInputForm.valueChanges
			.pipe( untilDestroyed( this ),
				debounceTime( 500 ) )
			.subscribe( ( value: string ) => {
				if ( value === '' ) {
					this.dataForTable = this.initialDataForTable;
				} else {
					this.dataForTable = this.initialDataForTable.filter( value1 => {
						if ( value1.data.name ) {
							return value1.data.name.toLowerCase().includes( value.toLowerCase() );
						}
					} );
				}
			} );
	}

	projectId;
	public dataForFilter;
	formFilter = this.fb.group( {
		getDate: [],
		getCategory: [],
		getStatus: [],
		getSalesOfficer: [],
	} );

	dataCustomer: Customer[];
	// dataFilteredCustomer: Customer[];
	dataForTable: Customer[];
	initialDataForTable: Customer[];
	dataForOverview: { [cok: string]: number };

	dataForChart1;

	searchInputForm = this.fb.control( [] );

	dateNow = new Date();

	openDialog( value: Customer ): void {
		const dialogRef = this.dialog.open( ProjectCustomerDialogComponent, {
			data: value
		} );

		dialogRef.afterClosed().subscribe( result => {
		} );
	}

	get getDate() {
		return this.formFilter.get( 'getDate' );
	}

	setForFilter( value: Customer[] ) {
		const method = [ 'getSalesOfficer', 'getStatus', 'getCategory' ];
		const obj = value.reduce( ( acc, cur ) => {
			method.forEach( value1 => {
				// SET FILTER UNTUK STATUS MENGGUNAKAN NAME DARIPADA MENGGUNAKAN ID
				// Per tgl 22/05/2020
				if ( value1 === 'getStatus' ) {
					const index = acc.getStatus.findIndex( val => val.name === cur[value1].name );
					if ( index === -1 ) {
						acc[value1].push( {
							id: cur[value1].name,
							name: cur[value1].name,
						} );
					}
					/////////////
				} else {
					const index = acc[value1].findIndex( val => val.id === cur[value1].id );
					if ( index === -1 ) {
						// acc.push( get );
						acc[value1].push( cur[value1] );
					}
				}
			} );
			return acc;
		}, {
			getSalesOfficer: [],
			getStatus: [],
			getCategory: [],
		} );
		return obj;
	}

	forChart1( data: Customer[] ) {
		// check if data not empty
		if ( Array.isArray( data ) && data.length ) {
			const objChart = {
				data: [],
				label: [ 'Leads' ]
			};
			for ( const value of data ) {
				const labelIndex = objChart.data.findIndex( val => val.label === value.getCategory.name );
				if ( labelIndex !== -1 ) {
					objChart.data[labelIndex].data[0] += 1;
				} else {
					objChart.data.push( {
						data: [ 1 ],
						label: value.getCategory.name
					} );
				}
			}
			return objChart;
		} else {
			return 'empty';
		}
	}

	setForOverview( data: Customer[] ) {
		const obj = {
			totalCustomers: data.length,
			totalIncome: 0,
			totalPurchased: 0,
		};
		data.forEach( value => {
			obj.totalIncome += value.data.totalPurchased;
			obj.totalPurchased += value.data.achievedTimes;
		} );
		return obj;
	}

	ngOnInit() {
		this.http.getCustomerByProject( this.projectId )
			.pipe(
				tap( value => {
					this.dataCustomer = value;
					this.dataForTable = value;
					this.initialDataForTable = value;
					this.dataForFilter = this.setForFilter( value );

					this.dataForChart1 = this.forChart1( value );
					this.dataForOverview = this.setForOverview( value );
				} )
			)
			.subscribe(
				value => {
				}
			);
	}

	ngOnDestroy() {
	}


}
