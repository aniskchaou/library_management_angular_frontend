import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsCategoryComponent } from './statistics-category.component';

describe('StatisticsCategoryComponent', () => {
  let component: StatisticsCategoryComponent;
  let fixture: ComponentFixture<StatisticsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
