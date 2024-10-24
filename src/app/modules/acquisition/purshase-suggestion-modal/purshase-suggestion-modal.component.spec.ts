import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurshaseSuggestionModalComponent } from './purshase-suggestion-modal.component';

describe('PurshaseSuggestionModalComponent', () => {
  let component: PurshaseSuggestionModalComponent;
  let fixture: ComponentFixture<PurshaseSuggestionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurshaseSuggestionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurshaseSuggestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
