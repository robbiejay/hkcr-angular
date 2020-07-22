import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentSingleComponent } from './resident-single.component';

describe('ResidentSingleComponent', () => {
  let component: ResidentSingleComponent;
  let fixture: ComponentFixture<ResidentSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
