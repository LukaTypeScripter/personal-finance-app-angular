import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '@/app/shared/service/api';
import { ReusableButton } from '@/app/shared/components/reusable-button/reusable-button.component';
import { PotItem } from './pot-item/pot-item';
import { PotModal } from './pot-modal/pot-modal';
import { AddMoneyModal } from './add-money-modal/add-money-modal';
import { WithdrawMoneyModal } from './withdraw-money-modal/withdraw-money-modal';
import { DeleteConfirmationModal } from '@/app/shared/components/delete-confirmation-modal/delete-confirmation-modal.component';
import { Pot } from '@/app/core/models/finance-data.model';
import { PotService } from '@/app/core/service/pot.service';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [CommonModule, ReusableButton, PotItem, PotModal, AddMoneyModal, WithdrawMoneyModal, DeleteConfirmationModal, TranslateModule],
  templateUrl: './pots.html',
  styleUrl: './pots.scss'
})
export class Pots implements OnInit {
  private api = inject(Api);
  private potService = inject(PotService);

  pots = this.api.pots;
  currency = this.api.currency;
  isPotModalOpen = signal(false);
  isAddMoneyModalOpen = signal(false);
  isWithdrawMoneyModalOpen = signal(false);
  isDeleteModalOpen = signal(false);
  selectedPot = signal<Pot | null>(null);
  potToDelete = signal<Pot | null>(null);

  ngOnInit(): void {
    this.api.loadPots(this.currency());
  }

  openAddPotModal() {
    this.selectedPot.set(null);
    this.isPotModalOpen.set(true);
  }

  closePotModal() {
    this.isPotModalOpen.set(false);
    this.selectedPot.set(null);
  }

  openEditPotModal(pot: Pot) {
    this.selectedPot.set(pot);
    this.isPotModalOpen.set(true);
  }

  onPotEdit(pot: Pot) {
    this.openEditPotModal(pot);
  }

  onPotDelete(potId: string) {
    const pot = this.pots().find(p => p.id === potId);
    if (pot) {
      this.potToDelete.set(pot);
      this.isDeleteModalOpen.set(true);
    }
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.potToDelete.set(null);
  }

  confirmDelete() {
    const pot = this.potToDelete();
    if (pot?.id) {
      this.potService.deletePot(pot.id, this.currency()).subscribe({
        next: () => {
          console.log('Pot deleted successfully');
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error('Error deleting pot:', err);
          this.closeDeleteModal();
        }
      });
    }
  }

  onAddMoney(pot: Pot) {
    this.selectedPot.set(pot);
    this.isAddMoneyModalOpen.set(true);
  }

  closeAddMoneyModal() {
    this.isAddMoneyModalOpen.set(false);
    this.selectedPot.set(null);
  }

  onWithdrawMoney(pot: Pot) {
    this.selectedPot.set(pot);
    this.isWithdrawMoneyModalOpen.set(true);
  }

  closeWithdrawMoneyModal() {
    this.isWithdrawMoneyModalOpen.set(false);
    this.selectedPot.set(null);
  }

  onPotSuccess() {
    console.log('Pot operation successful');
  }

  onMoneySuccess() {
    console.log('Money operation successful');
  }
}
