import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDevicesStatusCardComponent } from './account-devices-status-card.component';

describe('AccountDevicesStatusCardComponent', () => {
  let component: AccountDevicesStatusCardComponent;
  let fixture: ComponentFixture<AccountDevicesStatusCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDevicesStatusCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDevicesStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
