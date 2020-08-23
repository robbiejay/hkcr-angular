import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatangoComponent } from './chatango.component';

describe('ChatangoComponent', () => {
  let component: ChatangoComponent;
  let fixture: ComponentFixture<ChatangoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatangoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatangoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
