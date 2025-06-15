import { Component, input } from '@angular/core';
import { CurrencyFormatPipe } from '@/app/shared/pipes/currency-format-pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-overview-reccuring-bill-item',
  imports: [CurrencyFormatPipe,CommonModule],
  templateUrl: './overview-reccuring-bill-item.html',
  styleUrl: './overview-reccuring-bill-item.scss'
})
export class OverviewReccuringBillItem {
  type = input.required<'paid' | 'upcoming' | 'total'>();
  status = input.required<string>();
  amount = input.required<number>();
}
