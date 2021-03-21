import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ILeadsStatusCategory, IStatus, LeadStatus } from '@shared/models/status.model';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { IProject, IProjectMetadata, IProjectSummary, Project } from '@shared/models/project.model';
import { Campaign, ICampaign, ICampaignMetadata, ICampaignSummary } from '@shared/models/campaign.model';
import { Channel, IChannel, IChannelMetadata } from '@shared/models/channel.model';
import { Form, IForm, IFormMetadata } from '@shared/models/form.model';
import {
	ILead,
	ILeadJourney,
	ILeadsMetadata,
	ILeadWithJourney,
	Lead,
	LeadWithJourney,
	ParamsLeadDownload
} from '@shared/models/lead.model';
import { IProduct, IProductPicture } from '@shared/models/product.model';
import { LeadsStoreService } from '@core/store/leads/leads-store.service';
import { of } from 'rxjs';
import { Customer, ICustomer, ICustomerJourney } from '@shared/models/customer.model';

@Injectable()
export class DashboardProjectService {
	private url = this.apiService.getUrl + 'projects';
	private urlCampaign = this.apiService.getUrl + 'campaigns';
	private urlForm = this.apiService.getUrl + 'forms';
	private urlProduct = this.apiService.getUrl + 'products';
	private urlChannel = this.apiService.getUrl + 'channels';
	private urlLead = this.apiService.getUrl + 'leads';
	private urlSummary = this.apiService.getBareUrl + 'report';
	private urlTemplate = this.apiService.getBareUrl + 'download/import_template';
	private urlStatus = this.apiService.getUrl + 'leads/metadata';
	private urlCustomer = this.apiService.getUrl + 'customers';
	private urlCustomerInvoice = this.apiService.getBareUrl + 'download/customer_invoice';

	constructor( private apiService: ApiService, private http: HttpClient, private leadStore: LeadsStoreService ) {
	}

	//////////// PROJECT  //////////////
	createProject( body ) {
		return this.http.post( this.url, [ body ] );
	}

	getAllProjects() {
		return this.http.get( this.url )
			.pipe(
				map( ( value: any[] ) => value.map( val => new Project( val ) ) ),
				// tap( ( value: Project[] ) => this.store.project = value )
			);
	}

	getProjectWithSummaryById( projectId, force = false ) {
		const headers = force ? this.apiService.needForce() : undefined;
		return this.http.get<IProject>( this.url + `/${ projectId }`, { headers } )
			.pipe(
				switchMap( ( valueProject ) => {
					return this.getProjectSummaryById( projectId )
						.pipe(
							map( ( valueSummary ) => {
								const project = new Project( valueProject );
								project.summary = valueSummary[0];
								return project;
							} ),
						);
				} ),
			);
	}

	getProjectById( projectId, force = false ) {
		const headers = force ? this.apiService.needForce() : undefined;
		return this.http.get<IProject>( this.url + `/${ projectId }`, { headers } )
			.pipe(
				map( ( value ) => new Project( value ) ),
			);
	}

	getProjectSummaryById( id ) {
		return this.http.get<IProjectSummary[]>( this.urlSummary + '/summary/projects/' + id );
	}

	getProjectMetadata() {
		return this.http.get<IProjectMetadata>( this.url + '/metadata' );
	}

	getAllProjectsSummary() {
		return this.http.get<IProjectSummary[]>( this.urlSummary + '/summary/projects' );
	}

	updateProject( projectId, body ) {
		return this.http.put<IProject>( this.url + `/${ projectId }`, body );
	}

	////////////////////////////////////////

	//////////// LEAD STATUS ///////////////

	getAllLeadStatus() {
		return this.http.get<ILeadsStatusCategory>( this.urlStatus )
			.pipe(
				map( value => value.categories.map( value1 => new LeadStatus( value1 ) ) )
			);
	}

	getStatusByProjectId( projectId ) {
		return this.http.get<IStatus[]>( this.url + `/${ projectId }/statuses` );
	}

	//////////// CAMPAIGN  //////////////

	getAllCampaigns( projectId, date?: { since: string, until: string }, force = false ) {
		const headers = force ? this.apiService.needForce() : undefined;
		const params = {};
		if ( date ) {
			params['since'] = date.since;
			params['until'] = date.until;
		}
		return this.http.get<ICampaign[]>( this.url + `/${ projectId }/campaigns`, { params, headers } )
			.pipe(
				map( value => value.map( value1 => new Campaign( value1 ) ) )
			);
	}

	getAllCampaignsSummary( force = false ) {
		const headers = force ? this.apiService.needForce() : undefined;
		return this.http.get<ICampaignSummary[]>( this.urlSummary + '/summary/campaigns', { headers } );
	}

