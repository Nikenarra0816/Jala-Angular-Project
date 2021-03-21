import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalesOfficerComponent } from './team-sales-officer.component';

describe('TeamSalesOfficerComponent', () => {
  let component: TeamSalesOfficerComponent;
  let fixture: ComponentFixture<TeamSalesOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSalesOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSalesOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
