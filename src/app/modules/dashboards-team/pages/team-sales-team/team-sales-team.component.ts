import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardReportService } from '@core/services/dashboard-report/dashboard-report.service';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DashboardSalesTeamService } from '@core/services/dashboard-sales-team/dashboard-sales-team.service';
import { SalesTeam } from '@shared/models/sales-team.model';
import { MatDialog } from '@angular/material';
import { TeamSalesTeamDialogComponent } from '@jala-modules/dashboards-team/pages/team-sales-team/team-sales-team-dialog/team-sales-team-dialog.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { finalResultChart, mutateArrayChart, sortArrayChart } from '@shared/function/chartFunction';

@Component( {
	selector: 'app-team-sales-team',
	templateUrl: './team-sales-team.component.html',
	styleUrls: [ './team-sales-team.component.scss' ]
} )
export class TeamSalesTeamComponent implements OnInit, OnDestroy {

	constructor(
		private http: DashboardSalesTeamService,
		private http2: DashboardReportService,
		private dialog: MatDialog
	) {
		this.searchInputForm.valueChanges
			.pipe( untilDestroyed( this ) )
			.subscribe( ( value: string ) => {
				if ( value === '' ) {
					this.dataTeam = this.initialData;
				} else {
					this.dataTeam = this.initialData.filter( value1 => value1.data.name.toLowerCase().includes( value.toLowerCase() ) );
				}
			} );
	}

	dataTotal = { totalLeads: 0, totalTeam: 0 };
	private initialData: SalesTeam[];
	dataTeam: SalesTeam[];
	dataChartTeam: Observable<any>;
	chartOption: 'owner.team,status.category' | 'owner.team' = 'owner.team,status.category';
	tabsView = 2;
	searchInputForm = new FormControl();

	fetchAll( force = true ) {
		this.chartOption = 'owner.team,status.category';
		this.chartChange( this.chartOption );
		this.http.getAllSalesTeam( force )
			.pipe(
				switchMap( value => {
					return this.http.getAllSalesTeamSummary()
						.pipe(
							map( value1 => {
									return value.reduce<SalesTeam[]>( ( acc, cur ) => {
										cur.summary = value1.find( value3 => cur.data.id === value3.id );
										return [ ...acc, cur ];
									}, [] );
								}
							)
						);
				} )
			)
			.subscribe( value => {
				this.dataTotal.totalTeam = value.length;
				this.dataTotal.totalLeads = value.reduce( ( acc, cur ) => acc + cur.summary.total_lead, 0 );
				this.dataTeam = value;
				this.initialData = value;
			} );
	}

	editDialog( value: SalesTeam ) {
		const dialogRef = this.dialog.open( TeamSalesTeamDialogComponent, {
			data: value
		} );

		dialogRef.afterClosed().subscribe( result => {
			if ( result === 'change' ) {
				this.fetchAll( true );
			}
		} );
	}

	chartChange( val ) {
		if ( val === 'owner.team,status.category' ) {
			this.dataChartTeam = this.http2.getLeads( val )
				.pipe(
					/*tap( value => {
						this.dataTotal.totalTeam = value.length;
						this.dataTotal.totalLeads = value.reduce( ( acc, cur ) => acc + cur.value, 0 );
					} ),*/
					map( value => this.updateChart4( value ) )
				);
		} else {
			this.dataChartTeam = this.http2.getPerformance( val )
				.pipe(
					map( value => this.updateChart2( value ) )
				);
		}
	}

	updateChart4( data ) {
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

	ngOnInit() {
		this.fetchAll();
	}

	ngOnDestroy(): void {
	}

}
