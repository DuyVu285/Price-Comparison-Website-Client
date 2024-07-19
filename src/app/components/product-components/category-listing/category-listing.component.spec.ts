import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListingComponent } from './category-listing.component';

describe('CategoryListingComponent', () => {
  let component: CategoryListingComponent;
  let fixture: ComponentFixture<CategoryListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryListingComponent]
    });
    fixture = TestBed.createComponent(CategoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
