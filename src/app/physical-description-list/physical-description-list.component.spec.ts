import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalDescriptionListComponent } from './physical-description-list.component';

describe('PhysicalDescriptionListComponent', () => {
  let component: PhysicalDescriptionListComponent;
  let fixture: ComponentFixture<PhysicalDescriptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalDescriptionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalDescriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
