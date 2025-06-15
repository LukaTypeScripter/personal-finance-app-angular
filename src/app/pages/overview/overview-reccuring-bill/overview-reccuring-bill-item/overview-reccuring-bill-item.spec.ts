import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewReccuringBillItem } from './overview-reccuring-bill-item';

describe('OverviewReccuringBillItem', () => {
  let component: OverviewReccuringBillItem;
  let fixture: ComponentFixture<OverviewReccuringBillItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewReccuringBillItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewReccuringBillItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
