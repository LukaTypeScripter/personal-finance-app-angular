import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { TransactionService } from './transaction.service';
import { Api } from '@/app/shared/service/api';

describe('TransactionService refresh behaviour', () => {
  let service: TransactionService;
  let api: jasmine.SpyObj<Pick<Api, 'loadTransactions' | 'loadBalance' | 'loadBudgets'>>;

  function setup(mutationResult: unknown) {
    const apollo = { mutate: jasmine.createSpy('mutate').and.returnValue(of(mutationResult)) };
    api = jasmine.createSpyObj('Api', ['loadTransactions', 'loadBalance', 'loadBudgets']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        TransactionService,
        { provide: Apollo, useValue: apollo },
        { provide: Api, useValue: api },
      ],
    });
    service = TestBed.inject(TransactionService);
  }

  it('reloads transactions, balance AND budgets after creating a transaction', () => {
    setup({ data: { createTransaction: { id: 't1', name: 'Lunch', amount: -10 } } });
    service.createTransaction({ name: 'Lunch', category: 'Dining Out', date: '2026-01-01', amount: -10 } as any)
      .subscribe();
    expect(api.loadTransactions).toHaveBeenCalled();
    expect(api.loadBalance).toHaveBeenCalled();
    expect(api.loadBudgets).toHaveBeenCalled();
  });

  it('reloads budgets after updating a transaction', () => {
    setup({ data: { updateTransaction: { id: 't1', name: 'Lunch', amount: -12 } } });
    service.updateTransaction('t1', { amount: -12 } as any).subscribe();
    expect(api.loadBudgets).toHaveBeenCalled();
    expect(api.loadBalance).toHaveBeenCalled();
  });

  it('reloads budgets after deleting a transaction', () => {
    setup({ data: { deleteTransaction: true } });
    service.deleteTransaction('t1').subscribe();
    expect(api.loadBudgets).toHaveBeenCalled();
    expect(api.loadBalance).toHaveBeenCalled();
  });
});
