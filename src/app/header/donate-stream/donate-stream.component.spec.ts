import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateStreamComponent } from './donate-stream.component';

describe('DonateStreamComponent', () => {
  let component: DonateStreamComponent;
  let fixture: ComponentFixture<DonateStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
