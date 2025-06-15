import { Transaction } from '@/app/core/models/finance-data.model';
import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-history-item',
  imports: [DatePipe],
  templateUrl: './transaction-history-item.html',
  styleUrl: './transaction-history-item.scss'
})
export class TransactionHistoryItem {
  transaction = input.required<Transaction>();
}
