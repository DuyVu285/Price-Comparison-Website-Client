import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyViewedProductsComponent } from './recently-viewed-products.component';

describe('RecentlyViewedProductsComponent', () => {
  let component: RecentlyViewedProductsComponent;
  let fixture: ComponentFixture<RecentlyViewedProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentlyViewedProductsComponent]
    });
    fixture = TestBed.createComponent(RecentlyViewedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
