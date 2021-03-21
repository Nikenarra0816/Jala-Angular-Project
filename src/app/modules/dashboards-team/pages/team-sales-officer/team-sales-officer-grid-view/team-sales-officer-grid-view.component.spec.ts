import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalesOfficerGridViewComponent } from './team-sales-officer-grid-view.component';

describe('TeamSalesOfficerGridViewComponent', () => {
  let component: TeamSalesOfficerGridViewComponent;
  let fixture: ComponentFixture<TeamSalesOfficerGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSalesOfficerGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSalesOfficerGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
