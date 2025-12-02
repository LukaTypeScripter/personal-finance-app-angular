import {
  Component,
  ViewChild,
  PLATFORM_ID,
  inject,
  effect,
  signal,
  computed,
  OnInit
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Chart, ChartConfiguration, Plugin, ArcElement, DoughnutController, Legend, Tooltip} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {Api} from '@/app/shared/service/api';
import {doughnutChartOptions,lightenColor,centerTextPlugin} from './helper'


@Component({
  selector: 'app-donut-chart',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.scss'
})
export class DonutChart implements OnInit {
  private platformId = inject(PLATFORM_ID);
  public isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  protected userBudgets = inject(Api);

  private totalMax = signal<number>(0);
  private totalSpent =  signal<number>(0);
  private  budgets = computed(() => {
    return this.userBudgets.budgets()
  })
  private readonly currency = this.userBudgets.currency

  private readonly centerTextPlugin: Plugin<'doughnut'> = centerTextPlugin(this.totalSpent(),this.totalMax(),this.currency())

  public readonly doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = doughnutChartOptions
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [];


  private readonly updateBudgets = effect(() => {
    const userBudgets = this.userBudgets.budgets();


    if(!userBudgets || userBudgets.length === 0) return;

      this.updateChartData();
      this.chart?.chart?.update();

  })

  private readonly updateCurrency = effect(() => {
    const currency = this.userBudgets.currency();
    if (!currency) return;

    this.updateChartData();
    this.chart?.chart?.update();
  });

  ngOnInit() {
    if (this.isBrowser) {
      Chart.register(ArcElement, DoughnutController, Legend, Tooltip, this.centerTextPlugin);
    }
  }

  private updateChartData(): void {
    let localMax = 0;
    let localSpent = 0;

    this.budgets().forEach((budget) => {
      localMax += budget.maximum;
      localSpent += budget.spent;
    });
    this.totalSpent.set(localSpent);
    this.totalMax.set(localMax);

    this.doughnutChartDatasets = [
      {
        data: this.budgets().map((budget) => budget.maximum),
        backgroundColor: this.budgets().map((budget) => budget.theme),
        weight: 1,

      },
      {
        data: this.budgets().map((budget) => budget.maximum),
        backgroundColor: this.budgets()
          .map((budget) => budget.theme)
          .map((color) => lightenColor(color)),
        weight: 0.5,
      },
    ];
  }
}