	createCampaign( idProject, body ) {
		return this.http.post( this.url + `/${ idProject }/campaigns`, body );
	}

	updateCampaign( idCampaign, body ) {
		return this.http.put<ICampaign>( this.urlCampaign + `/${ idCampaign }`, body )
			.pipe(
				map( ( value ) => new Campaign( value ) )
			);
	}

	getCampaignMetadata() {
		return this.http.get<ICampaignMetadata>( this.urlCampaign + '/metadata' );
	}

	////////////////////////////////////

	//////////// CHANNELS //////////////

	getAllChannelsByProject( projectId, date?: { since: string; until: string }, force = false ) {
		const headers = force ? this.apiService.needForce() : undefined;
		const params = {};
		if ( date ) {
			params['since'] = date.since;
			params['until'] = date.until;
		}
		return this.http.get<IChannel[]>( this.url + `/${ projectId }/channels`, { params, headers } )
			.pipe(
				map( value => value.map( value1 => new Channel( value1 ) ) )
			);
	}

	getAllChannels() {
		return this.http.get<IChannel[]>( this.urlChannel )
			.pipe(
				map( value => value.map( value1 => new Channel( value1 ) ) )
			);
	}

	getChannelMetadata() {
		return this.http.get<IChannelMetadata>( this.urlChannel + `/metadata` );
	}

	updateChannel( channelId, body ) {
		return this.http.put( this.urlChannel + `/${ channelId }`, body );
	}

	createChannel( campaignId, body ) {
		return this.http.post( this.urlCampaign + `/${ campaignId }/channels`, body );
	}

	////////////////////////////////////

	//////////// FORMS //////////////

	getAllForms() {
		return this.http.get<IForm[]>( this.urlForm )
			.pipe(
				map( value => value.map( value1 => new Form( value1 ) ) )
			);
	}

	getFormMetadata() {
		return this.http.get<IFormMetadata>( this.urlForm + '/metadata' );
	}

	getFormChannel() {
		return this.http.get<IChannel[]>( this.urlForm + '/0/channels' )
			.pipe(
				map( value => value.map( value1 => new Channel( value1 ) ) )
			);
	}

	createForms( body: any[] ) {
		return this.http.post<IForm[]>( this.urlForm, body )
			.pipe(
				map( value => value.map( value1 => new Form( value1 ) ) )
			);
	}

	updateForms( id, body ) {
		return this.http.put( this.urlForm + `/${ id }`, body );
	}

	////////////////////////////////////
	//////////// 	LEADS	////////////

	setStoreAllLeads() {
		return this.leadStore.hasStorage()
			.pipe(
				switchMap( value => {
					if ( value ) {
						const date = localStorage.getItem( 'lastLeadsUpdate' );
						return this.http.get<ILead[]>( this.urlLead, { params: { last_sync: date } } )
							.pipe(
								switchMap( value1 => this.leadStore.updateStorage( value1 ) )
							);
					} else {
						// limit to 5000
						return this.partialDownloadLead()
							.pipe(
								switchMap( value1 => {
									const lastValue = value1[value1.length - 1];
									if ( value1.length === 0 ) {
										return of( 'nothing' );
									} else if ( lastValue.hasOwnProperty( 'lastKey' ) ) {
										this.leadStore.leadTemp = value1;
										this.leadStore.isNeedUpdate = lastValue.lastKey;
										return of( 'nothing' );
									} else {
										this.leadStore.leadTemp = value1;
										this.leadStore.isNeedUpdate = 'no';
										return this.leadStore.writeLeadTempToStorage();
									}
								} )
							);
					}
				} )
			);
	}

	private getAllLeadsFromApi( value? ) {
		const param = {};
		if ( value !== undefined ) {
			param['last_key'] = value;
		}
		return this.http.get<ILead[]>( this.urlLead, { params: { size: '5000', ...param } } );
	}

	private partialDownloadLead() {
		return this.leadStore.isNeedUpdate$
			.pipe(
				filter( value => value !== 'no' ),
				switchMap( ( value ) => {
					return this.getAllLeadsFromApi( value );
				} ),
			);
	}

	getAllLeads() {
		return this.leadStore.isReady
			// return this.http.get<ILead[]>( this.urlLead, { params: { last_sync: date } } )
			.pipe(
				filter( value => value ),
				take( 1 ),
				switchMap( value => {
					const date = localStorage.getItem( 'lastLeadsUpdate' );
					return this.http.get<ILead[]>( this.urlLead, { params: { last_sync: date } } );
				} ),
				switchMap( value1 => this.leadStore.updateStorage( value1 ) ),
				switchMap( () => {
					return this.leadStore.getAllValue()
						.pipe(
							map( ( value: ILead[] ) => value.map( value1 => new Lead( value1 ) ) )
						);
				} ),
			);
	}

