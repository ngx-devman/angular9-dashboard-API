import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewUserComponent } from './view-new-user.component';

describe('ViewNewUserComponent', () => {
  let component: ViewNewUserComponent;
  let fixture: ComponentFixture<ViewNewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
