import {Component, computed, inject} from '@angular/core';
import {CardHeader} from '@/app/shared/components/card-header/card-header';
import {TransactionHistoryItem} from './transaction-history-item/transaction-history-item';
import {Api} from '@/app/shared/service/api';

@Component({
  selector: 'app-overview-transactions',
  imports: [CardHeader, TransactionHistoryItem],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class OverviewTransactions {

  protected transactions = inject(Api).transactions;

  public readonly slicedTransactions = computed(() => this.transactions().slice(0, 5))
}
