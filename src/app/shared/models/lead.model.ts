export interface ILead {
	bookmarked: boolean;
	location: ILeadLocation;
	modifiedAt: string;
	status: ILeadStatus;
	reminder?: string | null;
	createdAt: string;
	address?: string | null;
	group: ILeadGroup;
	name: string;
	gender: string;
	birthdate?: string | null;
	note?: string | null;
	statistic: ILeadStatistic;
	uuid: string;
	owner: ILeadOwner;
	point: number;
	phone: string;
	additionalInfo: ILeadAdditionalInfo;
	interests?: ( ILeadInterests )[] | null;
	interest: ILeadInterest;
	email?: string | null;
	documents?: ( ILeadDocumentsEntity )[] | null;
	lastKey?: string | null;
	tenantId: number;
}

export interface ILeadInterest {
	productId: number;
	product: string;
	productPrice: number;
}

export interface ILeadLocation {
	locationId: number;
	location: string;
	relatedLocations?: ( {
		locationId: number;
		location: string;
	} )[] | null;
}

export interface ILeadStatus {
	statusId: number;
	statusSort: number;
	categorySort: number;
	availability: string;
	category: string;
	categoryId: number;
	status: string;
}

export interface ILeadGroup {
	campaignId: number;
	channel: string;
	campaign: string;
	project: string;
	mediaType: string;
	media: string;
	projectId: number;
	channelId: number;
}

export interface ILeadInterests {
	productId: number;
	product: string;
	productPrice: number;
	productTotalBasePrice: number;
	productTotalPrice: number;
	productBasePrice: number;
	productQty: number;
}

export interface ILeadStatistic {
	call: number;
	whatsappCall: number;
}

export interface ILeadOwner {
	userId: number;
	user: string;
	teams?: ( ILeadTeamsEntity )[] | null;
}

export interface ILeadTeamsEntity {
	teamId: number;
	team: string;
}

export interface ILeadAdditionalInfo {
	ktpNumber?: string | null;
	noKTP?: null;
}

export interface ILeadDocumentsEntity {
	type: string;
	path: string;
	info: ILeadInfo;
}

export interface ILeadInfo {
	location: string;
	longlat: string;
}


export class Lead {
	constructor( public data: ILead ) {
	}

	get getChannel() {
		return {
			id: this.data.group.channelId,
			name: this.data.group.channel
		};
	}

	get getCampaign() {
		return {
			id: this.data.group.campaignId,
			name: this.data.group.campaign
		};
	}

	get getMedia() {
		return {
			id: this.data.group.mediaType,
			name: this.data.group.mediaType
		};
	}

	get getSalesTeam() {
		if ( this.data.owner && this.data.owner.teams ) {
			if ( this.data.owner.teams.length !== 0 ) {
				return {
					id: this.data.owner.teams[0].teamId,
					name: this.data.owner.teams[0].team
				};
			}
		}
		return {
			id: 9999999293129,
			name: 'null'
		};
	}

	get getSalesOfficer() {
		return {
			id: this.data.owner.userId,
			name: this.data.owner.user
		};
	}

	get getCategory() {
		return {
			id: this.data.status.categoryId,
			name: this.data.status.category
		};
	}

	get getCategorySort() {
		return {
			id: this.data.status.categorySort,
			name: this.data.status.category
		};
	}

	get getStatus() {
		return {
			id: this.data.status.statusId,
			name: this.data.status.status
		};
	}

	get getStatusSort() {
		return {
			id: this.data.status.statusSort,
			name: this.data.status.status
		};
	}

	get getInterests() {
		if ( this.data.interests ) {
			return this.data.interests.map( value => {
				return {
					id: value.productId,
					name: value.product
				};
			} );
		} else {
			return [];
		}
	}

	get getAllProductTotalPrice(): number {
		if ( this.data.interests.length !== 0 ) {
			return this.data.interests.reduce( ( acc2, cur2 ) => acc2 + cur2.productTotalPrice, 0 );
		} else {
			return 0;
		}
	}

	get getGender(): string {
		if ( this.data.gender ) {
			if ( this.data.gender !== 'notSpecified' ) {
				return this.data.gender;
			}
		}
		return '-';
	}

