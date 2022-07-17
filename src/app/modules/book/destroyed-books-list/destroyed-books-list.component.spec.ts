import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestroyedBooksListComponent } from './destroyed-books-list.component';

describe('DestroyedBooksListComponent', () => {
  let component: DestroyedBooksListComponent;
  let fixture: ComponentFixture<DestroyedBooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestroyedBooksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestroyedBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
