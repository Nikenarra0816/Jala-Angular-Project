import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalesOfficerListViewComponent } from './team-sales-officer-list-view.component';

describe('TeamSalesOfficerListViewComponent', () => {
  let component: TeamSalesOfficerListViewComponent;
  let fixture: ComponentFixture<TeamSalesOfficerListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSalesOfficerListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSalesOfficerListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
