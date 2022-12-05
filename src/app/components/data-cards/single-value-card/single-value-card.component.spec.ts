import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleValueCardBetaComponent } from './single-value-card-beta.component';

describe('SingleValueCardBetaComponent', () => {
  let component: SingleValueCardBetaComponent;
  let fixture: ComponentFixture<SingleValueCardBetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleValueCardBetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleValueCardBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
