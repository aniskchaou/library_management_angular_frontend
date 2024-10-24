import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalDescriptionModalComponent } from './physical-description-modal.component';

describe('PhysicalDescriptionModalComponent', () => {
  let component: PhysicalDescriptionModalComponent;
  let fixture: ComponentFixture<PhysicalDescriptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalDescriptionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalDescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
