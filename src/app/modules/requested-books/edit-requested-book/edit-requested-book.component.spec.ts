import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestedBookComponent } from './edit-requested-book.component';

describe('EditRequestedBookComponent', () => {
  let component: EditRequestedBookComponent;
  let fixture: ComponentFixture<EditRequestedBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRequestedBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRequestedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
