import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCirculationComponent } from './edit-circulation.component';

describe('EditCirculationComponent', () => {
  let component: EditCirculationComponent;
  let fixture: ComponentFixture<EditCirculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCirculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCirculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
