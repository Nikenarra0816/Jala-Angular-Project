import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalesTeamListViewComponent } from './team-sales-team-list-view.component';

describe( 'TeamListListViewComponent', () => {
	let component: TeamSalesTeamListViewComponent;
	let fixture: ComponentFixture<TeamSalesTeamListViewComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			declarations: [ TeamSalesTeamListViewComponent ]
		} )
			.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( TeamSalesTeamListViewComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );
} );
