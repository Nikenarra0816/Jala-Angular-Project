export interface ICustomer {
	interests?: (ICustomerInterests)[] | null;
	location: {
		locationId: number;
		location: string;
	};
	status: ICustomerStatus;
	group: ICustomerGroup;
	statistic: {
		call: number;
		whatsappCall: number;
	};
	owner: ICustomerOwner;
	additionalInfo: {
		ktpNumber?: string | null;
	};
	reminder?: string | null;
	achievedTimes: number;
	totalPurchased: number;
	purchaseTaxAmmount: number;
	bookmarked: boolean;
	modifiedAt: string;
	createdAt: string;
	address?: string | null;
	name: string;
	gender: string;
	documents?: (ICustomerDocuments)[] | null;
	note: string;
	uuid: string;
	totalPurchasedQty?: number | null;
	phone: string;
	achievedAt?: string | null;
  	email?: string | null;
}

export interface ICustomerInterests {
	productId: number;
	product: string;
	productPrice: number;
	productTotalBasePrice: number;
	productTotalPrice: number;
	productBasePrice: number;
	productQty: number;
}
export interface ICustomerStatus {
	statusId: number;
	statusSort: number;
	categorySort: number;
	availability: string;
	category: string;
	categoryId: number;
	status: string;
}
export interface ICustomerGroup {
	campaignId: number;
	channel: string;
	campaign: string;
	project: string;
	mediaType: string;
	media: string;
	projectId: number;
	channelId: number;
}
export interface ICustomerOwner {
	teams?: (ICustomerTeamsEntity)[] | null;
	userId: number;
	user: string;
}
export interface ICustomerTeamsEntity {
	teamId: number;
	team: string;
}
export interface ICustomerDocuments {
	type: string;
	path: string;
	info: ICustomerDocumentsInfo;
}
export interface ICustomerDocumentsInfo {
	location: string;
	longlat: string;
}

export class Customer {
	constructor( public data: ICustomer ) {
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

	get getSalesOfficer() {
		return {
			id: this.data.owner.userId,
			name: this.data.owner.user
		};
	}
}

/////////////////////////// CUSTOMER JOURNEYS ////////////////////////////////

export interface ICustomerJourney {
	interests?: (ICustomerJourneyInterestsEntity | null)[] | null;
	location: ICustomerJourneyLocation;
	status: ICustomerJourneyStatus;
	group: ICustomerJourneyGroup;
	note?: string | null;
	statistic: ICustomerJourneyStatistic;
	owner: ICustomerJourneyOwner;
	achievedTimes: number;
	totalPurchased: number;
	totalPurchasedQty: number;
	purchaseTaxAmmount: number;
	activity: string;
	bookmarked: boolean;
	createdAt: string;
	address?: string | null;
	name: string;
	gender: string;
	activityDetail: string;
	customerUuid: string;
	uuid: string;
	phone: string;
	additionalInfo: ICustomerJourneyAdditionalInfo;
	achievedAt?: string | null;
	documents?: (ICustomerJourneyDocuments)[] | null;
}
export interface ICustomerJourneyDocuments {
	type: string;
	path: string;
	info: {
		location: string;
		longlat: string;
	};
}
export interface ICustomerJourneyInterestsEntity {
	productId: number;
	product: string;
	productPrice: number;
	productTotalBasePrice: number;
	productTotalPrice: number;
	productBasePrice: number;
	productQty: number;
}
export interface ICustomerJourneyLocation {
	locationId: number;
	location: string;
}
export interface ICustomerJourneyStatus {
	statusId: number;
	statusSort: number;
	categorySort: number;
	availability: string;
	category: string;
	categoryId: number;
	status: string;
}
export interface ICustomerJourneyGroup {
	campaignId: number;
	channel: string;
	campaign: string;
	project: string;
	mediaType: string;
	media: string;
	projectId: number;
	channelId: number;
}
export interface ICustomerJourneyStatistic {
	call: number;
	whatsappCall: number;
}
export interface ICustomerJourneyOwner {
	teams?: (ICustomerJourneyOwnerTeams)[] | null;
	userId: number;
	user: string;
}
export interface ICustomerJourneyOwnerTeams {
	teamId: number;
	team: string;
}
export interface ICustomerJourneyAdditionalInfo {
	ktpNumber?: null;
}
