import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailScheduleComponent } from './email-schedule.component';

describe('EmailScheduleComponent', () => {
  let component: EmailScheduleComponent;
  let fixture: ComponentFixture<EmailScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
