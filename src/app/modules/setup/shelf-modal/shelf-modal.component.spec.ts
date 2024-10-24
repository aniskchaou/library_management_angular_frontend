import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfModalComponent } from './shelf-modal.component';

describe('ShelfModalComponent', () => {
  let component: ShelfModalComponent;
  let fixture: ComponentFixture<ShelfModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelfModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
