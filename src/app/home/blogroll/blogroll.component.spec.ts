import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogrollComponent } from './blogroll.component';

describe('BlogrollComponent', () => {
  let component: BlogrollComponent;
  let fixture: ComponentFixture<BlogrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
