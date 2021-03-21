import { TestBed, async, inject } from '@angular/core/testing';

import { CheckPaymentGuard } from './check-payment.guard';

describe('CheckPaymentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckPaymentGuard]
    });
  });

  it('should ...', inject([CheckPaymentGuard], (guard: CheckPaymentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
