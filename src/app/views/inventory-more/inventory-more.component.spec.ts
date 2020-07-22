import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMoreComponent } from './inventory-more.component';

describe('InventoryMoreComponent', () => {
  let component: InventoryMoreComponent;
  let fixture: ComponentFixture<InventoryMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
