import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersSubmitComponent } from './letters-submit.component';

describe('LettersSubmitComponent', () => {
  let component: LettersSubmitComponent;
  let fixture: ComponentFixture<LettersSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettersSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
