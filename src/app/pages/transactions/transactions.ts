import {Component, computed, effect, inject, linkedSignal, signal} from '@angular/core';
import {ReusableInput} from '@/app/shared/components/reuseble-input/reusable-input.component';
import {ReusableButton} from '@/app/shared/components/reusable-button/reusable-button.component';
import {TransactionsRow} from '@/app/pages/transactions/transactions-row/transactions-row';
import {Api} from '@/app/shared/service/api';
import {Transaction} from '@/app/core/models/finance-data.model';
import {ILinkedSignal} from '@/app/pages/transactions/helper/interfaces/linked-signal.interface';
import {TransactionsSkeleton} from '@/app/pages/transactions/transactions-skeleton/transactions-skeleton';
import {LazyAttribute} from '@/app/shared/directives/lazy-attribute';
import {NgOptimizedImage} from '@angular/common';
import { updatePagination } from './helper/functions/update-pagination.function';

@Component({
  selector: 'app-transactions',
  imports: [ReusableInput, ReusableButton, TransactionsRow, TransactionsSkeleton, LazyAttribute, NgOptimizedImage],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions {
  private readonly api = inject(Api);

  public readonly ITEMS_PER_PAGE = 10;
  public readonly PAGINATION_BUTTON_COUNT = 4

  public transactions = this.api.userTransactions

  public totalPages = computed(() => {
    return Math.ceil(this.transactions().length / this.ITEMS_PER_PAGE);
  })

  public currentPage = signal(1)

  public paginatedTransaction = linkedSignal<ILinkedSignal, Transaction[]>({
    source: () => ({
      currentPage: this.currentPage(),
      transactions: this.transactions()
    }),
    computation: ({currentPage, transactions}) => {
      const start = (currentPage - 1) * this.ITEMS_PER_PAGE;
      const end = start + this.ITEMS_PER_PAGE;


      return transactions.slice(start, end)
    }
  });

  public paginationBullets = linkedSignal({
    source:() => ({
      currentPage: this.currentPage(),
      totalPages: this.totalPages(),
    }),
    computation:({currentPage,totalPages}) => {
      return updatePagination(currentPage,totalPages,this.PAGINATION_BUTTON_COUNT)
    }
  })

  public handleNextPage() {
    this.currentPage.set(Math.min(this.currentPage() + 1, this.totalPages()))
  }

  public handlePreviousPage() {
    this.currentPage.set(Math.max(this.currentPage() - 1, 1))
  }
}
