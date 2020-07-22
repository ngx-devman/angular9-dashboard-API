import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuytagMainComponent } from './buytag-main.component';

describe('BuytagMainComponent', () => {
  let component: BuytagMainComponent;
  let fixture: ComponentFixture<BuytagMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuytagMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuytagMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
