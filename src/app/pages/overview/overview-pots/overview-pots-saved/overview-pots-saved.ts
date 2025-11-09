import { Component, computed, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Pot } from '@/app/core/models/finance-data.model';
import { CurrencyFormatPipe } from '@/app/shared/pipes/currency-format-pipe';

@Component({
  selector: 'app-overview-pots-saved',
  imports: [TranslateModule, CurrencyFormatPipe],
  templateUrl: './overview-pots-saved.html',
  styleUrl: './overview-pots-saved.scss'
})
export class OverviewPotsSaved {
  pots = input.required<Pot[]>();
  currency = input.required<string>();

  totalSaved = computed(() => {
    return this.pots().reduce((sum, pot) => sum + pot.total, 0);
  });
}
