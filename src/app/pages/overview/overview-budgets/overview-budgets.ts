import { CardHeader } from '@/app/shared/components/card-header/card-header';
import { Component } from '@angular/core';
import { DonutChart } from '@/app/shared/components/donut-chart/donut-chart';
import { OverviewPotsSummary } from '../overview-pots/overview-pots-summary/overview-pots-summary';
@Component({
  selector: 'app-overview-budgets',
  imports: [CardHeader,DonutChart,OverviewPotsSummary],
  templateUrl: './overview-budgets.html',
  styleUrl: './overview-budgets.scss'
})
export class OverviewBudgets {

}
