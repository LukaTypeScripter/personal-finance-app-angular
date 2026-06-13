import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of, throwError } from 'rxjs';
import { Api } from './api';
import { AuthService } from '@/app/core/service/auth.service';

describe('Api.loadOverviewData', () => {
  let api: Api;
  let apollo: { query: jasmine.Spy };

  function configure(queryReturn: any) {
    apollo = { query: jasmine.createSpy('query').and.returnValue(queryReturn) };
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        Api,
        { provide: Apollo, useValue: apollo },
        { provide: AuthService, useValue: { currentUser: () => ({ currency: 'USD' }) } },
      ],
    });
    api = TestBed.inject(Api);
  }

  it('clears loading and does not throw when the payload has null sub-fields', () => {
    configure(of({ data: { balance: null, transactions: null, pots: null, budgets: null } }));
    expect(() => api.loadOverviewData('USD')).not.toThrow();
    expect(api.loading()).toBe(false);
    expect(api.transactions()).toEqual([]);
  });

  it('clears loading when the query errors', () => {
    configure(throwError(() => new Error('network')));
    api.loadOverviewData('USD');
    expect(api.loading()).toBe(false);
  });

  it('populates signals from a well-formed payload', () => {
    configure(of({ data: {
      balance: { current: 10, income: 10, expenses: 0, currency: 'USD' },
      transactions: { transactions: [{ id: '1', name: 'x' }], pagination: { totalCount: 1 } },
      pots: [{ id: 'p1', name: 'Trip' }],
      budgets: [{ id: 'b1', category: 'Food' }],
    }}));
    api.loadOverviewData('USD');
    expect(api.transactions().length).toBe(1);
    expect(api.pots().length).toBe(1);
    expect(api.balance().current).toBe(10);
  });
});

describe('Api.loadBalance', () => {
  it('sets balance from query result', () => {
    const apollo = { query: jasmine.createSpy().and.returnValue(
      of({ data: { balance: { current: 5, income: 5, expenses: 0, currency: 'USD' } } })) };
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        Api,
        { provide: Apollo, useValue: apollo },
        { provide: AuthService, useValue: { currentUser: () => ({ currency: 'USD' }) } },
      ],
    });
    const api = TestBed.inject(Api);
    api.loadBalance('USD');
    expect(api.balance().current).toBe(5);
  });
});
