import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Singlechoicetest6Component } from './singlechoicetest6.component';

describe('Singlechoicetest6Component', () => {
  let component: Singlechoicetest6Component;
  let fixture: ComponentFixture<Singlechoicetest6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Singlechoicetest6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Singlechoicetest6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
