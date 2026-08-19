import { create } from 'zustand'
import type { 
  Account, 
  Transaction, 
  Invoice, 
  AccountFilters, 
  TransactionFilters 
} from '../types'

interface FinanceState {
  // Accounts
  accounts: Account[]
  selectedAccount: Account | null
  accountsLoading: boolean
  
  // Transactions
  transactions: Transaction[]
  selectedTransaction: Transaction | null
  transactionsLoading: boolean
  
  // Invoices
  invoices: Invoice[]
  selectedInvoice: Invoice | null
  invoicesLoading: boolean
  
  // Filters
  accountFilters: AccountFilters
  transactionFilters: TransactionFilters
  
  // Dashboard metrics
  dashboardMetrics: {
    totalRevenue: number
    totalExpenses: number
    netIncome: number
    accountsReceivable: number
    accountsPayable: number
    cashBalance: number
  }
}

interface FinanceActions {
  // Account actions
  setAccounts: (accounts: Account[]) => void
  addAccount: (account: Account) => void
  updateAccount: (id: string, updates: Partial<Account>) => void
  deleteAccount: (id: string) => void
  setSelectedAccount: (account: Account | null) => void
  setAccountsLoading: (loading: boolean) => void
  setAccountFilters: (filters: AccountFilters) => void
  
  // Transaction actions
  setTransactions: (transactions: Transaction[]) => void
  addTransaction: (transaction: Transaction) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  setSelectedTransaction: (transaction: Transaction | null) => void
  setTransactionsLoading: (loading: boolean) => void
  setTransactionFilters: (filters: TransactionFilters) => void
  
  // Invoice actions
  setInvoices: (invoices: Invoice[]) => void
  addInvoice: (invoice: Invoice) => void
  updateInvoice: (id: string, updates: Partial<Invoice>) => void
  deleteInvoice: (id: string) => void
  setSelectedInvoice: (invoice: Invoice | null) => void
  setInvoicesLoading: (loading: boolean) => void
  
  // Dashboard actions
  setDashboardMetrics: (metrics: FinanceState['dashboardMetrics']) => void
  
  // Utility actions
  clearAll: () => void
}

export const useFinanceStore = create<FinanceState & FinanceActions>((set, get) => ({
  // Initial state
  accounts: [],
  selectedAccount: null,
  accountsLoading: false,
  
  transactions: [],
  selectedTransaction: null,
  transactionsLoading: false,
  
  invoices: [],
  selectedInvoice: null,
  invoicesLoading: false,
  
  accountFilters: {},
  transactionFilters: {},
  
  dashboardMetrics: {
    totalRevenue: 0,
    totalExpenses: 0,
    netIncome: 0,
    accountsReceivable: 0,
    accountsPayable: 0,
    cashBalance: 0,
  },

  // Account actions
  setAccounts: (accounts) => set({ accounts }),
  
  addAccount: (account) => 
    set((state) => ({ accounts: [...state.accounts, account] })),
    
  updateAccount: (id, updates) =>
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === id ? { ...account, ...updates } : account
      ),
    })),
    
  deleteAccount: (id) =>
    set((state) => ({
      accounts: state.accounts.filter((account) => account.id !== id),
      selectedAccount: state.selectedAccount?.id === id ? null : state.selectedAccount,
    })),
    
  setSelectedAccount: (account) => set({ selectedAccount: account }),
  setAccountsLoading: (accountsLoading) => set({ accountsLoading }),
  setAccountFilters: (accountFilters) => set({ accountFilters }),

  // Transaction actions
  setTransactions: (transactions) => set({ transactions }),
  
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
    
  updateTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updates } : transaction
      ),
    })),
    
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((transaction) => transaction.id !== id),
      selectedTransaction: state.selectedTransaction?.id === id ? null : state.selectedTransaction,
    })),
    
  setSelectedTransaction: (transaction) => set({ selectedTransaction: transaction }),
  setTransactionsLoading: (transactionsLoading) => set({ transactionsLoading }),
  setTransactionFilters: (transactionFilters) => set({ transactionFilters }),

  // Invoice actions
  setInvoices: (invoices) => set({ invoices }),
  
  addInvoice: (invoice) =>
    set((state) => ({ invoices: [...state.invoices, invoice] })),
    
  updateInvoice: (id, updates) =>
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, ...updates } : invoice
      ),
    })),
    
  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
      selectedInvoice: state.selectedInvoice?.id === id ? null : state.selectedInvoice,
    })),
    
  setSelectedInvoice: (invoice) => set({ selectedInvoice: invoice }),
  setInvoicesLoading: (invoicesLoading) => set({ invoicesLoading }),

  // Dashboard actions
  setDashboardMetrics: (dashboardMetrics) => set({ dashboardMetrics }),

  // Utility actions
  clearAll: () => set({
    accounts: [],
    selectedAccount: null,
    accountsLoading: false,
    transactions: [],
    selectedTransaction: null,
    transactionsLoading: false,
    invoices: [],
    selectedInvoice: null,
    invoicesLoading: false,
    accountFilters: {},
    transactionFilters: {},
    dashboardMetrics: {
      totalRevenue: 0,
      totalExpenses: 0,
      netIncome: 0,
      accountsReceivable: 0,
      accountsPayable: 0,
      cashBalance: 0,
    },
  }),
}))