import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsTableCardComponent } from './records-table-card.component';

describe('RecordsTableCardComponent', () => {
  let component: RecordsTableCardComponent;
  let fixture: ComponentFixture<RecordsTableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsTableCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
