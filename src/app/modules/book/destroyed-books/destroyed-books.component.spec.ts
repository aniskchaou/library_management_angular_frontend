import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestroyedBooksComponent } from './destroyed-books.component';

describe('DestroyedBooksComponent', () => {
  let component: DestroyedBooksComponent;
  let fixture: ComponentFixture<DestroyedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestroyedBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestroyedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
