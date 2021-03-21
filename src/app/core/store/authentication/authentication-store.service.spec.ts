import { TestBed } from '@angular/core/testing';

import { AuthenticationStoreService } from './authentication-store.service';

describe('AuthenticationStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationStoreService = TestBed.get(AuthenticationStoreService);
    expect(service).toBeTruthy();
  });
});
