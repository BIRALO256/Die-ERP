// Account Types
export interface Account {
  id: string
  code: string
  name: string
  type: AccountType
  balance: number
  currency: string
  isActive: boolean
  parentId?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export type AccountType = 
  | 'asset' 
  | 'liability' 
  | 'equity' 
  | 'revenue' 
  | 'expense'

// Transaction Types
export interface Transaction {
  id: string
  reference: string
  description: string
  amount: number
  currency: string
  type: TransactionType
  status: TransactionStatus
  accountId: string
  categoryId?: string
  attachments?: string[]
  metadata?: Record<string, any>
  createdBy: string
  approvedBy?: string
  createdAt: string
  updatedAt: string
}

export type TransactionType = 'debit' | 'credit'
export type TransactionStatus = 'draft' | 'pending' | 'approved' | 'rejected'

// Journal Entry Types
export interface JournalEntry {
  id: string
  reference: string
  description: string
  date: string
  totalAmount: number
  currency: string
  status: JournalEntryStatus
  entries: JournalEntryLine[]
  createdBy: string
  approvedBy?: string
  createdAt: string
  updatedAt: string
}

export interface JournalEntryLine {
  id: string
  accountId: string
  account: Account
  description?: string
  debit: number
  credit: number
}

export type JournalEntryStatus = 'draft' | 'posted' | 'reversed'

// Invoice Types
export interface Invoice {
  id: string
  number: string
  customerId: string
  customerName: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  currency: string
  status: InvoiceStatus
  dueDate: string
  paidDate?: string
  createdAt: string
  updatedAt: string
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

// Report Types
export interface FinancialReport {
  id: string
  name: string
  type: ReportType
  period: ReportPeriod
  data: Record<string, any>
  generatedAt: string
}

export type ReportType = 
  | 'balance_sheet' 
  | 'income_statement' 
  | 'cash_flow' 
  | 'trial_balance'

export interface ReportPeriod {
  startDate: string
  endDate: string
  period: 'monthly' | 'quarterly' | 'yearly' | 'custom'
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

// Filter and Search Types
export interface AccountFilters {
  type?: AccountType
  isActive?: boolean
  search?: string
}

export interface TransactionFilters {
  accountId?: string
  type?: TransactionType
  status?: TransactionStatus
  dateFrom?: string
  dateTo?: string
  search?: string
}