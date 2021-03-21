import { Component, OnInit } from '@angular/core';
import { expandedAnimation } from '@shared/animations/expandedAnimation';
import { DashboardReportService } from '@core/services/dashboard-report/dashboard-report.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashboardSalesTeamService } from '@core/services/dashboard-sales-team/dashboard-sales-team.service';
import { DashboardSalesOfficerService } from '@core/services/dashboard-sales-officer/dashboard-sales-officer.service';
import { finalResultChart, mutateArrayChart, sortArrayChart } from '@shared/function/chartFunction';

@Component( {
	selector: 'app-team-list',
	templateUrl: './team-list.component.html',
	styleUrls: [ './team-list.component.scss' ],
	animations: [ expandedAnimation ]
} )
export class TeamListComponent implements OnInit {

	expandTeam = true;
	expandOfficer = true;

	dataChartTeam: Observable<any>;
	dataChartOfficer: Observable<any>;
	dataTotal = { team: 0, officer: 0 };

	constructor(
		private http: DashboardReportService,
		private http2: DashboardSalesTeamService,
		private http3: DashboardSalesOfficerService ) {
	}

	updateChart4( data ) {
		if ( Array.isArray( data ) && data.length !== 0 ) {
			const sort = sortArrayChart( data ).slice( 0, 5 );
			return  finalResultChart( mutateArrayChart( sort ) );
		}
	}

	ngOnInit() {
		this.dataChartTeam = this.http.getLeads( 'owner.team,status.category' )
			.pipe(
				map( value => this.updateChart4( value ) )
			);
		this.dataChartOfficer = this.http.getLeads( 'owner.user,status.category' )
			.pipe(
				map( value => this.updateChart4( value ) )
			);
		this.http2.getAllSalesTeamSummary()
			.subscribe( value => this.dataTotal.team = value.length );
		this.http3.getAllSalesOfficerSummary()
			.subscribe( value => this.dataTotal.officer = value.length );
	}

}
