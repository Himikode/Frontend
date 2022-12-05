import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueDevicesInfoCardComponent } from './venue-devices-info-card.component';

describe('VenueDevicesInfoCardComponent', () => {
  let component: VenueDevicesInfoCardComponent;
  let fixture: ComponentFixture<VenueDevicesInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueDevicesInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueDevicesInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
