import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueModalComponent } from './overdue-modal.component';

describe('OverdueModalComponent', () => {
  let component: OverdueModalComponent;
  let fixture: ComponentFixture<OverdueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdueModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverdueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
