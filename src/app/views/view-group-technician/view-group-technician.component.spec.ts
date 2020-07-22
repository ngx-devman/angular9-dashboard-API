import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupTechnicianComponent } from './view-group-technician.component';

describe('ViewGroupTechnicianComponent', () => {
  let component: ViewGroupTechnicianComponent;
  let fixture: ComponentFixture<ViewGroupTechnicianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGroupTechnicianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroupTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
