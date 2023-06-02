import { TestBed } from '@angular/core/testing';

import { BgServiceService } from './bg-service.service';

describe('BgServiceService', () => {
  let service: BgServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BgServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
