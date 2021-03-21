import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { IPipeline, IPipelineList } from '@shared/models/pipeline.model';

@Injectable()
export class DashboardPipelineService {

	private urlPipeline = this.apiService.getUrl + 'pipelines';
	private urlPipelineList = this.apiService.getUrl + 'pipelinelists';

	constructor( private apiService: ApiService, private http: HttpClient ) {
	}

	//////////// COLOR USED /////////////////
	// tslint:disable-next-line:variable-name
	private readonly _colorUsed = new BehaviorSubject<IColorUsed>( { color: '#FFCFCC', secondaryColor: '#FF4D42' } );

	readonly colorUsed$ = this._colorUsed.asObservable();

	set colorUsed( val: IColorUsed ) {
		this._colorUsed.next( val );
	}

	///////////////////////////////////////

	///////////////////////////
	/*        ASLI COK       */

	getAllPipeline( force = true ) {
		const headers = force ? this.apiService.needForce() : undefined;
		return this.http.get<IPipeline[]>( this.urlPipeline, { headers } );
	}

	getPipelineById( pipelineId ) {
		return this.http.get<IPipeline>( this.urlPipeline + `/${ pipelineId }` );
	}

	updatePipeline( pipelineId, body ) {
		return this.http.put( this.urlPipeline + `/${ pipelineId }`, body );
	}

	deletePipeline( pipelineId ) {
		return this.http.delete( this.urlPipeline + `/${ pipelineId }` );
	}

	createPipeline( body ) {
		return this.http.post( this.urlPipeline, [ body ] );
	}

	getPipelineList( pipelineId ) {
		return this.http.get<IPipelineList[]>( this.urlPipeline + `/${ pipelineId }/lists` );
	}

	createPipelineList( pipelineId, body ) {
		return this.http.post( this.urlPipeline + `/${ pipelineId }/lists`, [ body ] );
	}

	updatePipelineList( pipelineListId, body ) {
		return this.http.put( this.urlPipelineList + `/${ pipelineListId }`, body );
	}

	deletePipelineList( pipelineId ) {
		return this.http.delete( this.urlPipeline + `/${ pipelineId }/lists` );
	}
}

export interface IColorUsed {
	color: string;
	secondaryColor: string;
}

/*
export interface PipelineDummy {
	color: string;
	title: string;
	total_lead: number;
	id: number;
	projectId: number;
}

export interface PipelineListDummy {
	title: string;
	status: ILeadsMetadataStatusesEntity[];
	id: number;
	pipelineId: number;
	projectId: number;
}

const data: PipelineDummy[] = [
	{ color: '#FFCFCC', title: 'Pipeline Januari', total_lead: 200, id: 1, projectId: 7 },
	{ color: '#FFCA99', title: 'Pipeline Februari', total_lead: 2, id: 2, projectId: 7 },
	{ color: '#CFECFC', title: 'Pipeline Maret', total_lead: 20, id: 3, projectId: 7 },
	{ color: '#F2A6D4', title: 'Pipeline April', total_lead: 2000, id: 4, projectId: 7 },
	{ color: '#B5E3D0', title: 'Pipeline Mei', total_lead: 9022, id: 5, projectId: 7 },
	{ color: '#D9D9D9', title: 'Pipeline Juni', total_lead: 4, id: 6, projectId: 7 },
];*/
