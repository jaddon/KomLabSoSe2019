import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Singlechoicetest5Component } from './singlechoicetest5.component';

describe('Singlechoicetest5Component', () => {
  let component: Singlechoicetest5Component;
  let fixture: ComponentFixture<Singlechoicetest5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Singlechoicetest5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Singlechoicetest5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
