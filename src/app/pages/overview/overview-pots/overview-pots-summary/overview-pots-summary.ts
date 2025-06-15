import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-overview-pots-summary',
  imports: [CommonModule],
  templateUrl: './overview-pots-summary.html',
  styleUrl: './overview-pots-summary.scss'
})
export class OverviewPotsSummary {
  type = input.required<'saving' | 'gift' | 'ticket' | 'laptop'>();
  amount = input<number>(156);
  name = input<string>('saving');
}
