import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalesOfficerMigrateComponent } from './team-sales-officer-migrate.component';

describe('TeamSalesOfficerMigrateComponent', () => {
  let component: TeamSalesOfficerMigrateComponent;
  let fixture: ComponentFixture<TeamSalesOfficerMigrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSalesOfficerMigrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSalesOfficerMigrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
