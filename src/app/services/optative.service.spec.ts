import { TestBed } from '@angular/core/testing';

import { OptativeService } from './optative.service';

describe('OptativeService', () => {
  let service: OptativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
