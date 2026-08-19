import type { 
  Account, 
  Transaction, 
  Invoice, 
  FinancialReport,
  AccountFilters,
  TransactionFilters,
  PaginatedResponse,
  ApiResponse 
} from '../types'

// Mock API base URL - replace with actual API endpoint
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api'

class FinanceApi {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    // Get auth token from store
    const { useAuthStore } = await import('../../../infrastructure/auth/auth-store')
    const token = useAuthStore.getState().token
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }
    
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    return response.json()
  }

  // Account API methods
  async getAccounts(filters?: AccountFilters): Promise<ApiResponse<Account[]>> {
    const params = new URLSearchParams()
    if (filters?.type) params.append('type', filters.type)
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString())
    if (filters?.search) params.append('search', filters.search)
    
    return this.request(`/finance/accounts?${params}`)
  }

  async getAccount(id: string): Promise<ApiResponse<Account>> {
    return this.request(`/finance/accounts/${id}`)
  }

  async createAccount(account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Account>> {
    return this.request('/finance/accounts', {
      method: 'POST',
      body: JSON.stringify(account),
    })
  }

  async updateAccount(id: string, updates: Partial<Account>): Promise<ApiResponse<Account>> {
    return this.request(`/finance/accounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  async deleteAccount(id: string): Promise<ApiResponse<void>> {
    return this.request(`/finance/accounts/${id}`, {
      method: 'DELETE',
    })
  }

  // Transaction API methods
  async getTransactions(
    filters?: TransactionFilters,
    page = 1,
    pageSize = 20
  ): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('pageSize', pageSize.toString())
    
    if (filters?.accountId) params.append('accountId', filters.accountId)
    if (filters?.type) params.append('type', filters.type)
    if (filters?.status) params.append('status', filters.status)
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    if (filters?.search) params.append('search', filters.search)
    
    return this.request(`/finance/transactions?${params}`)
  }

  async getTransaction(id: string): Promise<ApiResponse<Transaction>> {
    return this.request(`/finance/transactions/${id}`)
  }

  async createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Transaction>> {
    return this.request('/finance/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    })
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<ApiResponse<Transaction>> {
    return this.request(`/finance/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  async deleteTransaction(id: string): Promise<ApiResponse<void>> {
    return this.request(`/finance/transactions/${id}`, {
      method: 'DELETE',
    })
  }

  async approveTransaction(id: string): Promise<ApiResponse<Transaction>> {
    return this.request(`/finance/transactions/${id}/approve`, {
      method: 'POST',
    })
  }

  // Invoice API methods
  async getInvoices(page = 1, pageSize = 20): Promise<ApiResponse<PaginatedResponse<Invoice>>> {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('pageSize', pageSize.toString())
    
    return this.request(`/finance/invoices?${params}`)
  }

  async getInvoice(id: string): Promise<ApiResponse<Invoice>> {
    return this.request(`/finance/invoices/${id}`)
  }

  async createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Invoice>> {
    return this.request('/finance/invoices', {
      method: 'POST',
      body: JSON.stringify(invoice),
    })
  }

  async updateInvoice(id: string, updates: Partial<Invoice>): Promise<ApiResponse<Invoice>> {
    return this.request(`/finance/invoices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  async deleteInvoice(id: string): Promise<ApiResponse<void>> {
    return this.request(`/finance/invoices/${id}`, {
      method: 'DELETE',
    })
  }

  // Reports API methods
  async generateReport(type: FinancialReport['type'], period: FinancialReport['period']): Promise<ApiResponse<FinancialReport>> {
    return this.request('/finance/reports/generate', {
      method: 'POST',
      body: JSON.stringify({ type, period }),
    })
  }

  async getReports(): Promise<ApiResponse<FinancialReport[]>> {
    return this.request('/finance/reports')
  }

  // Dashboard API methods
  async getDashboardMetrics(): Promise<ApiResponse<{
    totalRevenue: number
    totalExpenses: number
    netIncome: number
    accountsReceivable: number
    accountsPayable: number
    cashBalance: number
  }>> {
    return this.request('/finance/dashboard/metrics')
  }
}

export const financeApi = new FinanceApi()