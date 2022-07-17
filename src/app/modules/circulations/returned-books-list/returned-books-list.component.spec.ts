import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedBooksListComponent } from './returned-books-list.component';

describe('ReturnedBooksListComponent', () => {
  let component: ReturnedBooksListComponent;
  let fixture: ComponentFixture<ReturnedBooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnedBooksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnedBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
