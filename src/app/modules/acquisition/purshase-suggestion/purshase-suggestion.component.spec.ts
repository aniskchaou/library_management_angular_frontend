import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurshaseSuggestionComponent } from './purshase-suggestion.component';

describe('PurshaseSuggestionComponent', () => {
  let component: PurshaseSuggestionComponent;
  let fixture: ComponentFixture<PurshaseSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurshaseSuggestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurshaseSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
