import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsDashboardComponent } from './models-dashboard.component';

describe('ModelsDashboardComponent', () => {
  let component: ModelsDashboardComponent;
  let fixture: ComponentFixture<ModelsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelsDashboardComponent]
    });
    fixture = TestBed.createComponent(ModelsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
