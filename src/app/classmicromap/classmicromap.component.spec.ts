import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassmicromapComponent } from './classmicromap.component';

describe('ClassmicromapComponent', () => {
  let component: ClassmicromapComponent;
  let fixture: ComponentFixture<ClassmicromapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassmicromapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassmicromapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
