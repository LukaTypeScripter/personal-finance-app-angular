import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPots } from './overview-pots';

describe('OverviewPots', () => {
  let component: OverviewPots;
  let fixture: ComponentFixture<OverviewPots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewPots]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewPots);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
