import { Component } from '@angular/core';
import { CardHeader } from '@/app/shared/components/card-header/card-header';
import { TransactionHistoryItem } from './transaction-history-item/transaction-history-item';
@Component({
  selector: 'app-overview-transactions',
  imports: [CardHeader,TransactionHistoryItem],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class OverviewTransactions {

}
