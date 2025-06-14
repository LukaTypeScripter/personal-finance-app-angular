import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPotsSummary } from './overview-pots-summary';

describe('OverviewPotsSummary', () => {
  let component: OverviewPotsSummary;
  let fixture: ComponentFixture<OverviewPotsSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewPotsSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewPotsSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
