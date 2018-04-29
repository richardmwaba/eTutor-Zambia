import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeniorExamMaterialComponent } from './add-senior-exam-material.component';

describe('AddSeniorExamMaterialComponent', () => {
  let component: AddSeniorExamMaterialComponent;
  let fixture: ComponentFixture<AddSeniorExamMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSeniorExamMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeniorExamMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
