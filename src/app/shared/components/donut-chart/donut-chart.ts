import {  isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  NgApexchartsModule
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
  plotOptions?:  any;
  fill?: any;
  stroke?: any;
  legend?: any;
  dataLabels?: any;
  tooltip?: any;
};

@Component({
  selector: 'app-donut-chart',
  imports: [NgApexchartsModule ],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.scss'
})
export class DonutChart  {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  
  constructor() {
    this.chartOptions = {
      series: [338, 637, 100, 200], 
      chart: {
        type: 'donut',
        height: 300
      },
      labels: ['Entertainment', 'Bills','Dining Out','Personal Care'],
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              name: { show: false },
              value: { show: false }, 
              total: {
                show: true,
                label: '',
                fontSize: '32px',
                fontWeight: 700,
                color: '#23222B',
                formatter: (w: any) => {
                  return `
                    <div style="font-size:2rem;font-weight:700;color:#23222B;line-height:1.1;">$${w.globals.series[0]}</div>
                    <div style="font-size:1rem;color:#888;">of $975 limit</div>
                  `;
                }
              }
            }
          }
        }
      },
      fill: {
        colors: ['#277C7F', '#82C9D7','#F2CDAC','#626070']
      },
      stroke: {
        show: false
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 1200, 
          options: {
            chart: {
              width: 400,
              height: 400
            }
          }
        },
        {
          breakpoint: 700, 
          options: {
            chart: {
              width: 300,
              height: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }
}
