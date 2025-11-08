import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  OnInit,
  signal
} from '@angular/core';
import {ReusableInput} from '@/app/shared/components/reuseble-input/reusable-input.component';
import {ReusableButton} from '@/app/shared/components/reusable-button/reusable-button.component';
import {ReusableDropdown} from '@/app/shared/components/reusable-dropdown/reusable-dropdown.component';
import {TransactionsRow} from '@/app/pages/transactions/transactions-row/transactions-row';
import {Api} from '@/app/shared/service/api';
import { SortBy, SortOrder} from '@/app/core/models/finance-data.model';
import {TransactionsSkeleton} from '@/app/pages/transactions/transactions-skeleton/transactions-skeleton';
import {LazyAttribute} from '@/app/shared/directives/lazy-attribute';
import {NgOptimizedImage} from '@angular/common';
import { updatePagination } from './helper/functions/update-pagination.function';
import { ReusableBottomSheet } from '@/app/shared/components/reusable-bottom-sheet/reusable-bottom-sheet.component';

@Component({
  selector: 'app-transactions',
  imports: [ReusableInput, ReusableButton, ReusableDropdown, TransactionsRow, TransactionsSkeleton, LazyAttribute, NgOptimizedImage, ReusableBottomSheet],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions implements OnInit {
  private readonly api = inject(Api);

  ngOnInit(): void {
    // Transaction page only needs transactions
    this.loadTransactionsWithFilters();
  }

  public readonly ITEMS_PER_PAGE = 10;
  public readonly PAGINATION_BUTTON_COUNT = 4

  public searchQuerySig = signal('')
  public selectedCategory = signal('all');
  public selectedSort = signal('latest');
  public isSortSheetOpen = signal(false);
  public isCategorySheetOpen = signal(false);

  private debounceTimer: any = null;


  public categoryOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Bills', label: 'Bills' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Dining Out', label: 'Dining Out' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Personal Care', label: 'Personal Care' },
    { value: 'Education', label: 'Education' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'General', label: 'General' }
  ];

  public sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'a-z', label: 'A to Z' },
    { value: 'z-a', label: 'Z to A' },
    { value: 'highest', label: 'Highest' },
    { value: 'lowest', label: 'Lowest' }
  ];

  public transactions = this.api.transactions;
  public paginationMeta = this.api.paginationMeta;
  public currentPage = signal(1);

  public totalPages = computed(() => {
    return this.paginationMeta()?.totalPages || 1;
  });

  public filteredTransactions = this.transactions;

  private reloadEffect = effect(() => {
    const searchQuerySig = this.searchQuerySig()
    const category = this.selectedCategory();
    const sort = this.selectedSort();
    const page = this.currentPage();
    const currency = this.api.currency();

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.loadTransactionsWithFilters();
    }, 500);
  });

  public paginatedTransaction = this.transactions;

  public paginationBullets = linkedSignal({
    source:() => ({
      currentPage: this.currentPage(),
      totalPages: this.totalPages(),
    }),
    computation:({currentPage,totalPages}) => {
      return updatePagination(currentPage,totalPages,this.PAGINATION_BUTTON_COUNT)
    }
  })

  public isPrevDisabled = computed(() => !this.paginationMeta()?.hasPreviousPage);
  public isNextDisabled = computed(() => !this.paginationMeta()?.hasNextPage);

  public handleNextPage() {
    if (!this.isNextDisabled()) {
      this.currentPage.update(p => p + 1);
    }
  }

  public handlePreviousPage() {
    if (!this.isPrevDisabled()) {
      this.currentPage.update(p => Math.max(p - 1, 1));
    }
  }

  public onSearchChange(value: string) {
    if (this.searchQuerySig() !== value) {
      this.currentPage.set(1);
      this.searchQuerySig.set(value);
    }
  }

  public onCategoryChange(value: string) {
    if (this.selectedCategory() !== value) {
      this.currentPage.set(1);
      this.selectedCategory.set(value);
    }
  }

  public onSortChange(value: string) {
    if (this.selectedSort() !== value) {
      this.currentPage.set(1);
      this.selectedSort.set(value);
    }
  }

  public openSortSheet() {
    this.isSortSheetOpen.set(true);
  }

  public closeSortSheet() {
    this.isSortSheetOpen.set(false);
  }

  public openCategorySheet() {
    this.isCategorySheetOpen.set(true);
  }

  public closeCategorySheet() {
    this.isCategorySheetOpen.set(false);
  }

  public onMobileSortChange(value: string) {
    this.onSortChange(value);
    this.closeSortSheet();
  }

  public onMobileCategoryChange(value: string) {
    this.onCategoryChange(value);
    this.closeCategorySheet();
  }

  private loadTransactionsWithFilters() {
    const filter: any = {};

    const search = this.searchQuerySig();
    if (search) {
      filter.name = search;
    }

    const category = this.selectedCategory();
    if (category !== 'all') {
      filter.category = category;
    }

    const sortValue = this.selectedSort();
    let sortBy: SortBy;
    let sortOrder: SortOrder;

    switch (sortValue) {
      case 'latest':
        sortBy = SortBy.DATE;
        sortOrder = SortOrder.DESC;
        break;
      case 'oldest':
        sortBy = SortBy.DATE;
        sortOrder = SortOrder.ASC;
        break;
      case 'a-z':
        sortBy = SortBy.NAME;
        sortOrder = SortOrder.ASC;
        break;
      case 'z-a':
        sortBy = SortBy.NAME;
        sortOrder = SortOrder.DESC;
        break;
      case 'highest':
        sortBy = SortBy.AMOUNT;
        sortOrder = SortOrder.DESC;
        break;
      case 'lowest':
        sortBy = SortBy.AMOUNT;
        sortOrder = SortOrder.ASC;
        break;
      default:
        sortBy = SortBy.DATE;
        sortOrder = SortOrder.DESC;
    }

    this.api.loadTransactions({
      filter: Object.keys(filter).length > 0 ? filter : undefined,
      sort: { sortBy, sortOrder },
      skip: (this.currentPage() - 1) * this.ITEMS_PER_PAGE,
      take: this.ITEMS_PER_PAGE,
      currency: this.api.currency()
    })
  }

  ngOnDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}
