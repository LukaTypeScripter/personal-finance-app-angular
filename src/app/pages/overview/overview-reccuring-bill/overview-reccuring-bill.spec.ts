import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewReccuringBill } from './overview-reccuring-bill';

describe('OverviewReccuringBill', () => {
  let component: OverviewReccuringBill;
  let fixture: ComponentFixture<OverviewReccuringBill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewReccuringBill]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewReccuringBill);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