	getLeadsByProjectId( projectId ) {
		return this.leadStore.isReady
			// const date = localStorage.getItem('lastLeadsUpdate');
			// return this.http.get<ILead[]>(this.urlLead, {params: {last_sync: date}})
			.pipe(
				filter( value => value ),
				take( 1 ),
				switchMap( () => {
					const date = localStorage.getItem( 'lastLeadsUpdate' );
					return this.http.get<ILead[]>( this.urlLead, { params: { last_sync: date } } );
				} ),
				switchMap( value1 => this.leadStore.updateStorage( value1 ) ),
				switchMap( () => {
					return this.leadStore.getAllValue()
						.pipe(
							map( ( value: ILead[] ) => {
								return value.filter( value1 => {
									if ( value1.group ) {
										return value1.group.projectId === Number( projectId );
									}
								} );
							} ),
							map( value => {
								return value.map( value2 => new Lead( value2 ) );
							} )
						);
				} )
			);

		/*return this.http.get<ILead[]>( this.urlLead, { params: { project_id: projectId } } )
			.pipe(
				map( value => value.map( value1 => new Lead( value1 ) ) )
			);*/
	}

	getLeadsById( idLead ) {
		return this.http.get<ILead>( this.urlLead + `/${ idLead }`, { params: { detailed: 'true' } } )
			.pipe( map( value => new Lead( value ) ) );
	}

	getLeadsJourney( idLead ) {
		return this.http.get<ILeadJourney[]>( this.urlLead + `/${ idLead }/journeys` );
	}

	getLeadsMetadata() {
		return this.http.get<ILeadsMetadata>( this.urlLead + `/metadata` );
	}

	getLeadsTemplate( idChannel ) {
		return this.http.get( this.urlTemplate, { params: { channel_id: idChannel }, responseType: 'blob' } );
	}

	getLeadsWithJourney( config ) {
		const params = config;
		params.last_journey = 5;
		return this.http.get<ILeadWithJourney[]>( this.urlLead, { params } )
			.pipe( map( value => value.map( value1 => new LeadWithJourney( value1 ) ) ) );
	}

	////////////////////////////////////
	//////////// 	PRODUCTS	////////////

	getAllProduct() {
		return this.http.get<IProduct[]>( this.urlProduct );
	}

	getProductById( idProduct ) {
		return this.http.get<IProduct>( this.urlProduct + `/${ idProduct }` );
	}

	updateProduct( idProduct, body ) {
		return this.http.put( this.urlProduct + `/${ idProduct }`, body );
	}

	/*createProducts( idProject, body ) {
		return this.http.post( this.url + `/${ idProject }/products`, body );
	}*/
	createProducts( body ) {
		return this.http.post( this.urlProduct, body );
	}

	getProductPicturesById( idProduct ) {
		return this.http.get<IProductPicture[]>( this.urlProduct + `/${ idProduct }/pictures` );
	}

	createProductPicture( idProduct, body ) {
		return this.http.post<IProductPicture[]>( this.urlProduct + `/${ idProduct }/pictures`, body );
	}

	////////////////////////////////////

	////////////////////////////////////
	//////////// 	CUSTOMERS	////////////

	getAllCustomers() {
		return this.http.get<ICustomer[]>( this.urlCustomer )
			.pipe( map( value => value.map( value1 => new Customer( value1 ) ) ) );
	}

	getCustomerByProject( projectId ) {
		const params = {
			project_id: projectId
		};
		return this.http.get <ICustomer[]>( this.urlCustomer, { params } )
			.pipe( map( value => value.map( value1 => new Customer( value1 ) ) ) );

	}

	getCustomerJourney( uuid ) {
		return this.http.get<ICustomerJourney[]>( this.urlCustomer + `/${ uuid }/journeys` );
		// .pipe( map( value => value.map( value1 => new Customer( value1 ) ) ) );
	}

	getCustomerProductArchived( uuid ) {
		const params = {
			achieved_only: '1'
		};
		return this.http.get<ICustomerJourney[]>( this.urlCustomer + `/${ uuid }/journeys`, { params } );
	}

	getCustomerInvoice( customerUuid, uuid ) {
		let headers = new HttpHeaders();
		headers = headers.set( 'Accept', 'application/pdf' );
		const params = {
			customer_uuid: customerUuid,
			uuid
		};
		return this.http.get( this.urlCustomerInvoice, { params, headers, responseType: 'blob' } );
	}

	////////////////////////////////////
}
