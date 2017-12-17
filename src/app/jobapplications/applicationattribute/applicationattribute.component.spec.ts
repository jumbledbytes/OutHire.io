import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAttributeComponent } from './applicationattribute.component';

describe('ApplicationAttributeComponent', () => {
  let component: ApplicationAttributeComponent;
  let fixture: ComponentFixture<ApplicationAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
