import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwelveComponent } from './twelve.component';

describe('TwelveComponent', () => {
  let component: TwelveComponent;
  let fixture: ComponentFixture<TwelveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwelveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
