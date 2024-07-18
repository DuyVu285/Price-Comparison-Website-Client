import { TestBed } from '@angular/core/testing';

import { UnfiteredProductsService } from './unfiltered-products.service';

describe('UnfiteredProductsService', () => {
  let service: UnfiteredProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnfiteredProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
