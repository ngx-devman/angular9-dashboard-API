import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedTagComponent } from './purchased-tag.component';

describe('PurchasedTagComponent', () => {
  let component: PurchasedTagComponent;
  let fixture: ComponentFixture<PurchasedTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
