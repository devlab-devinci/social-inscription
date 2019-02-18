import { TestBed } from '@angular/core/testing';

import { SubscribersService } from './subscribers.service';

describe('SubscribersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubscribersService = TestBed.get(SubscribersService);
    expect(service).toBeTruthy();
  });
});
