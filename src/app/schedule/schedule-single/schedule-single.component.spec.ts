import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSingleComponent } from './schedule-single.component';

describe('ScheduleSingleComponent', () => {
  let component: ScheduleSingleComponent;
  let fixture: ComponentFixture<ScheduleSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
