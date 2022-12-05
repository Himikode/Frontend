import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueGrpDevicesStatusCardComponent } from './venue-grp-devices-status-card.component';

describe('VenueGrpDevicesStatusCardComponent', () => {
  let component: VenueGrpDevicesStatusCardComponent;
  let fixture: ComponentFixture<VenueGrpDevicesStatusCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueGrpDevicesStatusCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueGrpDevicesStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
