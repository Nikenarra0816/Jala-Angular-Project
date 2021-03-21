import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListSummaryComponent } from './card-list-summary.component';

describe('CardListSummaryComponent', () => {
  let component: CardListSummaryComponent;
  let fixture: ComponentFixture<CardListSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardListSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
