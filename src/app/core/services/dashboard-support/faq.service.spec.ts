import { TestBed } from '@angular/core/testing';

import { DashboardSupportService } from './dashboard-support.service';

describe('FaqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardSupportService = TestBed.get(DashboardSupportService);
    expect(service).toBeTruthy();
  });
});
