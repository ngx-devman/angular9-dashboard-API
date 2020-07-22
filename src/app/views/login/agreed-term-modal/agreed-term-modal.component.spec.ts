import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreedTermModalComponent } from './agreed-term-modal.component';

describe('AgreedTermModalComponent', () => {
  let component: AgreedTermModalComponent;
  let fixture: ComponentFixture<AgreedTermModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreedTermModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreedTermModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
