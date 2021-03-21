import { TestBed } from '@angular/core/testing';

import { CustomStateService } from './custom-state.service';

describe('CustomStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomStateService = TestBed.get(CustomStateService);
    expect(service).toBeTruthy();
  });
});
