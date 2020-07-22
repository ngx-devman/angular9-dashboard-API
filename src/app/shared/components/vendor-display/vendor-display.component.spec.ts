import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDisplayComponent } from './vendor-display.component';

describe('VendorDisplayComponent', () => {
  let component: VendorDisplayComponent;
  let fixture: ComponentFixture<VendorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
