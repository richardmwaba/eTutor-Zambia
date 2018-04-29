import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJuniorMaterialComponent } from './add-junior-material.component';

describe('AddJuniorMaterialComponent', () => {
  let component: AddJuniorMaterialComponent;
  let fixture: ComponentFixture<AddJuniorMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJuniorMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJuniorMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
