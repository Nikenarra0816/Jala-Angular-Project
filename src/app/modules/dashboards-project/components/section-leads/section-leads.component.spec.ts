import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLeadsComponent } from './section-leads.component';

describe('SectionLeadsComponent', () => {
  let component: SectionLeadsComponent;
  let fixture: ComponentFixture<SectionLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
