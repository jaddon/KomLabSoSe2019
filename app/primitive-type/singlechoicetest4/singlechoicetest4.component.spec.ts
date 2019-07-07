import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Singlechoicetest4Component } from './singlechoicetest4.component';

describe('Singlechoicetest4Component', () => {
  let component: Singlechoicetest4Component;
  let fixture: ComponentFixture<Singlechoicetest4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Singlechoicetest4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Singlechoicetest4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
