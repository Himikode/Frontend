import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoCardComponent } from './account-info-card.component';

describe('AccountInfoCardComponent', () => {
  let component: AccountInfoCardComponent;
  let fixture: ComponentFixture<AccountInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
