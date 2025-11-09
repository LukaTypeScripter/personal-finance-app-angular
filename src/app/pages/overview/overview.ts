import { Component, inject, OnInit } from '@angular/core';
import { OverviewCard } from './overview-card/overview-card';
import { OverviewPots } from './overview-pots/overview-pots';
import { OverviewTransactions } from './transactions/transactions';
import { OverviewBudgets } from './overview-budgets/overview-budgets';
import { OverviewReccuringBill } from './overview-reccuring-bill/overview-reccuring-bill';
import { Api } from '@/app/shared/service/api';
import {TranslateModule} from '@ngx-translate/core';
@Component({
  selector: 'app-overview',
  imports: [OverviewCard,OverviewPots,OverviewTransactions,OverviewBudgets,OverviewReccuringBill,TranslateModule],
  templateUrl: './overview.html',
  styleUrl: './overview.scss'
})
export class Overview implements OnInit {

  private api = inject(Api);
  protected balance = this.api.balance;

  ngOnInit(): void {
    this.api.loadOverviewData();
  }

}
