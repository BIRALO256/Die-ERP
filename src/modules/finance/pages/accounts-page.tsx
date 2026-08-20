import { useState } from 'react'
import { 
  Building2, 
  Plus, 
  Search, 
  CreditCard, 
  Wallet,
  CheckCircle2,
  X
} from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'
import { Card } from '../../../shared/components/ui/card'
import { initialAccounts, bankAccounts } from '../data/finance-data'
import type { Account, AccountType } from '../types'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)

  // Form State for Add Account Modal
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState<AccountType>('asset')
  const [newCurrency, setNewCurrency] = useState('USD')
  const [newBalance, setNewBalance] = useState('')
  const [newDescription, setNewDescription] = useState('')

  // Filter accounts
  const filteredAccounts = accounts.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          acc.code.includes(searchTerm) ||
                          (acc.description && acc.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === 'all' || acc.type === selectedType
    return matchesSearch && matchesType
  })

  // Format currency values
  const formatAmount = (amount: number, currency: string) => {
    if (currency === 'UGX') {
      return `UGX ${(amount / 1000000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`
    }
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  }

  // Handle Add Account
  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCode || !newName) return

    const createdAccount: Account = {
      id: `acc-${newCode}`,
      code: newCode,
      name: newName,
      type: newType,
      balance: parseFloat(newBalance) || 0,
      currency: newCurrency,
      isActive: true,
      description: newDescription,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }

    setAccounts([createdAccount, ...accounts])
    setShowAddModal(false)
    // Reset form
    setNewCode('')
    setNewName('')
    setNewDescription('')
    setNewBalance('')
  }

  const getTypeBadge = (type: AccountType) => {
    switch (type) {
      case 'asset':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200'
      case 'liability':
        return 'bg-amber-50 text-amber-800 border-amber-200'
      case 'equity':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200'
      case 'revenue':
        return 'bg-blue-50 text-blue-800 border-blue-200'
      case 'expense':
        return 'bg-rose-50 text-rose-800 border-rose-200'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-border">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-lg font-bold text-foreground tracking-tight" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Chart of Accounts
          </h1>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500 font-medium">General Ledger & Treasury</span>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
            IFRS Compliant
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowAddModal(true)}
            size="sm"
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-3 py-1.5 h-auto shadow-2xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add Account
          </Button>
        </div>
      </div>

      {/* Bank Accounts & Treasury Cards */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5 text-accent" />
            Treasury & Operating Accounts
          </p>
          <span className="text-[10px] text-slate-400 font-medium">3 active banks</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bankAccounts.map(bank => (
            <div key={bank.id} className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                    {bank.accountType}
                  </span>
                  <h3 className="text-xs font-bold text-foreground mt-0.5">{bank.bankName}</h3>
                </div>
                <div className="h-7 w-7 rounded-lg bg-white border border-border flex items-center justify-center text-slate-500">
                  <CreditCard className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xl font-bold text-foreground leading-tight tracking-tight tabular-nums">
                  {bank.currency === 'UGX' 
                    ? `UGX ${(bank.balance / 1000000000).toFixed(2)}B` 
                    : `$${(bank.balance / 1000000).toFixed(2)}M`}
                </p>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5">{bank.accountNumber}</p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-border/80 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 truncate max-w-[170px]">{bank.facilityBranch}</span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by account code, name, or description..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e] transition-all"
            />
          </div>

          {/* Type Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['all', 'asset', 'liability', 'equity', 'revenue', 'expense'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                  selectedType === type
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {type === 'all' ? 'All Accounts' : type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart of Accounts Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">General Ledger Accounts</h2>
            <p className="text-xs text-slate-500 mt-0.5">Showing {filteredAccounts.length} accounts</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">Currencies: USD • UGX</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Account Name & Purpose</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Current Balance</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAccounts.map(account => (
                <tr key={account.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{account.code}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{account.name}</p>
                    {account.description && (
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{account.description}</p>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 text-[10.5px] font-bold rounded-full border capitalize ${getTypeBadge(account.type)}`}>
                      {account.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900 text-sm">
                    {formatAmount(account.balance, account.currency)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in">
          <Card className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-[#c8102e]" />
                <h3 className="text-sm font-bold text-slate-900">Add New General Ledger Account</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddAccount} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Account Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1030"
                    value={newCode}
                    onChange={e => setNewCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Account Type</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as AccountType)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                  >
                    <option value="asset">Asset (1000s)</option>
                    <option value="liability">Liability (2000s)</option>
                    <option value="equity">Equity (3000s)</option>
                    <option value="revenue">Revenue (4000s)</option>
                    <option value="expense">Expense / COGS (5000/6000s)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Account Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stanbic Bioreactor Expansion Escrow"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Currency</label>
                  <select
                    value={newCurrency}
                    onChange={e => setNewCurrency(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="UGX">UGX (Shilling)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Initial Balance</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newBalance}
                    onChange={e => setNewBalance(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description / Purpose</label>
                <textarea
                  rows={2}
                  placeholder="Operational details or regulatory designation..."
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-[#c8102e] hover:bg-[#a80e27] text-white text-xs font-semibold"
                >
                  Create Account
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}