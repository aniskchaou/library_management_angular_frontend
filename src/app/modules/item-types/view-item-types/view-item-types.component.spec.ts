import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemTypesComponent } from './view-item-types.component';

describe('ViewItemTypesComponent', () => {
  let component: ViewItemTypesComponent;
  let fixture: ComponentFixture<ViewItemTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItemTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewItemTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
