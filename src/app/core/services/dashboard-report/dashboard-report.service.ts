import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/services/api.service';

@Injectable()
export class DashboardReportService {
	private urlLeads = this.api.getUrlReport + 'lead';
	private urlSales = this.api.getUrlReport + 'sales';
	private urlSummary = this.api.getBareUrl + 'report/summary';

	constructor( private http: HttpClient, private api: ApiService ) {
	}

	getLeads(
		sliceBy: string,
		option?: {
			projectId?: number,
			date?: { startDate: string, endDate: string },
			groupBy?: 'day' | 'week' | 'month' | 'year',
			anotherFilter?: string
		}
	) {
		const headers = this.api.needForce();
		const params = {
			slice_by: sliceBy
		};

		if ( option ) {
			if ( option.groupBy ) {
				params[ 'group_by' ] = option.groupBy;
			}

			if ( option.date ) {
				params[ 'start' ] = option.date.startDate;
				params[ 'end' ] = option.date.endDate;
			}

			if ( option.projectId ) {
				params[ 'filters' ] = `group.project:${ option.projectId }`;
			}

			if ( option.anotherFilter ) {
				if ( option.projectId ) {
					params[ 'filters' ] += `,${ option.anotherFilter }`;
				}
				params[ 'filters' ] = option.anotherFilter;
			}
		}


		return this.http.get<IReportLeads[]>( this.urlLeads, { params, headers } );
	}

	getPerformance(
		sliceBy: string,
		option?: {
			projectId?: number,
			date?: { startDate: string, endDate: string },
			anotherFilter?: string
		}
	) {
		const params = {
			slice_by: sliceBy
		};
		const headers = this.api.needForce();

		if ( option ) {
			if ( option.projectId ) {
				params[ 'filters' ] = `group.project:${ option.projectId }`;
			}

			if ( option.date ) {
				params[ 'start' ] = option.date.startDate;
				params[ 'end' ] = option.date.endDate;
			}

			if ( option.anotherFilter ) {
				if ( option.projectId ) {
					params[ 'filters' ] += `,${ option.anotherFilter }`;
				}
				params[ 'filters' ] = option.anotherFilter;
			}
		}

		return this.http.get<IReportLeads[]>( this.urlSales, { params, headers } );
	}

	getSummaryOverview(
		option?: {
			projectId?: number,
			date?: { startDate: string, endDate: string },
		}
	) {
		const params = {};
		let url = this.urlSummary + '/overview';
		const headers = this.api.needForce();

		if ( option ) {
			if ( option.projectId ) {
				url += `/${option.projectId}`;
			}

			if ( option.date ) {
				params[ 'start' ] = option.date.startDate;
				params[ 'end' ] = option.date.endDate;
			}
		}
		return this.http.get<ISummaryOverview[]>( url, { params, headers } );
	}
}

export interface IReportLeads {
	key: string;
	value: number;
	alias?: null;
	buckets?: ( IBucketsEntity )[] | null;
	color: string;
}

export interface IBucketsEntity {
	key: number;
	value: number;
	alias: string;
	color: string;
}

export interface ISummaryOverview {
	total_sales: number;
	total_sales_active: number;
	total_team: number;
	total_team_active: number;
	total_admin: number;
	total_admin_active: number;
	total_project: number;
	total_project_active: number;
	total_campaign: number;
	total_campaign_active: number;
	total_channel: number;
	total_chanel_active: number;
	total_lead: number;
	total_new_lead: number;
	total_on_progress: number;
}
