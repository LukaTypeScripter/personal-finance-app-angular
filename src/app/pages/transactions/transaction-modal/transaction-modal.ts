import { Component, input, output, effect, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction, CreateTransactionInput, UpdateTransactionInput } from '@/app/core/models/finance-data.model';
import { ReusableButton } from '@/app/shared/components/reusable-button/reusable-button.component';
import { ReusableModal } from '@/app/shared/components/reusable-modal/reusable-modal.component';
import { ReusableInput } from '@/app/shared/components/reuseble-input/reusable-input.component';
import { ReusableDropdown, DropdownOption } from '@/app/shared/components/reusable-dropdown/reusable-dropdown.component';
import { TransactionService } from '@/app/core/service/transaction.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReusableButton, ReusableModal, ReusableInput, ReusableDropdown, TranslateModule],
  templateUrl: './transaction-modal.html',
  styleUrl: './transaction-modal.scss'
})
export class TransactionModal {
  private transactionService = inject(TransactionService);
  private translate = inject(TranslateService);
  private fb = inject(FormBuilder);

  isOpen = input.required<boolean>();
  transaction = input<Transaction | null>(null);
  currency = input<string>('USD');

  close = output<void>();
  success = output<void>();

  // Reactive form
  transactionForm: FormGroup;

  isSubmitting = signal(false);
  error = signal<string | null>(null);
  selectedCategory = signal<string>('');
  selectedAvatar = signal<string>('😀');

  isEditMode = computed(() => this.transaction() !== null);
  modalTitle = computed(() => this.isEditMode()
    ? this.translate.instant('transactions.modal.editTransactionTitle')
    : this.translate.instant('transactions.modal.addTransactionTitle'));

  categoryOptions = computed<DropdownOption[]>(() => [
    { value: 'Entertainment', label: this.translate.instant('categories.entertainment') },
    { value: 'Bills', label: this.translate.instant('categories.bills') },
    { value: 'Groceries', label: this.translate.instant('categories.groceries') },
    { value: 'Dining Out', label: this.translate.instant('categories.diningOut') },
    { value: 'Transportation', label: this.translate.instant('categories.transportation') },
    { value: 'Personal Care', label: this.translate.instant('categories.personalCare') },
    { value: 'Education', label: this.translate.instant('categories.education') },
    { value: 'Lifestyle', label: this.translate.instant('categories.lifestyle') },
    { value: 'Shopping', label: this.translate.instant('categories.shopping') },
    { value: 'General', label: this.translate.instant('categories.general') }
  ]);

  avatarOptions: DropdownOption[] = [
    { value: '😀', label: '😀 Grinning' },
    { value: '😎', label: '😎 Cool' },
    { value: '🤑', label: '🤑 Money' },
    { value: '💰', label: '💰 Money Bag' },
    { value: '💳', label: '💳 Credit Card' },
    { value: '🏦', label: '🏦 Bank' },
    { value: '🛒', label: '🛒 Shopping Cart' },
    { value: '🍕', label: '🍕 Pizza' },
    { value: '🍔', label: '🍔 Burger' },
    { value: '☕', label: '☕ Coffee' },
    { value: '🚗', label: '🚗 Car' },
    { value: '✈️', label: '✈️ Airplane' },
    { value: '🏠', label: '🏠 House' },
    { value: '📱', label: '📱 Phone' },
    { value: '💻', label: '💻 Laptop' },
    { value: '🎮', label: '🎮 Game' },
    { value: '🎬', label: '🎬 Movie' },
    { value: '📚', label: '📚 Books' },
    { value: '⚡', label: '⚡ Electric' },
    { value: '💊', label: '💊 Medicine' }
  ];

  constructor() {
    this.transactionForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      avatar: ['😀', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      recurring: [false]
    });

    effect(() => {
      const transactionData = this.transaction();
      const modalOpen = this.isOpen();

      if (modalOpen && transactionData) {
        this.transactionForm.patchValue({
          name: transactionData.name,
          category: transactionData.category,
          avatar: transactionData.avatar || '😀',
          date: transactionData.date,
          amount: transactionData.amount,
          recurring: transactionData.recurring
        });
        this.selectedCategory.set(transactionData.category);
        this.selectedAvatar.set(transactionData.avatar || '😀');
      } else if (modalOpen && !transactionData) {
        this.resetForm();
      }
    });
  }

  resetForm() {
    this.transactionForm.reset({
      name: '',
      category: '',
      avatar: '😀',
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      recurring: false
    });
    this.selectedCategory.set('');
    this.selectedAvatar.set('😀');
    this.error.set(null);
  }

  onCategoryChange(value: string) {
    this.selectedCategory.set(value);
    this.transactionForm.patchValue({ category: value });
  }

  onAvatarChange(value: string) {
    this.selectedAvatar.set(value);
    this.transactionForm.patchValue({ avatar: value });
  }

  onClose() {
    this.resetForm();
    this.close.emit();
  }

  onSubmit() {
    this.error.set(null);
    const formValue = this.transactionForm.value;
    if (this.transactionForm.invalid) {
       console.log({
         name: formValue.name,
         category: formValue.category,
         date: formValue.date,
         amount: Number(formValue.amount),
         recurring: formValue.recurring,
         currency: this.currency() as any
       })
      this.error.set(this.translate.instant('errors.fillAllFields'));
      return;
    }

    this.isSubmitting.set(true);


    if (this.isEditMode()) {
      const transaction = this.transaction();
      if (!transaction?.id) {
        this.error.set(this.translate.instant('errors.invalidTransaction'));
        this.isSubmitting.set(false);
        return;
      }

      const updateInput: UpdateTransactionInput = {
        name: formValue.name,
        category: formValue.category,
        avatar: formValue.avatar,
        date: formValue.date,
        amount: Number(formValue.amount),
        recurring: formValue.recurring,
        currency: this.currency() as any
      };

      this.transactionService.updateTransaction(transaction.id, updateInput).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.success.emit();
          this.onClose();
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.error.set(this.translate.instant('errors.updateTransactionFailed'));
          console.error('Error updating transaction:', err);
        }
      });
    } else {
      const createInput: CreateTransactionInput = {
        name: formValue.name,
        category: formValue.category,
        avatar: formValue.avatar,
        date: formValue.date,
        amount: Number(formValue.amount),
        recurring: formValue.recurring,
        currency: this.currency() as any
      };

      this.transactionService.createTransaction(createInput).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.success.emit();
          this.onClose();
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.error.set(this.translate.instant('errors.createTransactionFailed'));
          console.error('Error creating transaction:', err);
        }
      });
    }
  }
}
