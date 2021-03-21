import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalesTeamAddComponent } from './team-sales-team-add.component';

describe('TeamSalesTeamAddComponent', () => {
  let component: TeamSalesTeamAddComponent;
  let fixture: ComponentFixture<TeamSalesTeamAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSalesTeamAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSalesTeamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
