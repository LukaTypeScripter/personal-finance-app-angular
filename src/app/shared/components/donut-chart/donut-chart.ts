import { Component, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Chart, ChartConfiguration, Plugin, ArcElement, DoughnutController, Legend, Tooltip} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {Subscription} from 'rxjs';
import {BudgetDognut} from '@/app/core/models/finance-data.model';
import tinycolor from 'tinycolor2';

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
  budgets: BudgetDognut[] = [
    {
      id: 1,
      category: 'Dining Out',
      spent: 55.50,
      max: 75,
      theme: { name: 'Yellow', class: 'bg-yellow', color: '#F2CDAC' }
    },
    {
      id: 2,
      category: 'Personal Care',
      spent: 115,
      max: 100,
      theme: { name: 'Purple', class: 'bg-purple', color: '#826CB0' }
    },
    {
      id: 3,
      category: 'Bills',
      spent: 695.48,
      max: 750,
      theme: { name: 'Cyan', class: 'bg-cyan', color: '#82C9D7' }
    },
    {
      id: 4,
      category: 'Entertainment',
      spent: 52.99,
      max: 50,
      theme: { name: 'Green', class: 'bg-g', color: '#277C78' }
    }
  ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnInit(): void {
    if (this.isBrowser) {
      this.updateChartData();
    }
    // this.subscription = this.budgetService.budgets$.subscribe((budgets) => {
    //   this.budgets = budgets;
    //   this.updateChartData();
    //   this.chart?.chart?.update(); // Update the chart after setting new data
    // });
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
      localMax += budget.max;
      localSpent += budget.spent;
    });
    this.totalMax = localMax;
    this.totalSpent = localSpent;

    this.doughnutChartDatasets = [
      {
        data: this.budgets.map((budget) => budget.max),
        backgroundColor: this.budgets.map((budget) => budget.theme.color),
        weight: 1,
      },
      {
        data: this.budgets.map((budget) => budget.max),
        backgroundColor: this.budgets
          .map((budget) => budget.theme.color)
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


      const text = `$${this.totalSpent.toFixed(0)}`;
      const firstTextY = centerY;


      ctx.fillText(text, centerX, firstTextY);


      ctx.fillStyle = '#696868';
      ctx.font = '400 12px Public Sans';


      const secondText = `of $${this.totalMax.toFixed(0)} limit`;
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
