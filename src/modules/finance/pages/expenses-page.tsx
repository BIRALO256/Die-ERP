import { useState } from 'react'
import {  
  Plus, 
  Search, 
  Receipt,
  AlertTriangle, 
  X,
  ShieldCheck,
  Check,
  Ban
} from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'
import { Card } from '../../../shared/components/ui/card'
import { initialExpenses, type ExpenseItem } from '../data/finance-data'

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)

  // Form State for New Expense
  const [vendor, setVendor] = useState('')
  const [category, setCategory] = useState<ExpenseItem['category']>('COGS & Raw Materials')
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [batchLot, setBatchLot] = useState('')
  const [paymentDue, setPaymentDue] = useState('')

  // KPI Calculations
  const pendingApprovals = expenses.filter(e => e.status === 'pending_approval')
  const totalOpEx = expenses
    .filter(e => e.category !== 'CapEx & Machinery')
    .reduce((sum, e) => sum + e.amount, 0)
  const totalCapEx = expenses
    .filter(e => e.category === 'CapEx & Machinery')
    .reduce((sum, e) => sum + e.amount, 0)
  const totalPaid = expenses
    .filter(e => e.status === 'paid')
    .reduce((sum, e) => sum + e.amount, 0)

  // Filtered Expenses
  const filteredExpenses = expenses.filter(e => {
    const matchesSearch = e.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Handle Approve
  const handleApprove = (id: string) => {
    setExpenses(expenses.map(e => 
      e.id === id 
        ? { ...e, status: 'approved', approvedBy: 'Dr. Sarah Nakato' } 
        : e
    ))
  }

  // Handle Reject
  const handleReject = (id: string) => {
    setExpenses(expenses.map(e => 
      e.id === id 
        ? { ...e, status: 'rejected' } 
        : e
    ))
  }

  // Handle Mark as Paid
  const handleMarkPaid = (id: string) => {
    setExpenses(expenses.map(e => 
      e.id === id 
        ? { ...e, status: 'paid' } 
        : e
    ))
  }

  // Handle Add Expense
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (!vendor || !desc || !amount) return

    const newExpense: ExpenseItem = {
      id: `exp-${Date.now()}`,
      reference: `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      vendor,
      category,
      description: desc,
      amount: parseFloat(amount) || 0,
      currency: 'USD',
      batchLot: batchLot || undefined,
      date: new Date().toISOString().split('T')[0],
      status: 'pending_approval',
      paymentDue: paymentDue || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }

    setExpenses([newExpense, ...expenses])
    setShowAddModal(false)
    // Reset
    setVendor('')
    setDesc('')
    setAmount('')
    setBatchLot('')
    setPaymentDue('')
  }

  const getCategoryBadge = (cat: ExpenseItem['category']) => {
    switch (cat) {
      case 'COGS & Raw Materials':
        return 'bg-blue-50 text-blue-800 border-blue-200'
      case 'Cleanroom OpEx':
        return 'bg-amber-50 text-amber-800 border-amber-200'
      case 'CapEx & Machinery':
        return 'bg-purple-50 text-purple-800 border-purple-200'
      case 'Regulatory & Quality':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200'
      case 'Logistics & Cold-Chain':
        return 'bg-teal-50 text-teal-800 border-teal-200'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  const getStatusBadge = (status: ExpenseItem['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200'
      case 'approved':
        return 'bg-blue-50 text-blue-800 border-blue-200'
      case 'pending_approval':
        return 'bg-amber-50 text-amber-800 border-amber-200'
      case 'rejected':
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
            Expenses & Disbursements
          </h1>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500 font-medium">OpEx, Utilities & CapEx</span>
          <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-md">
            Payables
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowAddModal(true)}
            size="sm"
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-3 py-1.5 h-auto shadow-2xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Record Expense
          </Button>
        </div>
      </div>

      {/* Compact KPI Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total OpEx */}
        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-500">Operational OpEx</p>
            <span className="text-[10px] font-medium text-slate-400">Power & WFI</span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-bold text-foreground leading-none tracking-tight tabular-nums">
              ${(totalOpEx / 1000).toFixed(0)}K
            </p>
          </div>
        </div>

        {/* CapEx Machinery */}
        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-500">CapEx Machinery</p>
            <span className="text-[10px] font-medium text-slate-400">Bioreactors</span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-bold text-foreground leading-none tracking-tight tabular-nums">
              ${(totalCapEx / 1000).toFixed(0)}K
            </p>
          </div>
        </div>

        {/* Pending Sign-Offs */}
        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-500">Pending Sign-off</p>
            <span className="text-[10px] font-bold text-primary flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Action Req.
            </span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-bold text-primary leading-none tracking-tight tabular-nums">
              {pendingApprovals.length} {pendingApprovals.length === 1 ? 'Bill' : 'Bills'}
            </p>
          </div>
        </div>

        {/* Total Settled */}
        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-500">Settled Outflows</p>
            <span className="text-[10px] font-semibold text-emerald-600">Disbursed</span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-bold text-foreground leading-none tracking-tight tabular-nums">
              ${(totalPaid / 1000).toFixed(0)}K
            </p>
          </div>
        </div>
      </div>

      {/* Pending Executive Authorizations Queue */}
      {pendingApprovals.length > 0 && (
        <div className="pharmacy-card p-5 border-amber-200 bg-amber-50/30">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-200/80">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-[#c8102e]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Pending Executive Authorizations Queue
              </h2>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {pendingApprovals.length} Awaiting Review
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {pendingApprovals.map(item => (
              <div key={item.id} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10.5px] font-mono text-slate-400">{item.reference}</span>
                    <p className="text-xs font-bold text-slate-900">{item.vendor}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                    {item.batchLot && (
                      <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        Lot: {item.batchLot}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-extrabold text-[#c8102e]">
                    ${item.amount.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleReject(item.id)}
                    className="h-7 text-xs text-rose-700 hover:bg-rose-50 border-rose-200"
                  >
                    <Ban className="h-3 w-3 mr-1" />
                    Reject
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleApprove(item.id)}
                    className="h-7 text-xs bg-[#143d1d] hover:bg-[#0f2e16] text-white flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" />
                    Authorize Disbursement
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expenses List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by PO #, vendor, or description..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e] transition-all"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto">
            {['all', 'COGS & Raw Materials', 'Cleanroom OpEx', 'CapEx & Machinery', 'Regulatory & Quality'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat === 'all' ? 'All Expenses' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">PO / Ref</th>
                <th className="py-3 px-4">Vendor & Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Payment Due</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{item.reference}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{item.vendor}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                    {item.approvedBy && (
                      <p className="text-[10px] text-emerald-700 mt-0.5">Approved by {item.approvedBy}</p>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 text-[10.5px] font-bold rounded-full border ${getCategoryBadge(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">{item.paymentDue}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900 text-sm">
                    ${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-0.5 text-[10.5px] font-bold rounded-full border capitalize ${getStatusBadge(item.status)}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {item.status === 'approved' ? (
                      <button
                        onClick={() => handleMarkPaid(item.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Disburse Wire
                      </button>
                    ) : item.status === 'pending_approval' ? (
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Authorize
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in">
          <Card className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2">
                <Receipt className="h-4 w-4 text-[#c8102e]" />
                <h3 className="text-sm font-bold text-slate-900">Record Operational Expense / CapEx Bill</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vendor / Payee</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lonza Pharma Reagents"
                  value={vendor}
                  onChange={e => setVendor(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expense Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as ExpenseItem['category'])}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                  >
                    <option value="COGS & Raw Materials">COGS & Raw Materials</option>
                    <option value="Cleanroom OpEx">Cleanroom OpEx & Power</option>
                    <option value="CapEx & Machinery">CapEx & Bioreactors</option>
                    <option value="Regulatory & Quality">Regulatory & GMP Audits</option>
                    <option value="Logistics & Cold-Chain">Logistics & -80°C Cold Chain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="0.00"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Batch Lot Linkage (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. #BP-2024-8847"
                    value={batchLot}
                    onChange={e => setBatchLot(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Due Date</label>
                  <input
                    type="date"
                    value={paymentDue}
                    onChange={e => setPaymentDue(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description / Bill Purpose</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Details of materials, cleanroom utility cycle, or machinery asset..."
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
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
                  Submit for Approval
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
