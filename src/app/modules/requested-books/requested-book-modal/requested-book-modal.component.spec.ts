import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedBookModalComponent } from './requested-book-modal.component';

describe('RequestedBookModalComponent', () => {
  let component: RequestedBookModalComponent;
  let fixture: ComponentFixture<RequestedBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedBookModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
