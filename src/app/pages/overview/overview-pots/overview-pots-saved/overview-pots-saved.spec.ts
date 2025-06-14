import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPotsSaved } from './overview-pots-saved';

describe('OverviewPotsSaved', () => {
  let component: OverviewPotsSaved;
  let fixture: ComponentFixture<OverviewPotsSaved>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewPotsSaved]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewPotsSaved);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
