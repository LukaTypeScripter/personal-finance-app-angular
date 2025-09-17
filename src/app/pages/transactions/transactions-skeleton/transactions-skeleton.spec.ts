import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsSkeleton } from './transactions-skeleton';

describe('TransactionsSkeleton', () => {
  let component: TransactionsSkeleton;
  let fixture: ComponentFixture<TransactionsSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
