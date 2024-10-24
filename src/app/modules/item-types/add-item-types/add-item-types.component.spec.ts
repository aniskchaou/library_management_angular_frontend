import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemTypesComponent } from './add-item-types.component';

describe('AddItemTypesComponent', () => {
  let component: AddItemTypesComponent;
  let fixture: ComponentFixture<AddItemTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
