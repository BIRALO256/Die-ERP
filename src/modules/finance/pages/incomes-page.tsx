import { useState } from 'react'
import { 
  TrendingUp, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  X,
  Send
} from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'
import { Card } from '../../../shared/components/ui/card'
import { initialInvoices } from '../data/finance-data'
import type { Invoice, InvoiceStatus } from '../types'

export default function IncomesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Form State for New Invoice
  const [customerName, setCustomerName] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [itemQty, setItemQty] = useState('1')
  const [itemPrice, setItemPrice] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [currency, setCurrency] = useState('USD')

  // Financial KPI Calculations
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0)
  const totalCollected = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0)
  const totalOutstanding = invoices.filter(inv => inv.status === 'sent' || inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0)
  const overdueCount = invoices.filter(inv => inv.status === 'overdue').length

  // Filtered Invoices
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inv.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inv.items.some(it => it.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Handle Create Invoice
  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName || !itemDesc || !itemPrice) return

    const qty = parseFloat(itemQty) || 1
    const price = parseFloat(itemPrice) || 0
    const total = qty * price
    const newNumber = `INV-2026-00${invoices.length + 1}`

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      number: newNumber,
      customerId: `cust-${Date.now()}`,
      customerName,
      items: [
        {
          id: `item-${Date.now()}`,
          description: itemDesc,
          quantity: qty,
          unitPrice: price,
          total: total
        }
      ],
      subtotal: total,
      tax: 0,
      total: total,
      currency: currency,
      status: 'sent',
      dueDate: dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }

    setInvoices([newInvoice, ...invoices])
    setShowCreateModal(false)
    // Reset
    setCustomerName('')
    setItemDesc('')
    setItemQty('1')
    setItemPrice('')
    setDueDate('')
  }

  // Handle Mark as Paid
  const handleMarkPaid = (id: string) => {
    setInvoices(invoices.map(inv => 
      inv.id === id 
        ? { ...inv, status: 'paid' as InvoiceStatus, paidDate: new Date().toISOString().split('T')[0] } 
        : inv
    ))
  }

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200'
      case 'sent':
        return 'bg-blue-50 text-blue-800 border-blue-200'
      case 'overdue':
        return 'bg-rose-50 text-rose-800 border-rose-200'
      case 'draft':
        return 'bg-slate-50 text-slate-700 border-slate-200'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="medical-title">Incomes & Vaccine Contracts</h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#143d1d]/10 text-[#166534] border border-[#143d1d]/20">
              Commercial Revenue
            </span>
          </div>
          <p className="medical-body mt-1 text-xs sm:text-sm text-slate-500">
            Government supply agreements, CDMO clinical invoicing, and accounts receivable tracking
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button
            onClick={() => setShowCreateModal(true)}
            size="sm"
            className="bg-[#c8102e] hover:bg-[#a80e27] text-white text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Create Commercial Invoice
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Invoiced */}
        <div className="pharmacy-stat-card border border-slate-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="medical-caption uppercase tracking-wider text-slate-500">Total Invoiced (Q3)</p>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
                ${(totalInvoiced / 1000000).toFixed(2)}M
              </h2>
            </div>
            <div className="h-9 w-9 bg-emerald-50 rounded-xl flex items-center justify-center text-[#166534]">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-[#166534] font-semibold mt-3 flex items-center">
            Across {invoices.length} active supply contracts
          </p>
        </div>

        {/* Collected Revenue */}
        <div className="pharmacy-stat-card border border-slate-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="medical-caption uppercase tracking-wider text-slate-500">Collected Inflows</p>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
                ${(totalCollected / 1000000).toFixed(2)}M
              </h2>
            </div>
            <div className="h-9 w-9 bg-slate-100 rounded-xl flex items-center justify-center text-[#143d1d]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-3">
            Settled via Direct Wire to Treasury
          </p>
        </div>

        {/* Outstanding Receivables */}
        <div className="pharmacy-stat-card border border-slate-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="medical-caption uppercase tracking-wider text-slate-500">Accounts Receivable (AR)</p>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
                ${(totalOutstanding / 1000000).toFixed(2)}M
              </h2>
            </div>
            <div className="h-9 w-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-blue-700 font-semibold mt-3">
            Pending Net-30/60 Days Maturity
          </p>
        </div>

        {/* Overdue Alerts */}
        <div className="pharmacy-stat-card border border-slate-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="medical-caption uppercase tracking-wider text-slate-500">Past Maturity / Overdue</p>
              <h2 className="text-2xl font-extrabold text-[#c8102e] mt-1 tracking-tight">
                {overdueCount} {overdueCount === 1 ? 'Contract' : 'Contracts'}
              </h2>
            </div>
            <div className="h-9 w-9 bg-red-50 rounded-xl flex items-center justify-center text-[#c8102e]">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-[#c8102e] font-semibold mt-3">
            Africa CDC Reserve ($1.85M)
          </p>
        </div>
      </div>

      {/* AR Aging Summary Progress */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Accounts Receivable Aging Distribution
          </h2>
          <span className="text-xs font-semibold text-slate-500">Average DSO: 24 Days</span>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full flex overflow-hidden">
          <div className="bg-emerald-500 h-full" style={{ width: '35%' }} title="Paid: $1.77M (35%)"></div>
          <div className="bg-blue-500 h-full" style={{ width: '30%' }} title="0-30 Days: $1.68M (30%)"></div>
          <div className="bg-amber-500 h-full" style={{ width: '15%' }} title="31-60 Days: $0.48M (15%)"></div>
          <div className="bg-[#c8102e] h-full" style={{ width: '20%' }} title="60+ Days: $1.85M (20%)"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600">Settled ($1.77M)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
            <span className="text-slate-600">Current 0-30d ($1.68M)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            <span className="text-slate-600">31-60d Due ($0.48M)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-[#c8102e]"></span>
            <span className="text-slate-600">60d+ Overdue ($1.85M)</span>
          </div>
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by invoice #, client, or batch items..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e] transition-all"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto">
            {['all', 'paid', 'sent', 'overdue'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {status === 'all' ? 'All Invoices' : status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Client / Institution</th>
                <th className="py-3 px-4">Batch Formulation & Items</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{inv.number}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{inv.customerName}</p>
                    <p className="text-[11px] text-slate-400">Issued: {inv.createdAt}</p>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-medium text-slate-800 truncate">{inv.items[0]?.description}</p>
                    {inv.items.length > 1 && (
                      <p className="text-[10.5px] text-slate-500">+{inv.items.length - 1} additional service items</p>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">{inv.dueDate}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900 text-sm">
                    ${inv.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-0.5 text-[10.5px] font-bold rounded-full border capitalize ${getStatusBadge(inv.status)}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {inv.status !== 'paid' ? (
                      <button
                        onClick={() => handleMarkPaid(inv.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Record Payment
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

      {/* Create Commercial Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in">
          <Card className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-[#c8102e]" />
                <h3 className="text-sm font-bold text-slate-900">Create Commercial Batch Invoice</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Customer / Purchasing Authority</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanzania Medical Stores Department (MSD)"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Batch Formulation / Product Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. mRNA-1273 Vaccine Lot #BP-2026-9901 (100,000 Vials)"
                  value={itemDesc}
                  onChange={e => setItemDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={itemQty}
                    onChange={e => setItemQty(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Unit Price ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="35.00"
                    value={itemPrice}
                    onChange={e => setItemPrice(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Due</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs font-bold text-slate-900 border border-slate-200/80">
                <span>Calculated Invoice Total:</span>
                <span className="text-base text-[#c8102e]">
                  ${((parseFloat(itemQty) || 1) * (parseFloat(itemPrice) || 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-[#c8102e] hover:bg-[#a80e27] text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  Issue Invoice
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
