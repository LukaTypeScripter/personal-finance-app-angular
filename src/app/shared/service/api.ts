import { DEFAULT_FINANCE_DATA } from '@/app/core/constants/default-finance-data.constant';
import { Balance, Budget, Pot, Transaction, FilterTransactionsInput, SortTransactionsInput } from '@/app/core/models/finance-data.model';
import {computed, effect, inject, Injectable, signal} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthService } from '@/app/core/service/auth.service';
import {
  GET_BALANCE_QUERY,
  GET_TRANSACTIONS_QUERY,
  GET_BUDGETS_QUERY,
  GET_POTS_QUERY,
  GET_BUDGET_SPENDING_QUERY
} from '@/app/core/graphql/finance.operations';
import { map, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private apollo = inject(Apollo);
  private authService = inject(AuthService);

  private transactionsSignal = signal<Transaction[]>([]);
  private budgetsSignal = signal<Budget[]>([]);
  private potsSignal = signal<Pot[]>([]);
  private balanceSignal = signal<Balance>(DEFAULT_FINANCE_DATA.balance);
  private loadingSignal = signal<boolean>(false);

  userTransactions = this.transactionsSignal.asReadonly();
  userBudgets = this.budgetsSignal.asReadonly();
  userPots = this.potsSignal.asReadonly();
  userBalance = this.balanceSignal.asReadonly();
  currency = signal('')
  userLoading = this.loadingSignal.asReadonly();

  constructor() {
    effect(() => {
      const currentUser = this.authService.currentUser()

      if(currentUser) {
        this.loadAllData(currentUser.currency);
      }
    });
  }


  loadAllData(currency?: string): void {
    this.loadingSignal.set(true);

    const userCurrency = currency || this.authService.currentUser()?.currency || 'USD';

    this.currency.set(userCurrency);

    this.loadBalance(userCurrency);
    this.loadTransactions();
    this.loadBudgets(userCurrency);
    this.loadPots();
  }

  loadBalance(currency?: string): void {
    const userCurrency = currency || this.authService.currentUser()?.currency || 'USD';

    this.apollo
      .query<{ balance: Balance }>({
        query: GET_BALANCE_QUERY,
        variables: { currency: userCurrency },
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => result.data?.balance),
        catchError(error => {
          console.error('Error loading balance:', error);
          return of(DEFAULT_FINANCE_DATA.balance);
        })
      )
      .subscribe(balance => {
        if (!balance) return;

        this.balanceSignal.set(balance);
      });
  }


  loadTransactions(options?: {
    filter?: FilterTransactionsInput;
    sort?: SortTransactionsInput;
    skip?: number;
    take?: number;
  }): void {
    this.apollo
      .query<{ transactions: Transaction[] }>({
        query: GET_TRANSACTIONS_QUERY,
        variables: {
          filter: options?.filter,
          sort: options?.sort,
          skip: options?.skip,
          take: options?.take
        },
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => result?.data?.transactions),
        catchError(error => {
          console.error('Error loading transactions:', error);
          return of([]);
        })
      )
      .subscribe(transactions => {
        this.loadingSignal.set(false);
        if(!transactions) return;

        this.transactionsSignal.set(transactions);
      });
  }


  loadBudgets(currency?: string): void {
    const userCurrency = currency || this.authService.currentUser()?.currency || 'USD';

    this.apollo
      .query<{ budgets: Array<{id: string; category: string; maximum: number; currency: string; theme: string}> }>({
        query: GET_BUDGETS_QUERY,
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => result?.data?.budgets || []),
        catchError(error => {
          console.error('Error loading budgets:', error);
          return of([]);
        })
      )
      .subscribe(budgets => {
        if(!budgets || budgets.length === 0) {
          this.budgetsSignal.set([]);
          return;
        }

        const budgetPromises = budgets.map(budget =>
          this.apollo
            .query<{ budgetSpending: number }>({
              query: GET_BUDGET_SPENDING_QUERY,
              variables: {
                category: budget.category,
                currency: userCurrency
              },
              fetchPolicy: 'network-only'
            })
            .pipe(
              map(result => ({
                ...budget,
                spent: result.data?.budgetSpending || 0
              })),
              catchError(() => of({
                ...budget,
                spent: 0
              }))
            )
            .toPromise()
        );

        Promise.all(budgetPromises).then(budgetsWithSpending => {
          this.budgetsSignal.set(budgetsWithSpending.filter(b => b !== undefined) as Budget[]);
        });
      });
  }


  loadPots(): void {
    this.apollo
      .query<{ pots: Pot[] }>({
        query: GET_POTS_QUERY,
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => result?.data?.pots || null),
        catchError(error => {
          console.error('Error loading pots:', error);
          return of([]);
        })
      )
      .subscribe(pots => {
        if (!pots) return;


        this.potsSignal.set(pots.filter(pot => !!pot && typeof pot.name !== 'undefined'));
      });
  }


  refresh(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.loadAllData(user.currency);
    }
  }
}
