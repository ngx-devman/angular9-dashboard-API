import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolemanagerlistComponent } from './rolemanagerlist.component';

describe('RolemanagerlistComponent', () => {
  let component: RolemanagerlistComponent;
  let fixture: ComponentFixture<RolemanagerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolemanagerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolemanagerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
