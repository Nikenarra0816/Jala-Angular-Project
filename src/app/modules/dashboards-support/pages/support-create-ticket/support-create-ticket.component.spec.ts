import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportCreateTicketComponent } from './support-create-ticket.component';

describe('TicketingDashboardComponent', () => {
  let component: SupportCreateTicketComponent;
  let fixture: ComponentFixture<SupportCreateTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportCreateTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportCreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
