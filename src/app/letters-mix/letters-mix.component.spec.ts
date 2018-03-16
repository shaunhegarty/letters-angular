import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersMixComponent } from './letters-mix.component';

describe('LettersMixComponent', () => {
  let component: LettersMixComponent;
  let fixture: ComponentFixture<LettersMixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettersMixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
