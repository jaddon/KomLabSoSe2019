import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Singlechoicetest1Component } from './singlechoicetest1.component';

describe('Singlechoicetest1Component', () => {
  let component: Singlechoicetest1Component;
  let fixture: ComponentFixture<Singlechoicetest1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Singlechoicetest1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Singlechoicetest1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
