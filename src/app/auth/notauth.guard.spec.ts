import { TestBed, async, inject } from '@angular/core/testing';

import { NotauthGuard } from './notauth.guard';

describe('NotauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotauthGuard]
    });
  });

  it('should ...', inject([NotauthGuard], (guard: NotauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
