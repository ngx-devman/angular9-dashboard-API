import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuytagDetailComponent } from './buytag-detail.component';

describe('BuytagDetailComponent', () => {
  let component: BuytagDetailComponent;
  let fixture: ComponentFixture<BuytagDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuytagDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuytagDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
