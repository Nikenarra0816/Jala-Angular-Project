import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalesOfficerMigrateTableComponent } from './team-sales-officer-migrate-table.component';

describe('TeamSalesOfficerMigrateTableComponent', () => {
  let component: TeamSalesOfficerMigrateTableComponent;
  let fixture: ComponentFixture<TeamSalesOfficerMigrateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSalesOfficerMigrateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSalesOfficerMigrateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
