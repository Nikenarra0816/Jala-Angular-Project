import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalesTeamDialogComponent } from './team-sales-team-dialog.component';

describe('TeamSalesTeamDialogComponent', () => {
  let component: TeamSalesTeamDialogComponent;
  let fixture: ComponentFixture<TeamSalesTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSalesTeamDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSalesTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
