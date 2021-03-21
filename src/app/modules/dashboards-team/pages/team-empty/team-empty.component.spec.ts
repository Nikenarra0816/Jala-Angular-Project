import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamNewComponent } from './team-empty.component';

describe('TeamNewComponent', () => {
  let component: TeamNewComponent;
  let fixture: ComponentFixture<TeamNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
