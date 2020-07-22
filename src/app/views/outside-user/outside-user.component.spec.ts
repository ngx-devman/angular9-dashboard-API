import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsideUserComponent } from './outside-user.component';

describe('OutsideUserComponent', () => {
  let component: OutsideUserComponent;
  let fixture: ComponentFixture<OutsideUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsideUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsideUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
