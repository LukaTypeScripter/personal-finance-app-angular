import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pot } from '@/app/core/models/finance-data.model';
import { ReusableButton } from '@/app/shared/components/reusable-button/reusable-button.component';

@Component({
  selector: 'app-pot-item',
  standalone: true,
  imports: [CommonModule, ReusableButton],
  templateUrl: './pot-item.html',
  styleUrl: './pot-item.scss'
})
export class PotItem {
  pot = input.required<Pot>();
  currency = input<string>('USD');

  edit = output<void>();
  delete = output<void>();
  addMoney = output<void>();
  withdrawMoney = output<void>();

  currencySymbol = computed(() => this.currency() === 'USD' ? '$' : '₾');

  percentageSaved = computed(() => {
    const pot = this.pot();
    if (!pot.target || pot.target === 0) return 0;
    return Math.min((pot.total / pot.target) * 100, 100);
  });

  remaining = computed(() => {
    const pot = this.pot();
    return Math.max(pot.target - pot.total, 0);
  });

  isTargetReached = computed(() => {
    const pot = this.pot();
    return pot.total >= pot.target;
  });

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  onAddMoney() {
    this.addMoney.emit();
  }

  onWithdrawMoney() {
    this.withdrawMoney.emit();
  }
}
