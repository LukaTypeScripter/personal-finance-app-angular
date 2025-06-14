import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from '@/app/shared/pipes/currency-format-pipe';
@Component({
  selector: 'app-overview-card',
  imports: [CommonModule,CurrencyFormatPipe],
  templateUrl: './overview-card.html',
  styleUrl: './overview-card.scss'
})
export class OverviewCard {
  type = input.required<'black' | 'white'>();
  title = input.required<string>();
  amount = input.required<number>();
}
