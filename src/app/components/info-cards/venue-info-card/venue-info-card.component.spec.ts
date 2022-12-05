import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueInfoCardComponent } from './venue-info-card.component';

describe('VenueInfoCardComponent', () => {
  let component: VenueInfoCardComponent;
  let fixture: ComponentFixture<VenueInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
