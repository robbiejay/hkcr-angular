import { TestBed } from '@angular/core/testing';

import { LazyService } from './lazy.service';

describe('LazyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LazyService = TestBed.get(LazyService);
    expect(service).toBeTruthy();
  });
});
