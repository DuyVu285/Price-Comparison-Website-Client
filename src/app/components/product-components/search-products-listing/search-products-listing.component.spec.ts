import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductsListingComponent } from './search-products-listing.component';

describe('SearchProductsListingComponent', () => {
  let component: SearchProductsListingComponent;
  let fixture: ComponentFixture<SearchProductsListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchProductsListingComponent]
    });
    fixture = TestBed.createComponent(SearchProductsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
