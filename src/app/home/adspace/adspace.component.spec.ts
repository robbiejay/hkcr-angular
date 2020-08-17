import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdspaceComponent } from './adspace.component';

describe('AdspaceComponent', () => {
  let component: AdspaceComponent;
  let fixture: ComponentFixture<AdspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
