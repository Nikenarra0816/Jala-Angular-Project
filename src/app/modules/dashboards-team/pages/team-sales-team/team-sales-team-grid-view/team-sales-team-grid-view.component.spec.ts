import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalesTeamGridViewComponent } from './team-sales-team-grid-view.component';

describe( 'TeamListGridViewComponent', () => {
	let component: TeamSalesTeamGridViewComponent;
	let fixture: ComponentFixture<TeamSalesTeamGridViewComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			declarations: [ TeamSalesTeamGridViewComponent ]
		} )
			.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( TeamSalesTeamGridViewComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );
} );
