import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIncomeComponent } from './modal-income.component';

describe('ModalIncomeComponent', () => {
  let component: ModalIncomeComponent;
  let fixture: ComponentFixture<ModalIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
