import { CardHeader } from '@/app/shared/components/card-header/card-header';
import { Component, inject } from '@angular/core';
import { DonutChart } from '@/app/shared/components/donut-chart/donut-chart';
import { OverviewPotsSummary } from '../overview-pots/overview-pots-summary/overview-pots-summary';
import { Api } from '@/app/shared/service/api';
import { SUMMARY_TYPE } from '@/app/core/constants/summary.constant';
@Component({
  selector: 'app-overview-budgets',
  imports: [CardHeader,DonutChart,OverviewPotsSummary],
  templateUrl: './overview-budgets.html',
  styleUrl: './overview-budgets.scss'
})
export class OverviewBudgets {
  protected SUMMARY_TYPE = SUMMARY_TYPE;

  protected budgets = inject(Api).userBudgets;
}
