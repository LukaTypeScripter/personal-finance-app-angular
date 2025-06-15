import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewBudgets } from './overview-budgets';

describe('OverviewBudgets', () => {
  let component: OverviewBudgets;
  let fixture: ComponentFixture<OverviewBudgets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewBudgets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewBudgets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
