import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGroupComponent } from './manager-group.component';

describe('ManagerGroupComponent', () => {
  let component: ManagerGroupComponent;
  let fixture: ComponentFixture<ManagerGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
