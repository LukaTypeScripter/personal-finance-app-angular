import { DEFAULT_FINANCE_DATA } from '@/app/core/constants/default-finance-data.constant';
import { Balance, Budget, Pot, Transaction, FilterTransactionsInput, SortTransactionsInput, PaginatedTransactions, PaginationMeta } from '@/app/core/models/finance-data.model';
import { effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthService } from '@/app/core/service/auth.service';
import {
  GET_BALANCE_QUERY,
  GET_TRANSACTIONS_QUERY,
  GET_BUDGETS_QUERY,
  GET_POTS_QUERY,
  GET_OVERVIEW_DATA_QUERY
} from '@/app/core/graphql/finance.operations';
import { map, catchError, of } from 'rxjs';
import {Currency} from '@/app/core/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private apollo = inject(Apollo);
  private authService = inject(AuthService);

  private readonly _transactions = signal<Transaction[]>([]);
  private readonly _budgets = signal<Budget[]>([]);
  private readonly _pots = signal<Pot[]>([]);
  private readonly _balance = signal<Balance>(DEFAULT_FINANCE_DATA.balance);
  private readonly _loading = signal<boolean>(false);
  private readonly _paginationMeta = signal<PaginationMeta | null>(null);

  public  currency = signal<Currency>('USD');

  readonly transactions = this._transactions.asReadonly();
  readonly budgets = this._budgets.asReadonly();
  readonly pots = this._pots.asReadonly();
  readonly balance = this._balance.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly paginationMeta = this._paginationMeta.asReadonly();

  constructor() {
    effect(() => {
      const currentUser = this.authService.currentUser()

      if(currentUser) {
        this.currency.set(currentUser.currency);
      }
    });
  }


  loadAllData(currency?: Currency): void {
    const curr = this.resolveCurrency(currency);

    this._loading.set(true);


    this.currency.set(curr);

    this.loadBalance(curr);
    this.loadTransactions({ currency: curr });
    this.loadBudgets(curr);
    this.loadPots(curr);
  }

  refresh(): void {
    const curr = this.authService.currentUser()?.currency;
    if (curr) this.loadAllData(curr);
  }

  private runQuery<TData, TResult>(
    query: any,
    variables: Record<string, unknown>,
    select: (data: TData | undefined) => TResult,
    fallback: TResult,
    label: string,
  ) {
    return this.apollo
      .query<TData>({ query, variables, fetchPolicy: 'network-only' })
      .pipe(
        map(result => select(result?.data)),
        catchError(error => {
          console.error(`Error loading ${label}:`, error);
          return of(fallback);
        }),
      );
  }

  loadBalance(currency?: Currency): void {
    const curr = this.resolveCurrency(currency);
    this.runQuery<{ balance: Balance }, Balance>(
      GET_BALANCE_QUERY,
      { currency: curr },
      data => data?.balance ?? DEFAULT_FINANCE_DATA.balance,
      DEFAULT_FINANCE_DATA.balance,
      'balance',
    ).subscribe(balance => this._balance.set(balance));
  }


  loadTransactions(options?: {
    filter?: FilterTransactionsInput;
    sort?: SortTransactionsInput;
    skip?: number;
    take?: number;
    currency?: Currency;
  }): void {
    const curr = this.resolveCurrency(options?.currency);
    this.runQuery<{ transactions: PaginatedTransactions }, PaginatedTransactions | null>(
      GET_TRANSACTIONS_QUERY,
      {
        filter: options?.filter,
        sort: options?.sort,
        skip: options?.skip,
        take: options?.take,
        currency: curr,
      },
      data => data?.transactions ?? null,
      null,
      'transactions',
    ).subscribe(paginatedData => {
      this._loading.set(false);
      if (!paginatedData) return;

      this._transactions.set(paginatedData.transactions);
      this._paginationMeta.set(paginatedData.pagination);
    });
  }


  loadBudgets(currency?: Currency): void {
    const curr = this.resolveCurrency(currency);
    this.runQuery<{ budgets: Budget[] }, Budget[]>(
      GET_BUDGETS_QUERY,
      { currency: curr },
      data => data?.budgets ?? [],
      [],
      'budgets',
    ).subscribe(budgets => this._budgets.set(budgets.filter(b => !!b)));
  }


  loadPots(currency?: Currency): void {
    const curr = this.resolveCurrency(currency);
    this.runQuery<{ pots: Pot[] }, Pot[]>(
      GET_POTS_QUERY,
      { currency: curr },
      data => data?.pots ?? [],
      [],
      'pots',
    ).subscribe(pots =>
      this._pots.set(pots.filter(pot => !!pot && typeof pot.name !== 'undefined')),
    );
  }

  loadOverviewData(currency?: Currency): void {
    this._loading.set(true);

    const curr = this.resolveCurrency(currency);

    this.apollo
      .query<{
        balance: Balance | null;
        transactions: PaginatedTransactions | null;
        budgets: Budget[] | null;
        pots: Pot[] | null;
      }>({
        query: GET_OVERVIEW_DATA_QUERY,
        variables: { currency: curr },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map(result => result?.data ?? null),
        catchError(error => {
          console.error('Error loading overview data:', error);
          return of(null);
        }),
      )
      .subscribe({
        next: data => {
          if (data) {
            this.setSafeData(this._balance, data.balance);
            this.setSafeData(this._transactions, data.transactions?.transactions ?? []);
            this._paginationMeta.set(data.transactions?.pagination ?? null);
            this.setSafeData(this._pots, data.pots ?? [], p => !!p && !!p.name);
            this.setSafeData(this._budgets, data.budgets ?? []);
          }
          this._loading.set(false);
        },
        error: () => this._loading.set(false),
      });
  }

  private setSafeData<T>(
    signalRef: WritableSignal<T | T[]>,
    data: T | T[] | null | undefined,
    filterFn?: (item: any) => boolean
  ) {
    if (!data) return;
    if (Array.isArray(data)) {
      signalRef.set(filterFn ? data.filter(filterFn) : data);
    } else {
      signalRef.set(data);
    }
  }

  private resolveCurrency(currency?: Currency): Currency {
    return currency || this.authService.currentUser()?.currency || this.currency() || 'USD';
  }
}
