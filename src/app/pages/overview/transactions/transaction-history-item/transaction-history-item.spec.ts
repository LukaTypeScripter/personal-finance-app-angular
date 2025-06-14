import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryItem } from './transaction-history-item';

describe('TransactionHistoryItem', () => {
  let component: TransactionHistoryItem;
  let fixture: ComponentFixture<TransactionHistoryItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionHistoryItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionHistoryItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