	get getLocation(): string {
		let loc = '-';
		if ( this.data.location ) {
			if ( this.data.location.location ) {
				loc = this.data.location.location;
			}
		}
		return loc;
	}

	get getKtp(): string {
		let ktp = '-';
		if ( this.data.additionalInfo ) {
			if ( this.data.additionalInfo.noKTP ) {
				ktp = this.data.additionalInfo.noKTP;
			}
			if ( this.data.additionalInfo.ktpNumber ) {
				ktp = this.data.additionalInfo.ktpNumber;
			}
		}
		return ktp;
	}
}


export interface ILeadsMetadata {
	categories?: ( ILeadsMetadataCategoriesEntity )[] | null;
}

export interface ILeadsMetadataCategoriesEntity {
	id: number;
	name: string;
	sort: number;
	color: string;
	availability: string;
	statuses?: ( ILeadsMetadataStatusesEntity )[] | null;
}

export interface ILeadsMetadataStatusesEntity {
	id: number;
	tenantCategory: string;
	name: string;
	detail: string;
	sort: number;
	point: number;
	color: string;
	category: {
		id: number;
	};
}


export interface ILeadJourney {
	activity: string;
	bookmarked: boolean;
	location: ILeadJourneyLocation;
	status: ILeadJourneyStatus;
	reminder: string;
	createdAt: string;
	address?: null;
	group: ILeadJourneyGroup;
	email?: string | null;
	name: string;
	gender: string;
	interests: ( ILeadJourneyInterest )[] | null;
	activityDetail: string;
	leadUuid: string;
	note: string;
	statistic: ILeadJourneyStatistic;
	uuid: string;
	owner: ILeadJourneyOwner;
	point: number;
	phone: string;
	additionalInfo: ILeadJourneyAdditionalInfo;
	documents?: ( ILeadJourneyDocumentsEntity )[] | null;
}

export interface ILeadJourneyLocation {
	locationId: number;
	location: string;
}

export interface ILeadJourneyStatus {
	statusId: number;
	statusSort: number;
	categorySort: number;
	availability: string;
	category: string;
	categoryId: number;
	status: string;
}

export interface ILeadJourneyGroup {
	campaignId: number;
	channel: string;
	campaign: string;
	project: string;
	mediaType: string;
	media: string;
	projectId: number;
	channelId: number;
}

export interface ILeadJourneyInterest {
	productId: number;
	product: string;
	productPrice: number;
	productTotalBasePrice: number;
	productTotalPrice: number;
	productBasePrice: number;
	productQty: number;
}

export interface ILeadJourneyStatistic {
	call: number;
	whatsappCall: number;
}

export interface ILeadJourneyOwner {
	userId: number;
	user: string;
	teams?: ( ILeadJourneyTeamsEntity )[] | null;
}

export interface ILeadJourneyTeamsEntity {
	teamId: number;
	team: string;
}

export interface ILeadJourneyAdditionalInfo {
	ktpNumber?: null;
}

export interface ILeadJourneyDocumentsEntity {
	type: string;
	path: string;
	info: ILeadJourneyInfo;
}

export interface ILeadJourneyInfo {
	location: string;
	longlat: string;
}


export interface ParamsLeadDownload {
	start?: string;
	end?: string;
	project_id?: number;
	campaign_id?: number;
	channel_id?: number;
	media_type?: string;
	team_id?: string;
	owner_id?: string;
	category_id?: number;
	status?: string;
	last_journey?: number;
	size?: number;
	last_key?: string;
}

export class LeadWithJourney extends Lead {
	constructor( public data: ILeadWithJourney ) {
		super( data );
	}

	get getJourney() {
		if ( this.data.journeys ) {
			return this.data.journeys;
		}
	}
}

export interface ILeadWithJourney extends ILead {
	journeys?: ( ILeadWithJourneyJourneysEntity )[] | null;
}

export interface ILeadWithJourneyStatus {
	statusId: number;
	statusSort: number;
	categorySort: number;
	availability: string;
	category: string;
	categoryId: number;
	status: string;
}

export interface ILeadWithJourneyJourneysEntity {
	interests?: ( null )[] | null;
	createdAt: string;
	note?: string | null;
	status: ILeadWithJourneyStatus;
}
