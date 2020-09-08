import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateAmountComponent } from './donate-amount.component';

describe('DonateAmountComponent', () => {
  let component: DonateAmountComponent;
  let fixture: ComponentFixture<DonateAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
