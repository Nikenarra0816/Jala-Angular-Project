import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DashboardReportService } from '@core/services/dashboard-report/dashboard-report.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { SalesOfficer } from '@shared/models/sales-officer.model';
import { DashboardSalesOfficerService } from '@core/services/dashboard-sales-officer/dashboard-sales-officer.service';
import { MatDialog } from '@angular/material';
import { TeamSalesOfficerDialogComponent } from '@jala-modules/dashboards-team/pages/team-sales-officer/team-sales-officer-dialog/team-sales-officer-dialog.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { finalResultChart, mutateArrayChart, sortArrayChart } from '@shared/function/chartFunction';

@Component( {
	selector: 'app-team-sales-officer',
	templateUrl: './team-sales-officer.component.html',
	styleUrls: [ './team-sales-officer.component.scss' ]
} )
export class TeamSalesOfficerComponent implements OnInit, OnDestroy {

	constructor(
		private http: DashboardSalesOfficerService,
		private http2: DashboardReportService,
		private dialog: MatDialog
	) {
		this.searchInputForm.valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( ( value: string ) => {
				if ( value === '' ) {
					this.dataOfficer = this.initialData;
				} else {
					this.dataOfficer = this.initialData.filter( value1 => value1.data.name.toLowerCase().includes( value.toLowerCase() ) );
				}
			} );
	}

	private initialData: SalesOfficer[];
	dataOfficer: SalesOfficer[];
	dataChartOfficer: Observable<any>;
	dataTotal = { totalLeads: 0, totalOfficer: 0 };

	chartOption: 'owner.user,status.category' | 'owner.user' = 'owner.user,status.category';

	tabsView = 2;

	searchInputForm = new FormControl();

	chartChange( val ) {
		if ( val === 'owner.user,status.category' ) {
			this.dataChartOfficer = this.http2.getLeads( val )
				.pipe(
					tap( value => {
						this.dataTotal.totalOfficer = value.length;
						this.dataTotal.totalLeads = value.reduce( ( acc, cur ) => acc + cur.value, 0 );
					} ),
					map( value => this.updateChart( value ) )
				);
		} else {
			this.dataChartOfficer = this.http2.getPerformance( val )
				.pipe(
					map( value => this.updateChart2( value ) )
				);
		}
	}

	updateChart( data ) {
		if ( Array.isArray( data ) && data.length !== 0 ) {
			const sort = sortArrayChart( data );
			return finalResultChart( mutateArrayChart( sort ) );
		}
	}

	updateChart2( data ) {
		if ( Array.isArray( data ) && data.length !== 0 ) {
			const best5 = data.sort( ( a, b ) => b.value - a.value );
			const obj = {
				data: [ { data: best5.map( value => value.value ), label: 'Point' } ],
				label: best5.map( value => value.alias )
			};
			return obj;
		}
	}


	editDialog( data: SalesOfficer ) {
		const dialogRef = this.dialog.open( TeamSalesOfficerDialogComponent, { data } );

		dialogRef.afterClosed().subscribe( result => {
			if ( result === 'change' ) {
				this.fetchAll( true );
			}
		} );
	}

	fetchAll( force = true ) {
		this.chartOption = 'owner.user,status.category';
		this.chartChange( this.chartOption );
		this.http.getAllSalesOfficers( force )
			.pipe( switchMap( value => {
				return this.http.getAllSalesOfficerSummary()
					.pipe(
						map( value1 => {
								return value.reduce<SalesOfficer[]>( ( acc, cur ) => {
									cur.summary = value1.find( value3 => cur.data.id === value3.id );
									return [ ...acc, cur ];
								}, [] );
							}
						)
					);
			} ) )
			.subscribe( value => {
				this.initialData = value;
				this.dataOfficer = value;
			} );
	}

	ngOnInit() {
		this.fetchAll();
	}

	ngOnDestroy(): void {
	}

}
