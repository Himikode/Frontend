import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleValueBucketSumCardComponent } from './single-value-bucket-sum-card.component';

describe('SingleValueBucketSumCardComponent', () => {
  let component: SingleValueBucketSumCardComponent;
  let fixture: ComponentFixture<SingleValueBucketSumCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleValueBucketSumCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleValueBucketSumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
