import { gql } from 'apollo-angular';

// Balance query
export const GET_BALANCE_QUERY = gql`
  query GetBalance($currency: String) {
    balance(currency: $currency) {
      current
      income
      expenses
      currency
    }
  }
`;

// Transactions queries
export const GET_TRANSACTIONS_QUERY = gql`
  query GetTransactions(
    $filter: FilterTransactionsInput
    $sort: SortTransactionsInput
    $skip: Int
    $take: Int
    $currency: String
  ) {
    transactions(
      filter: $filter
      sort: $sort
      skip: $skip
      take: $take
      currency: $currency
    ) {
      transactions {
        id
        name
        category
        date
        amount
        currency
        avatar
        recurring
      }
      pagination {
        totalCount
        totalPages
        currentPage
        pageSize
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_RECURRING_TRANSACTIONS_QUERY = gql`
  query GetRecurringTransactions {
    recurringTransactions {
      id
      name
      category
      date
      amount
      currency
      avatar
      recurring
    }
  }
`;

export const GET_TRANSACTIONS_BY_CATEGORY_QUERY = gql`
  query GetTransactionsByCategory($category: String!) {
    transactionsByCategory(category: $category) {
      id
      name
      category
      date
      amount
      currency
      avatar
      recurring
    }
  }
`;

// Transaction mutations
export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
      name
      category
      date
      amount
      currency
      avatar
      recurring
    }
  }
`;

export const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransaction($id: String!, $input: UpdateTransactionInput!) {
    updateTransaction(id: $id, input: $input) {
      id
      name
      category
      date
      amount
      currency
      avatar
      recurring
    }
  }
`;

export const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`;

// Budgets queries
export const GET_BUDGETS_QUERY = gql`
  query GetBudgets($currency: String) {
    budgets(currency: $currency) {
      id
      category
      maximum
      spent
      currency
      theme
    }
  }
`;

export const GET_BUDGET_SPENDING_QUERY = gql`
  query GetBudgetSpending($category: String!, $currency: String) {
    budgetSpending(category: $category, currency: $currency)
  }
`;

export const GET_BUDGET_BY_CATEGORY_QUERY = gql`
  query GetBudgetByCategory($category: String!) {
    budgetByCategory(category: $category) {
      id
      category
      maximum
      currency
      theme
    }
  }
`;

// Budget mutations
export const CREATE_BUDGET_MUTATION = gql`
  mutation CreateBudget($input: CreateBudgetInput!) {
    createBudget(input: $input) {
      id
      category
      maximum
      currency
      theme
    }
  }
`;

export const UPDATE_BUDGET_MUTATION = gql`
  mutation UpdateBudget($id: String!, $input: UpdateBudgetInput!) {
    updateBudget(id: $id, input: $input) {
      id
      category
      maximum
      currency
      theme
    }
  }
`;

export const DELETE_BUDGET_MUTATION = gql`
  mutation DeleteBudget($id: String!) {
    deleteBudget(id: $id)
  }
`;

// Pots queries
export const GET_POTS_QUERY = gql`
  query GetPots($currency: String) {
    pots(currency: $currency) {
      id
      name
      target
      total
      currency
      theme
    }
  }
`;

export const GET_POT_QUERY = gql`
  query GetPot($id: String!) {
    pot(id: $id) {
      id
      name
      target
      total
      currency
      theme
    }
  }
`;

// Pot mutations
export const CREATE_POT_MUTATION = gql`
  mutation CreatePot($input: CreatePotInput!) {
    createPot(input: $input) {
      id
      name
      target
      total
      currency
      theme
    }
  }
`;

export const UPDATE_POT_MUTATION = gql`
  mutation UpdatePot($id: String!, $input: UpdatePotInput!) {
    updatePot(id: $id, input: $input) {
      id
      name
      target
      total
      currency
      theme
    }
  }
`;

export const ADD_MONEY_TO_POT_MUTATION = gql`
  mutation AddMoneyToPot($id: String!, $amount: Float!) {
    addMoneyToPot(id: $id, amount: $amount) {
      id
      name
      target
      total
      currency
      theme
    }
  }
`;

export const WITHDRAW_MONEY_FROM_POT_MUTATION = gql`
  mutation WithdrawMoneyFromPot($id: String!, $amount: Float!) {
    withdrawMoneyFromPot(id: $id, amount: $amount) {
      id
      name
      target
      total
      currency
      theme
    }
  }
`;

export const DELETE_POT_MUTATION = gql`
  mutation DeletePot($id: String!) {
    deletePot(id: $id)
  }
`;

export const GET_OVERVIEW_DATA_QUERY = gql`
  query GetOverviewData($currency: String) {
    balance(currency: $currency) {
      current
      income
      expenses
      currency
    }
    transactions(take: 10, sort: { sortBy: DATE, sortOrder: DESC }, currency: $currency) {
      transactions {
        id
        name
        category
        date
        amount
        currency
        avatar
        recurring
      }
      pagination {
        totalCount
        totalPages
        currentPage
        pageSize
        hasNextPage
        hasPreviousPage
      }
    }
    budgets(currency: $currency) {
      id
      category
      maximum
      spent
      currency
      theme
    }
    pots(currency: $currency) {
      id
      name
      target
      total
      currency
      theme
    }
  }
`;
