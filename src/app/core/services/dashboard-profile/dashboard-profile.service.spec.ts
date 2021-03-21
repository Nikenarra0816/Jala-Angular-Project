import { TestBed } from '@angular/core/testing';

import { DashboardProfileService } from './dashboard-profile.service';

describe('DashboardProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardProfileService = TestBed.get(DashboardProfileService);
    expect(service).toBeTruthy();
  });
});
