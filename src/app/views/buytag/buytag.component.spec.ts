import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTagComponent } from './buytag.component';

describe('BuyTagComponent', () => {
  let component: BuyTagComponent;
  let fixture: ComponentFixture<BuyTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
