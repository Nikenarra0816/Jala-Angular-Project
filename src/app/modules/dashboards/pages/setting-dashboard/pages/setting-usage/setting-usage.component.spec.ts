import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingUsageComponent } from './setting-usage.component';

describe('SettingUsageComponent', () => {
  let component: SettingUsageComponent;
  let fixture: ComponentFixture<SettingUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
