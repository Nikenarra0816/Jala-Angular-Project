import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalesOfficerAddComponent } from './team-sales-officer-add.component';

describe('TeamSalesOfficerAddComponent', () => {
  let component: TeamSalesOfficerAddComponent;
  let fixture: ComponentFixture<TeamSalesOfficerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSalesOfficerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSalesOfficerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
