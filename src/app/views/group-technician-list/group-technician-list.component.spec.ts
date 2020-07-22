import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTechnicianListComponent } from './group-technician-list.component';

describe('GroupTechnicianListComponent', () => {
  let component: GroupTechnicianListComponent;
  let fixture: ComponentFixture<GroupTechnicianListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTechnicianListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTechnicianListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
