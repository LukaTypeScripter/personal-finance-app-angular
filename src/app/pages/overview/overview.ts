import { Component, inject } from '@angular/core';
import { OverviewCard } from './overview-card/overview-card';
import { OverviewPots } from './overview-pots/overview-pots';
import { OverviewTransactions } from './transactions/transactions';
import { OverviewBudgets } from './overview-budgets/overview-budgets';
import { OverviewReccuringBill } from './overview-reccuring-bill/overview-reccuring-bill';
import { Api } from '@/app/shared/service/api';
@Component({
  selector: 'app-overview',
  imports: [OverviewCard,OverviewPots,OverviewTransactions,OverviewBudgets,OverviewReccuringBill],
  templateUrl: './overview.html',
  styleUrl: './overview.scss'
})
export class Overview {

  protected balance = inject(Api).userBalance;

}
