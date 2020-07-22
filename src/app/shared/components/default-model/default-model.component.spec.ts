import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultModelComponent } from './default-model.component';

describe('DefaultModelComponent', () => {
  let component: DefaultModelComponent;
  let fixture: ComponentFixture<DefaultModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
