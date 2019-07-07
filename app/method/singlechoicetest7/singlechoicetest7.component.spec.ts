import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Singlechoicetest7Component } from './singlechoicetest7.component';

describe('Singlechoicetest7Component', () => {
  let component: Singlechoicetest7Component;
  let fixture: ComponentFixture<Singlechoicetest7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Singlechoicetest7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Singlechoicetest7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
