import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemTypesComponent } from './edit-item-types.component';

describe('EditItemTypesComponent', () => {
  let component: EditItemTypesComponent;
  let fixture: ComponentFixture<EditItemTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditItemTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditItemTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
