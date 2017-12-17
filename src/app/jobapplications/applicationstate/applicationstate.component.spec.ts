import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationstateComponent } from './applicationstate.component';

describe('ApplicationstateComponent', () => {
  let component: ApplicationstateComponent;
  let fixture: ComponentFixture<ApplicationstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
