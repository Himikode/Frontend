import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleValueCardLastPeriodComponent } from './single-value-card-last-period.component';

describe('SingleValueCardLastPeriodComponent', () => {
  let component: SingleValueCardLastPeriodComponent;
  let fixture: ComponentFixture<SingleValueCardLastPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleValueCardLastPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleValueCardLastPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
