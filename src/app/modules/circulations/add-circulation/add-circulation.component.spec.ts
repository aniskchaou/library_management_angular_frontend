import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCirculationComponent } from './add-circulation.component';

describe('AddCirculationComponent', () => {
  let component: AddCirculationComponent;
  let fixture: ComponentFixture<AddCirculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCirculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCirculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
