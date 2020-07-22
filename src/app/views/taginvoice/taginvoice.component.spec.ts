import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaginvoiceComponent } from './taginvoice.component';

describe('TaginvoiceComponent', () => {
  let component: TaginvoiceComponent;
  let fixture: ComponentFixture<TaginvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaginvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaginvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
