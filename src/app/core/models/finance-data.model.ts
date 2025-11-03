import {Theme} from '@/app/core/models/theme.model';

export interface Balance {
    current: number;
    income: number;
    expenses: number;
  }

  export interface Transaction {
    avatar: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    recurring: boolean;
  }

  export interface Budget {
    category: string;
    maximum: number;
    spent: number;
    theme: string;
  }

export interface BudgetDognut {
  id: number;
  category: string;
  spent: number;
  max: number;
  theme: Theme;
}

  export interface Pot {
    name: string;
    target: number;
    total: number;
    theme: string;
  }

  export interface FinanceData {
    balance: Balance;
    transactions: Transaction[];
    budgets: Budget[];
    pots: Pot[];
  }
