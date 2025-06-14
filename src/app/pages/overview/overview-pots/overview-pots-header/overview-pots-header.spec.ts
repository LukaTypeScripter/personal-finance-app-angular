import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPotsHeader } from './overview-pots-header';

describe('OverviewPotsHeader', () => {
  let component: OverviewPotsHeader;
  let fixture: ComponentFixture<OverviewPotsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewPotsHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewPotsHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
