import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAuthorizedUserComponent } from './view-authorized-user.component';

describe('ViewAuthorizedUserComponent', () => {
  let component: ViewAuthorizedUserComponent;
  let fixture: ComponentFixture<ViewAuthorizedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAuthorizedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAuthorizedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
