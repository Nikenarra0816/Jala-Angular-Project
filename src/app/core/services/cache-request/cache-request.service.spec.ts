import { TestBed } from '@angular/core/testing';

import { CacheRequestService } from './cache-request.service';

describe('CacheRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheRequestService = TestBed.get(CacheRequestService);
    expect(service).toBeTruthy();
  });
});
