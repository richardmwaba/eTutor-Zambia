import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlevelComponent } from './alevel.component';

describe('AlevelComponent', () => {
  let component: AlevelComponent;
  let fixture: ComponentFixture<AlevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
