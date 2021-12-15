import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestedBookComponent } from './add-requested-book.component';

describe('AddRequestedBookComponent', () => {
  let component: AddRequestedBookComponent;
  let fixture: ComponentFixture<AddRequestedBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRequestedBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
