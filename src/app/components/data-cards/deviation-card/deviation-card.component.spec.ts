import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviationCardComponent } from './deviation-card.component';

describe('DeviationCardComponent', () => {
  let component: DeviationCardComponent;
  let fixture: ComponentFixture<DeviationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
