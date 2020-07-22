import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWorkReportComponent } from './custom-work-report.component';

describe('CustomWorkReportComponent', () => {
  let component: CustomWorkReportComponent;
  let fixture: ComponentFixture<CustomWorkReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomWorkReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomWorkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
