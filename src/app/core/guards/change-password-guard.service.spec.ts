import { TestBed } from '@angular/core/testing';

import { ChangePasswordGuardService } from './change-password-guard.service';

describe('ChangePasswordGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangePasswordGuardService = TestBed.get(ChangePasswordGuardService);
    expect(service).toBeTruthy();
  });
});
