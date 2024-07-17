import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfilteredproductsDashboardComponent } from './unfilteredproducts-dashboard.component';

describe('UnfilteredproductsDashboardComponent', () => {
  let component: UnfilteredproductsDashboardComponent;
  let fixture: ComponentFixture<UnfilteredproductsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnfilteredproductsDashboardComponent]
    });
    fixture = TestBed.createComponent(UnfilteredproductsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
