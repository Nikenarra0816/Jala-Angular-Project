import { RolePage } from '@core/store/authentication/role-detail';

export interface ITokenUser {
	sub: string;
	email_verified: true;
	'custom:user_timezone': string;
	iss: string;
	'custom:user_id': string;
	phone_number_verified: boolean;
	'cognito:username': string;
	'custom:tenant_id': string;
	aud: string;
	event_id: string;
	token_use: string;
	'custom:user_role': 'client' | 'admin' | 'sales';
	auth_time: number;
	name: string;
	phone_number: string;
	exp: number;
	iat: number;
	email: string;
}

export interface IToken {
	AuthenticationResult: IAuthenticationResult;
	ChallengeParameters: object | null;
}

export interface IAuthenticationResult {
	AccessToken: string;
	ExpiresIn: number;
	IdToken: string;
	RefreshToken: string;
	TokenType: string;
}

export interface IUser {
	id: number;
	name: string;
	email: string;
	phone: string;
	role: string;
	status: string;
	address: string;
	gender: string;
	pic: string;
	company: string;
	picture: string;
	cognitoId: string;
	timezone: number;
	reminder: number;
	modifiedBy: number;
	modifiedAt: string;
	createdBy: number;
	createdAt: string;
	tenantId: number;
	teamMembers?: (null)[] | null;
	daysLeft: number;
	privileges: RolePage;
}


export class User {

	constructor( public data: IUser ) {
	}

	get isProfileComplete() {
		return !!( this.data.name && this.data.phone && this.data.email && this.data.address /* && this.data.picture */ && this.data.company );
	}
}
