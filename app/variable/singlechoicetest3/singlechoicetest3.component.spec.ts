import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Singlechoicetest3Component } from './singlechoicetest3.component';

describe('Singlechoicetest3Component', () => {
  let component: Singlechoicetest3Component;
  let fixture: ComponentFixture<Singlechoicetest3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Singlechoicetest3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Singlechoicetest3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
