import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastInvoiceComponent } from './past-invoice.component';

describe('PastInvoiceComponent', () => {
  let component: PastInvoiceComponent;
  let fixture: ComponentFixture<PastInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
