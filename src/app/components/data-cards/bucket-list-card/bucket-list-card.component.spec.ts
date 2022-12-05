import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketListCardComponent } from './bucket-list-card.component';

describe('BucketListCardComponent', () => {
  let component: BucketListCardComponent;
  let fixture: ComponentFixture<BucketListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
