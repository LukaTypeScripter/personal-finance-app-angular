import { Component, input, output, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableButton } from '@/app/shared/components/reusable-button/reusable-button.component';
import { ReusableModal } from '@/app/shared/components/reusable-modal/reusable-modal.component';
import { Pot } from '@/app/core/models/finance-data.model';
import { PotService } from '@/app/core/service/pot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-money-modal',
  standalone: true,
  imports: [CommonModule, ReusableButton, ReusableModal],
  templateUrl: './add-money-modal.html',
  styleUrl: './add-money-modal.scss'
})
export class AddMoneyModal {
  private potService = inject(PotService);
  private translate = inject(TranslateService);

  isOpen = input.required<boolean>();
  pot = input<Pot | null>(null);
  currency = input<string>('USD');

  close = output<void>();
  success = output<void>();

  amount = signal<number>(0);
  isSubmitting = signal(false);
  error = signal<string | null>(null);

  currencySymbol = computed(() => this.currency() === 'USD' ? '$' : '₾');

  newTotal = computed(() => {
    const pot = this.pot();
    if (!pot) return 0;
    return pot.total + this.amount();
  });

  remainingToTarget = computed(() => {
    const pot = this.pot();
    if (!pot) return 0;
    return Math.max(pot.target - this.newTotal(), 0);
  });

  onAmountChange(value: string) {
    const num = parseFloat(value);
    this.amount.set(isNaN(num) || num < 0 ? 0 : num);
  }

  onClose() {
    this.amount.set(0);
    this.error.set(null);
    this.close.emit();
  }

  onSubmit() {
    this.error.set(null);

    if (this.amount() <= 0) {
      this.error.set(this.translate.instant('errors.validAmount'));
      return;
    }

    const pot = this.pot();
    if (!pot?.id) {
      this.error.set(this.translate.instant('errors.invalidPot'));
      return;
    }

    // Validate that total won't exceed target
    if (this.newTotal() > pot.target) {
      this.error.set(this.translate.instant('errors.exceedsTarget', {
        maxAmount: this.currencySymbol() + this.remainingToTarget().toFixed(2)
      }));
      return;
    }

    this.isSubmitting.set(true);

    this.potService.addMoneyToPot(pot.id, this.amount(), this.currency()).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.success.emit();
        this.onClose();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.error.set(this.translate.instant('errors.addMoneyFailed'));
        console.error('Error adding money:', err);
      }
    });
  }
}
