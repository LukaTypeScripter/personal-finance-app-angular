import {Component, ViewChild, PLATFORM_ID, inject, effect} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Chart, ChartConfiguration, Plugin, ArcElement, DoughnutController, Legend, Tooltip} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {Subscription} from 'rxjs';
import {Budget, BudgetDognut} from '@/app/core/models/finance-data.model';
import tinycolor from 'tinycolor2';
import {Api} from '@/app/shared/service/api';
import {AuthService} from '@/app/core/service/auth.service';

@Component({
  selector: 'app-donut-chart',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.scss'
})
export class DonutChart  {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  totalMax!: number;
  totalSpent!: number;
  subscription!: Subscription;
  budgets: Budget[] = [

  ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  protected userBudgets = inject(Api);
  private readonly currency = inject(AuthService).currentUser


  updateBudgets = effect(() => {
    const userBudgets = this.userBudgets.budgets();

    if(!userBudgets) return;

      this.budgets = userBudgets;
      this.updateChartData();
      this.chart?.chart?.update();
  })

  updateCurrency = effect(() => {
    const currency = this.userBudgets.currency();
    if (!currency) return;
    console.log(currency)

    this.chart?.chart?.update();
  });



  ngOnInit(): void {
    if (this.isBrowser) {
      this.updateChartData();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateChartData(): void {
    let localMax = 0;
    let localSpent = 0;

    this.budgets.forEach((budget) => {
      localMax += budget.maximum;
      localSpent += budget.spent;
    });
    this.totalMax = localMax;
    this.totalSpent = localSpent;

    this.doughnutChartDatasets = [
      {
        data: this.budgets.map((budget) => budget.maximum),
        backgroundColor: this.budgets.map((budget) => budget.theme),
        weight: 1,

      },
      {
        data: this.budgets.map((budget) => budget.maximum),
        backgroundColor: this.budgets
          .map((budget) => budget.theme)
          .map((color) => this.lightenColor(color)),
        weight: 0.5,
      },
    ];
  }


  centerTextPlugin: Plugin<'doughnut'> = {
    id: 'centerTextPlugin',
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.save();


      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#201F24';
      ctx.font = '700 32px Public Sans';

      const currencySymbol = this.userBudgets.currency() === 'USD' ? '$' : '₾';


      const text = `${currencySymbol}${this.totalSpent.toFixed(0)}`;

      const firstTextY = centerY;


      ctx.fillText(text, centerX, firstTextY);


      ctx.fillStyle = '#696868';
      ctx.font = '400 12px Public Sans';


      const secondText = `of ${currencySymbol}${this.totalMax.toFixed(0)} limit`;
      const secondTextY = firstTextY + 20 + 8;
      ctx.fillText(secondText, centerX, secondTextY);

      ctx.restore();
    },
  };

  lightenColor = (color: string): string => {
    let tc = tinycolor(color);
    return tc
      .lighten(9)
      .saturate(0)
      .toHexString();
  };

  public doughnutChartLabels: string[] = [];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    datasets: {
      doughnut: {
        spacing: 0,
      },
    },
  };

  constructor() {
    if (this.isBrowser) {
      Chart.register(ArcElement, DoughnutController, Legend, Tooltip, this.centerTextPlugin);
    }
  }
}
