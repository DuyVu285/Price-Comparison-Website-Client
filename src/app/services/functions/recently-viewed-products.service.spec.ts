import { TestBed } from '@angular/core/testing';

import { RecentlyViewedProductsService } from './recently-viewed-products.service';

describe('RecentlyViewedProductsService', () => {
  let service: RecentlyViewedProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentlyViewedProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
