import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJuniorExamMaterialComponent } from './add-junior-exam-material.component';

describe('AddJuniorExamMaterialComponent', () => {
  let component: AddJuniorExamMaterialComponent;
  let fixture: ComponentFixture<AddJuniorExamMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJuniorExamMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJuniorExamMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
