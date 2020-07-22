import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBlueTagsModalComponent } from './buy-blue-tags-modal.component';

describe('BuyBlueTagsModalComponent', () => {
  let component: BuyBlueTagsModalComponent;
  let fixture: ComponentFixture<BuyBlueTagsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyBlueTagsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyBlueTagsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
