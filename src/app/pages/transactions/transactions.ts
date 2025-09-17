import {Component, effect, inject, linkedSignal, signal} from '@angular/core';
import {ReusableInput} from '@/app/shared/components/reuseble-input/reusable-input.component';
import {TransactionsRow} from '@/app/pages/transactions/transactions-row/transactions-row';
import {Api} from '@/app/shared/service/api';
import {Transaction} from '@/app/core/models/finance-data.model';
import {ILinkedSignal} from '@/app/pages/transactions/helper/interfaces/linked-signal.interface';

@Component({
  selector: 'app-transactions',
  imports: [ReusableInput, TransactionsRow],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions {
  private readonly currentPage = signal(1)
  private readonly ITEMS_PER_PAGE = 10;
  private readonly api = inject(Api);

  public isLoading = this.api.userLoading
  public transactions = this.api.userTransactions

  public paginatedTransaction = linkedSignal<ILinkedSignal, Transaction[]>({
    source: () => ({
      currentPage: this.currentPage(),
      transactions: this.transactions()
    }),
    computation: ({currentPage, transactions}) => {
      const start = currentPage * this.ITEMS_PER_PAGE;
      const end = start + this.ITEMS_PER_PAGE;


      return transactions.slice(start, end)
    }
  });



}
