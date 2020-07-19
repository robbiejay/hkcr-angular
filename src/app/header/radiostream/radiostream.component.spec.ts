import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiostreamComponent } from './radiostream.component';

describe('RadiostreamComponent', () => {
  let component: RadiostreamComponent;
  let fixture: ComponentFixture<RadiostreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiostreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiostreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
