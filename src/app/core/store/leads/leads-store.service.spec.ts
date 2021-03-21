import { TestBed } from '@angular/core/testing';

import { LeadsStoreService } from './leads-store.service';

describe('LeadsStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeadsStoreService = TestBed.get(LeadsStoreService);
    expect(service).toBeTruthy();
  });
});
