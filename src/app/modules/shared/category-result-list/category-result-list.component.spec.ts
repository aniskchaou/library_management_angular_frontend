import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryResultListComponent } from './category-result-list.component';

describe('CategoryResultListComponent', () => {
  let component: CategoryResultListComponent;
  let fixture: ComponentFixture<CategoryResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryResultListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
