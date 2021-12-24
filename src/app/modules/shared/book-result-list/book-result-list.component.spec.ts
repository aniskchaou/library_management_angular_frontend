import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookResultListComponent } from './book-result-list.component';

describe('BookResultListComponent', () => {
  let component: BookResultListComponent;
  let fixture: ComponentFixture<BookResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookResultListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
