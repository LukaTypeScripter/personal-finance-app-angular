import {Component, effect, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from '@/app/shared/pipes/currency-format-pipe';

@Component({
  selector: 'app-overview-pots-summary',
  imports: [CommonModule, CurrencyFormatPipe],
  templateUrl: './overview-pots-summary.html',
  styleUrl: './overview-pots-summary.scss'
})
export class OverviewPotsSummary {
  type = input.required<string>();
  name = input.required<string>();
  amount = input.required<number>();
  theme = input.required<string>();
  currency = input<string>('USD');


  constructor() {
    effect(() => {
      console.log(this.currency(),this.amount())
    });
  }
}
