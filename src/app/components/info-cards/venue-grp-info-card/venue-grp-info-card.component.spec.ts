import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueGrpInfoCardComponent } from './venue-grp-info-card.component';

describe('VenueGrpInfoCardComponent', () => {
  let component: VenueGrpInfoCardComponent;
  let fixture: ComponentFixture<VenueGrpInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueGrpInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueGrpInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
