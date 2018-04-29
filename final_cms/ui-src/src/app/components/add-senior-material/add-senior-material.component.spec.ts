import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeniorMaterialComponent } from './add-senior-material.component';

describe('AddSeniorMaterialComponent', () => {
  let component: AddSeniorMaterialComponent;
  let fixture: ComponentFixture<AddSeniorMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSeniorMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeniorMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
