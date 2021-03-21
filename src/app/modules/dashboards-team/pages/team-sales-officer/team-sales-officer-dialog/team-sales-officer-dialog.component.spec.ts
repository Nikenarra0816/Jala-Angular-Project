import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalesOfficerDialogComponent } from './team-sales-officer-dialog.component';

describe('TeamSalesOfficerDialogComponent', () => {
  let component: TeamSalesOfficerDialogComponent;
  let fixture: ComponentFixture<TeamSalesOfficerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSalesOfficerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSalesOfficerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
