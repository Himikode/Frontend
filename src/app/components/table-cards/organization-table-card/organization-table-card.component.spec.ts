import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTableCardComponent } from './organization-table-card.component';

describe('OrganizationTableCardComponent', () => {
  let component: OrganizationTableCardComponent;
  let fixture: ComponentFixture<OrganizationTableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationTableCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
