import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredBookComponent } from './required-book.component';

describe('RequiredBookComponent', () => {
  let component: RequiredBookComponent;
  let fixture: ComponentFixture<RequiredBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
