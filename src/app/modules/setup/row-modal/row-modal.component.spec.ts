import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowModalComponent } from './row-modal.component';

describe('RowModalComponent', () => {
  let component: RowModalComponent;
  let fixture: ComponentFixture<RowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
