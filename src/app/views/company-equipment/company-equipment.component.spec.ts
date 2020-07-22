import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEquipmentComponent } from './company-equipment.component';

describe('CompanyEquipmentComponent', () => {
  let component: CompanyEquipmentComponent;
  let fixture: ComponentFixture<CompanyEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
