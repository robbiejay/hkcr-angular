import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateSplitComponent } from './donate-split.component';

describe('DonateSplitComponent', () => {
  let component: DonateSplitComponent;
  let fixture: ComponentFixture<DonateSplitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateSplitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
