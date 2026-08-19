import { useState } from 'react'
import { 
  BookOpen, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronRight, 
  X,
  ShieldCheck
} from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'
import { Card } from '../../../shared/components/ui/card'
import { initialJournalEntries, initialAccounts } from '../data/finance-data'
import type { JournalEntry } from '../types'

export default function JournalsPage() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(initialJournalEntries)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [expandedEntryId, setExpandedEntryId] = useState<string | null>('je-2026-001')
  const [showAddModal, setShowAddModal] = useState(false)

  // Form State for New Journal Entry
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [debitAccountId, setDebitAccountId] = useState(initialAccounts[1].id)
  const [debitAmount, setDebitAmount] = useState('')
  const [creditAccountId, setCreditAccountId] = useState(initialAccounts[8].id)
  const [creditAmount, setCreditAmount] = useState('')

  // Calculations
  const totalVolume = journalEntries.reduce((sum, je) => sum + je.totalAmount, 0)
  const postedEntries = journalEntries.filter(je => je.status === 'posted').length
  const draftEntries = journalEntries.filter(je => je.status === 'draft').length

  const filteredEntries = journalEntries.filter(je => {
    const matchesSearch = je.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          je.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          je.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || je.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleExpand = (id: string) => {
    setExpandedEntryId(expandedEntryId === id ? null : id)
  }

  // Handle Post Journal Entry
  const handleCreateJournalEntry = (e: React.FormEvent) => {
    e.preventDefault()
    const deb = parseFloat(debitAmount) || 0
    const cred = parseFloat(creditAmount) || 0

    if (!description || deb <= 0 || deb !== cred) return

    const debitAcc = initialAccounts.find(a => a.id === debitAccountId) || initialAccounts[0]
    const creditAcc = initialAccounts.find(a => a.id === creditAccountId) || initialAccounts[1]

    const newJE: JournalEntry = {
      id: `je-${Date.now()}`,
      reference: `JE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      description,
      date,
      totalAmount: deb,
      currency: 'USD',
      status: 'posted',
      createdBy: 'Jovic Biralo (Finance Lead)',
      approvedBy: 'Dr. Sarah Nakato (Director)',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      entries: [
        {
          id: `jel-${Date.now()}-1`,
          accountId: debitAcc.id,
          account: debitAcc,
          description: `Debit: ${description}`,
          debit: deb,
          credit: 0
        },
        {
          id: `jel-${Date.now()}-2`,
          accountId: creditAcc.id,
          account: creditAcc,
          description: `Credit: ${description}`,
          debit: 0,
          credit: cred
        }
      ]
    }

    setJournalEntries([newJE, ...journalEntries])
    setExpandedEntryId(newJE.id)
    setShowAddModal(false)
    // Reset
    setDescription('')
    setDebitAmount('')
    setCreditAmount('')
  }

  const debNum = parseFloat(debitAmount) || 0
  const credNum = parseFloat(creditAmount) || 0
  const isBalanced = debNum > 0 && debNum === credNum

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="medical-title">General Ledger & Journals</h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#143d1d]/10 text-[#166534] border border-[#143d1d]/20">
              Double-Entry Audit Trail
            </span>
          </div>
          <p className="medical-body mt-1 text-xs sm:text-sm text-slate-500">
            Immutable financial event log, debit & credit balancing, and batch lot traceability
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button
            onClick={() => setShowAddModal(true)}
            size="sm"
            className="bg-[#c8102e] hover:bg-[#a80e27] text-white text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Post Journal Entry
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Ledger Volume */}
        <div className="pharmacy-stat-card border border-slate-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="medical-caption uppercase tracking-wider text-slate-500">Total Journal Volume</p>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
                ${(totalVolume / 1000000).toFixed(2)}M
              </h2>
            </div>
            <div className="h-9 w-9 bg-emerald-50 rounded-xl flex items-center justify-center text-[#166534]">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-[#166534] font-semibold mt-3 flex items-center">
            Double-entry balanced 100%
          </p>
        </div>

        {/* Posted Entries */}
        <div className="pharmacy-stat-card border border-slate-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="medical-caption uppercase tracking-wider text-slate-500">Posted & Verified</p>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
                {postedEntries} Entries
              </h2>
            </div>
            <div className="h-9 w-9 bg-slate-100 rounded-xl flex items-center justify-center text-[#143d1d]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-3">
            Locked in Immutable Audit Trail
          </p>
        </div>

        {/* Draft Entries */}
        <div className="pharmacy-stat-card border border-slate-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="medical-caption uppercase tracking-wider text-slate-500">Draft Adjustments</p>
              <h2 className="text-2xl font-extrabold text-amber-800 mt-1 tracking-tight">
                {draftEntries} Entry
              </h2>
            </div>
            <div className="h-9 w-9 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-amber-700 font-semibold mt-3">
            Sartorius Bioreactor Capitalization
          </p>
        </div>

        {/* Audit Compliance */}
        <div className="pharmacy-stat-card border border-slate-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="medical-caption uppercase tracking-wider text-slate-500">Audit Status</p>
              <h2 className="text-2xl font-extrabold text-emerald-800 mt-1 tracking-tight">
                WHO / GMP
              </h2>
            </div>
            <div className="h-9 w-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-emerald-700 font-semibold mt-3">
            Compliant with Annex 11
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by journal reference, description, creator..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e] transition-all"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto">
          {['all', 'posted', 'draft'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {status === 'all' ? 'All Entries' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Journal Entries Accordion List */}
      <div className="space-y-3">
        {filteredEntries.map(je => {
          const isExpanded = expandedEntryId === je.id
          const totalDebit = je.entries.reduce((sum, el) => sum + el.debit, 0)
          const totalCredit = je.entries.reduce((sum, el) => sum + el.credit, 0)

          return (
            <div key={je.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all">
              {/* Header Row */}
              <div 
                onClick={() => toggleExpand(je.id)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <button className="p-1 rounded-lg hover:bg-slate-200/70 text-slate-400">
                    {isExpanded ? <ChevronDown className="h-4 w-4 text-slate-700" /> : <ChevronRight className="h-4 w-4" />}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-xs text-slate-900">{je.reference}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border uppercase ${
                        je.status === 'posted' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {je.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">{je.description}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Date: {je.date} • Created by {je.createdBy} {je.approvedBy && `• Approved by ${je.approvedBy}`}
                    </p>
                  </div>
                </div>

                <div className="text-right sm:pr-2">
                  <p className="text-sm font-extrabold text-slate-900">
                    ${je.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[10.5px] font-semibold text-emerald-700">Balanced (Debits = Credits)</p>
                </div>
              </div>

              {/* Expanded Double-Entry Breakdown Table */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-4 animate-in fade-in duration-150">
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100/80 text-slate-600 font-bold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">Account Code & Name</th>
                          <th className="py-2.5 px-3">Line Description</th>
                          <th className="py-2.5 px-3 text-right">Debit ($)</th>
                          <th className="py-2.5 px-3 text-right">Credit ($)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {je.entries.map(line => (
                          <tr key={line.id} className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-3">
                              <span className="font-mono font-bold text-slate-800 mr-2">{line.account.code}</span>
                              <span className="text-slate-900 font-medium">{line.account.name}</span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">{line.description}</td>
                            <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                              {line.debit > 0 ? `$${line.debit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-'}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                              {line.credit > 0 ? `$${line.credit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-slate-100/60 font-bold border-t border-slate-200 text-slate-900">
                        <tr>
                          <td colSpan={2} className="py-2.5 px-3 text-right uppercase tracking-wider text-[11px] text-slate-500">
                            Total Balanced Ledger:
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-emerald-800">
                            ${totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-emerald-800">
                            ${totalCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Post Journal Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in">
          <Card className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-[#c8102e]" />
                <h3 className="text-sm font-bold text-slate-900">Post Double-Entry Journal Entry</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateJournalEntry} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Journal Entry Description / Memo</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Batch Lot #BP-2026-9901 Direct Materials Allocation"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Effective Accounting Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]"
                />
              </div>

              {/* Debit Line */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Debit Entry (Dr.)</span>
                  <span className="text-[11px] text-slate-500 font-medium">Increases Assets / Expenses</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <select
                      value={debitAccountId}
                      onChange={e => setDebitAccountId(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20"
                    >
                      {initialAccounts.map(acc => (
                        <option key={acc.id} value={acc.id}>{acc.code} - {acc.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="number"
                      required
                      placeholder="Debit Amount ($)"
                      value={debitAmount}
                      onChange={e => setDebitAmount(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Credit Line */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Credit Entry (Cr.)</span>
                  <span className="text-[11px] text-slate-500 font-medium">Increases Liabilities / Revenues</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <select
                      value={creditAccountId}
                      onChange={e => setCreditAccountId(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20"
                    >
                      {initialAccounts.map(acc => (
                        <option key={acc.id} value={acc.id}>{acc.code} - {acc.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="number"
                      required
                      placeholder="Credit Amount ($)"
                      value={creditAmount}
                      onChange={e => setCreditAmount(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Balance Validation Bar */}
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                isBalanced ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                <span>Balance Verification:</span>
                <span>
                  {isBalanced 
                    ? `✓ Balanced: $${debNum.toLocaleString()} = $${credNum.toLocaleString()}` 
                    : `⚠️ Unbalanced: Dr. $${debNum.toLocaleString()} vs Cr. $${credNum.toLocaleString()}`}
                </span>
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
                  disabled={!isBalanced}
                  size="sm"
                  className="bg-[#c8102e] hover:bg-[#a80e27] text-white text-xs font-semibold disabled:opacity-50"
                >
                  Post to General Ledger
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
