import { FinanceData, Transaction } from '@/app/core/models/finance-data.model';
import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, resource } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private platformId = inject(PLATFORM_ID);
  
   userResource = resource({
    loader: ({ abortSignal }): Promise<FinanceData> => {
      if (isPlatformBrowser(this.platformId)) {
        return fetch('/assets/data/data.json', { signal: abortSignal })
          .then(res => res.json() as Promise<FinanceData>);
      }
      
      return Promise.resolve(null as unknown as FinanceData);
    },
  });

  userTransactions = computed(() => this.userResource.value()?.transactions ? (this.userResource.value() as FinanceData).transactions : []);

  userBudgets = computed(() => this.userResource.value()?.budgets ? (this.userResource.value() as FinanceData).budgets : []);

  userPots = computed(() => this.userResource.value()?.pots ? (this.userResource.value() as FinanceData).pots : []);

  userBalance = computed(() => this.userResource.value()?.balance ? (this.userResource.value() as FinanceData).balance : { current: 0, income: 0, expenses: 0 });

  
}
