import { Component, input, output, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableButton } from '@/app/shared/components/reusable-button/reusable-button.component';
import { ReusableModal } from '@/app/shared/components/reusable-modal/reusable-modal.component';
import { Pot } from '@/app/core/models/finance-data.model';
import { PotService } from '@/app/core/service/pot.service';

@Component({
  selector: 'app-withdraw-money-modal',
  standalone: true,
  imports: [CommonModule, ReusableButton, ReusableModal],
  templateUrl: './withdraw-money-modal.html',
  styleUrl: './withdraw-money-modal.scss'
})
export class WithdrawMoneyModal {
  private potService = inject(PotService);

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
    return Math.max(pot.total - this.amount(), 0);
  });

  onAmountChange(value: string) {
    const num = parseFloat(value);
    this.amount.set(isNaN(num) || num < 0 ? 0 : num);

    // Clear error when amount changes
    if (this.error()) {
      this.error.set(null);
    }
  }

  onClose() {
    this.amount.set(0);
    this.error.set(null);
    this.close.emit();
  }

  onSubmit() {
    this.error.set(null);

    if (this.amount() <= 0) {
      this.error.set('Please enter a valid amount');
      return;
    }

    const pot = this.pot();
    if (!pot?.id) {
      this.error.set('Invalid pot');
      return;
    }

    if (this.amount() > pot.total) {
      this.error.set('Withdrawal amount exceeds available funds');
      return;
    }

    this.isSubmitting.set(true);

    this.potService.withdrawMoneyFromPot(pot.id, this.amount(), this.currency()).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.success.emit();
        this.onClose();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.error.set('Failed to withdraw money. Please try again.');
        console.error('Error withdrawing money:', err);
      }
    });
  }
}
