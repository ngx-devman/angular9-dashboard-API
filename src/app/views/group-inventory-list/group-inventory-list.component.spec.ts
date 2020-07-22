import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInventoryListComponent } from './group-inventory-list.component';

describe('GroupInventoryListComponent', () => {
  let component: GroupInventoryListComponent;
  let fixture: ComponentFixture<GroupInventoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupInventoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
