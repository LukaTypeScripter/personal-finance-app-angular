import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pot } from '@/app/core/models/finance-data.model';
@Component({
  selector: 'app-overview-pots-summary',
  imports: [CommonModule],
  templateUrl: './overview-pots-summary.html',
  styleUrl: './overview-pots-summary.scss'
})
export class OverviewPotsSummary {
  type = input.required<'saving' | 'gift' | 'ticket' | 'laptop'>();
  name = input.required<string>();
  amount = input.required<number>();
}
