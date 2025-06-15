import { Component } from '@angular/core';
import { OverviewCard } from './overview-card/overview-card';
import { OverviewPots } from './overview-pots/overview-pots';
import { OverviewTransactions } from './transactions/transactions';
import { OverviewBudgets } from './overview-budgets/overview-budgets';
@Component({
  selector: 'app-overview',
  imports: [OverviewCard,OverviewPots,OverviewTransactions,OverviewBudgets],
  templateUrl: './overview.html',
  styleUrl: './overview.scss'
})
export class Overview {

}
