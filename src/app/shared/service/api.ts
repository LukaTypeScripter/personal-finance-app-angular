import { DEFAULT_FINANCE_DATA } from '@/app/core/constants/default-finance-data.constant';
import { FinanceData, Transaction } from '@/app/core/models/finance-data.model';
import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, resource } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private platformId = inject(PLATFORM_ID);

  userResource = resource({
    loader: ({abortSignal}): Promise<FinanceData> => {
      try {
        if (isPlatformBrowser(this.platformId)) {
          return fetch('/assets/data/data.json', {signal: abortSignal})
            .then(res => res.json() as Promise<FinanceData>);
        }
      } catch (error) {
        return Promise.resolve(DEFAULT_FINANCE_DATA);
      }

      return Promise.resolve(DEFAULT_FINANCE_DATA);
    },
  });

  userTransactions = computed(() => (this.userResource.value() ?? DEFAULT_FINANCE_DATA).transactions);
  userBudgets = computed(() => (this.userResource.value() ?? DEFAULT_FINANCE_DATA).budgets);
  userPots = computed(() =>
    (this.userResource.value() ?? DEFAULT_FINANCE_DATA).pots.filter(
      pot => !!pot && typeof pot.name !== 'undefined'
    )
  );
  userBalance = computed(() => (this.userResource.value() ?? DEFAULT_FINANCE_DATA).balance);
  userLoading = computed(() => this.userResource.isLoading())

}
