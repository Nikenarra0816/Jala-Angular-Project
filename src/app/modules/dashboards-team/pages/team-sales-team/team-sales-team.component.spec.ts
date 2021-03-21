import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalesTeamComponent } from './team-sales-team.component';

describe( 'TeamStatisticComponent', () => {
	let component: TeamSalesTeamComponent;
	let fixture: ComponentFixture<TeamSalesTeamComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			declarations: [ TeamSalesTeamComponent ]
		} )
			.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( TeamSalesTeamComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );
} );
