import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContentDocPageComponent } from './show-content-doc-page.component';

describe('ShowContentDocPageComponent', () => {
  let component: ShowContentDocPageComponent;
  let fixture: ComponentFixture<ShowContentDocPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowContentDocPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowContentDocPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
