import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutProductsPage } from './about-products.page';

describe('AboutProductsPage', () => {
  let component: AboutProductsPage;
  let fixture: ComponentFixture<AboutProductsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
