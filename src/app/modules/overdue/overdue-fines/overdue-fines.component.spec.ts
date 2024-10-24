import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueFinesComponent } from './overdue-fines.component';

describe('OverdueFinesComponent', () => {
  let component: OverdueFinesComponent;
  let fixture: ComponentFixture<OverdueFinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdueFinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverdueFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
