import { Transaction } from '@/app/core/models/finance-data.model';
import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CurrencyFormatPipe } from '@/app/shared/pipes/currency-format-pipe';

@Component({
  selector: 'app-transaction-history-item',
  imports: [DatePipe, CurrencyFormatPipe],
  templateUrl: './transaction-history-item.html',
  styleUrl: './transaction-history-item.scss'
})
export class TransactionHistoryItem {
  transaction = input.required<Transaction>();
}
