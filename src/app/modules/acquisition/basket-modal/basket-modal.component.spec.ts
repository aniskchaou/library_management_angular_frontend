import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketModalComponent } from './basket-modal.component';

describe('BasketModalComponent', () => {
  let component: BasketModalComponent;
  let fixture: ComponentFixture<BasketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
