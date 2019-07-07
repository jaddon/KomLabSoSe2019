import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceTest2Component } from './single-choice-test2.component';

describe('SingleChoiceTest2Component', () => {
  let component: SingleChoiceTest2Component;
  let fixture: ComponentFixture<SingleChoiceTest2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleChoiceTest2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleChoiceTest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
