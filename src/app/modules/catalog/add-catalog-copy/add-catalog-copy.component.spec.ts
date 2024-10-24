import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatalogCopyComponent } from './add-catalog-copy.component';

describe('AddCatalogCopyComponent', () => {
  let component: AddCatalogCopyComponent;
  let fixture: ComponentFixture<AddCatalogCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCatalogCopyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCatalogCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
