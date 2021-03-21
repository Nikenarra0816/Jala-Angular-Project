export interface IProduct {
	id: number;
	name: string;
	sort: number;
	price: number;
	minBookingPrice: number;
	isActive: boolean;
	detail: string;
	modifiedBy?: any;
	modifiedAt?: any;
	createdBy: number;
	createdAt: Date;
	tenantId: number;
	projects: (IProductProjects | null)[] | null;
	pictures: (IProductPicture | null)[] | null;
	totalPrice: number;
	avaragePrice: number;
}

export class Product {
	constructor( public data: IProduct ) {
	}
}

export interface IProductPicture {
	id: number;
	title: string;
	path: string;
	sort: number;
	isActive: boolean;
	modifiedBy?: null;
	modifiedAt?: null;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	product: {
		id: number;
	};
}

export interface IProductProjects {
	id: number;
	name: string;
	detail: string;
	periodStart: string;
	periodEnd?: string | null;
	status: string;
	modifiedBy?: number | null;
	modifiedAt?: string | null;
	createdBy: number;
	createdAt: string;
	tenantId: number;
}
