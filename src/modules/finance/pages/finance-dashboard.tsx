import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  ArrowUpRight,
  PlusCircle,
  CheckCircle2,
  BookOpen,
  Receipt,
  FileSpreadsheet,
  ArrowRight,
  Banknote,
  Landmark,
  ShieldCheck,
  Clock,
  AlertCircle,
  Building2,
  BarChart3
} from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'
import { initialExpenses, initialJournalEntries, bankAccounts } from '../data/finance-data'

export default function FinanceDashboard() {
  const [pendingExpenses, setPendingExpenses] = useState(
    initialExpenses.filter(e => e.status === 'pending_approval')
  )

  const handleApprove = (id: string) => setPendingExpenses(prev => prev.filter(e => e.id !== id))
  const handleReject  = (id: string) => setPendingExpenses(prev => prev.filter(e => e.id !== id))

  return (
    <div className="space-y-8">

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            Q3 FY2026 · IFRS & WHO GMP Audit-Ready
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[#0e1f17] leading-none" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Finance & Treasury
          </h1>
          <p className="text-sm text-slate-400 mt-2">Matugga Facility · Vakiso, Uganda</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/finance/reports">
            <Button variant="outline" size="sm" className="text-xs font-semibold h-8 border-[#e3e1da] text-slate-500 cursor-pointer bg-white hover:bg-[#f6f5f1]">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
              Statements
            </Button>
          </Link>
          <Link to="/finance/incomes">
            <Button size="sm" className="bg-[#c8102e] hover:bg-[#a80e27] text-white text-xs font-semibold h-8 shadow-sm cursor-pointer">
              <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
              New Invoice
            </Button>
          </Link>
        </div>
      </div>

      {/* ── HERO + 3 SECONDARY ──────────────────────────────────────────────────
          Rationale: Same hierarchy pattern as the main dashboard.
          The finance question is: "Are we profitable?" → answered by ONE number.
          Net Surplus ($16.25M) is the primary — it synthesises revenue, cost,
          and margin into a single executive signal.
          
          The 3 supporting cells answer the 3 follow-up questions:
          "What came in?" "What went out?" "What's liquid?"
          
          Removing the 4-ratio strip eliminates 4 redundant data points —
          Gross Margin (80.4%) is derivable from Revenue ÷ Cost. Tufte's
          data-ink ratio principle: never show what can be inferred.
      */}
      <div className="bg-white rounded-2xl border border-[#e3e1da] overflow-hidden">
        <div className="grid sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#e3e1da]">

          {/* Hero — Net Surplus */}
          <div className="sm:col-span-1 p-5 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Net Surplus · Q3
              </p>
              <p className="text-4xl font-extrabold text-[#0e1f17] mt-2 leading-none tracking-tight">
                $16.25M
              </p>
              <p className="text-xs font-semibold text-slate-400 mt-1.5">after all costs & depreciation</p>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 mb-1">
                <ArrowUpRight className="h-3.5 w-3.5" />
                71.7% net margin
              </div>
              <div className="w-full h-1 bg-[#f0efeb] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500/40 rounded-full" style={{ width: '71.7%' }} />
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="p-5 flex flex-col justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Gross Revenue</p>
            <div>
              <p className="text-2xl font-extrabold text-[#0e1f17] mt-2 leading-none tracking-tight">$23.3M</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1.5">+20.1% vs Q2</p>
              <p className="text-[10px] text-slate-400 mt-1">Vaccine contracts + CDMO</p>
            </div>
          </div>

          {/* OpEx */}
          <div className="p-5 flex flex-col justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total OpEx</p>
            <div>
              <p className="text-2xl font-extrabold text-[#0e1f17] mt-2 leading-none tracking-tight">$6.6M</p>
              <div className="mt-2">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>$6.6M of $7.2M budget</span>
                  <span className="font-bold text-slate-600">91.7%</span>
                </div>
                <div className="w-full h-1 bg-[#f0efeb] rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: '91.7%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Treasury */}
          <div className="p-5 flex flex-col justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Cash & Treasury</p>
            <div>
              <p className="text-2xl font-extrabold text-[#0e1f17] mt-2 leading-none tracking-tight">$7.13M</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1.5">Liquid · 3 accounts</p>
              <p className="text-[10px] text-slate-400 mt-1">8.1 months runway</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN GRID ────────────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* LEFT 2/3 */}
        <div className="lg:col-span-2 space-y-6">

          {/* MODULE NAV
              Rationale: Stripped to plain text + icon links. The old version
              had icon, label, subtitle, AND a status pip — 4 elements per cell.
              Reduced to 2: icon + label. Status only appears when actionable
              (pending expenses). Rest is inferred from context.
              White space between cells does the visual separation — no divider
              lines needed (Gestalt: proximity).
          */}
          <div className="bg-white rounded-2xl border border-[#e3e1da]">
            <div className="px-6 py-4 border-b border-[#e3e1da]">
              <h2 className="text-sm font-bold text-[#0e1f17]" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>Finance Modules</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3">
              {[
                { to: '/finance/accounts',  icon: Building2,       label: 'Chart of Accounts', warn: false },
                { to: '/finance/incomes',   icon: TrendingUp,      label: 'Incomes',            warn: false },
                { to: '/finance/expenses',  icon: Receipt,         label: 'Expenses',           warn: pendingExpenses.length > 0, warnText: `${pendingExpenses.length} pending` },
                { to: '/finance/journals',  icon: BookOpen,        label: 'General Ledger',     warn: false },
                { to: '/finance/reports',   icon: FileSpreadsheet, label: 'Reports & P&L',      warn: false },
                { to: '/finance/accounts',  icon: ShieldCheck,     label: 'Audit Trail',        warn: false },
              ].map(({ to, icon: Icon, label, warn, warnText }) => (
                <Link
                  key={to + label}
                  to={to}
                  className="p-5 flex items-center gap-3 hover:bg-[#f6f5f1] transition-colors group border-b border-r border-[#e3e1da] last:border-r-0 [&:nth-child(3)]:border-r-0 sm:[&:nth-child(3)]:border-r [&:nth-child(4)]:border-b-0 [&:nth-child(5)]:border-b-0 [&:nth-child(6)]:border-b-0"
                >
                  <div className="h-8 w-8 rounded-xl bg-[#f6f5f1] flex items-center justify-center text-slate-500 group-hover:bg-[#c8102e] group-hover:text-white transition-all duration-200 shrink-0">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#0e1f17] truncate">{label}</p>
                    {warn && warnText && (
                      <p className="text-[10px] font-bold text-amber-600 mt-0.5">{warnText}</p>
                    )}
                  </div>
                  <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* RECENT JOURNAL ENTRIES
              Rationale: Plain list, no icon per row (they're all journal entries —
              the icon carries no new information). Numbering replaces icons.
              Amount is right-aligned — F-pattern scan hits label left, amount right.
              Status colour: emerald = posted (good), amber = draft (needs action).
          */}
          <div className="bg-white rounded-2xl border border-[#e3e1da] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e3e1da] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#0e1f17]" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                  Recent Ledger Entries
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Double-entry · batch lot linked</p>
              </div>
              <Link to="/finance/journals">
                <button className="text-[11px] font-semibold text-slate-400 hover:text-[#0e1f17] flex items-center gap-1 cursor-pointer transition-colors">
                  View all <ArrowRight className="h-3 w-3" />
                </button>
              </Link>
            </div>
            <div className="divide-y divide-[#e3e1da]">
              {initialJournalEntries.map((je, i) => (
                <div key={je.id} className="px-6 py-4 flex items-baseline gap-4 hover:bg-[#f6f5f1] transition-colors">
                  <span className="text-[10px] font-mono text-slate-300 w-4 shrink-0 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#0e1f17] truncate">{je.description}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{je.reference} · {je.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-extrabold text-[#0e1f17]">${je.totalAmount.toLocaleString()}</p>
                    <span className={`text-[10px] font-bold ${je.status === 'posted' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {je.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT 1/3 */}
        <div className="space-y-6">

          {/* AUTHORIZATION QUEUE
              Rationale: This card is actionable — it has the highest information
              value per pixel. Amber badge is the only colored element in this
              column. Two buttons: neutral Reject, dark Authorize.
              Dark = positive action (confirms intent). This inverts the
              conventional "green = confirm" to avoid confusion with
              "green = financially healthy" used elsewhere.
          */}
          <div className="bg-white rounded-2xl border border-[#e3e1da] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#e3e1da] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#0e1f17]" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>Authorization Queue</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Awaiting executive sign-off</p>
              </div>
              {pendingExpenses.length > 0 ? (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                  <Clock className="h-3 w-3" /> {pendingExpenses.length}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <CheckCircle2 className="h-3 w-3" /> Clear
                </span>
              )}
            </div>

            {pendingExpenses.length === 0 ? (
              <div className="px-5 py-10 flex flex-col items-center gap-2 text-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                <p className="text-xs font-bold text-[#0e1f17] mt-1">All sign-offs complete</p>
                <p className="text-[11px] text-slate-400">No pending disbursements</p>
              </div>
            ) : (
              <div className="divide-y divide-[#e3e1da]">
                {pendingExpenses.map(item => (
                  <div key={item.id} className="px-5 py-4">
                    <div className="flex items-start gap-2.5 mb-3">
                      <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#0e1f17] leading-snug">{item.vendor}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{item.description}</p>
                        <p className="text-sm font-extrabold text-[#0e1f17] mt-2">
                          ${item.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReject(item.id)}
                        className="flex-1 h-8 rounded-xl border border-[#e3e1da] text-[11px] font-bold text-slate-500 hover:border-slate-300 hover:bg-[#f6f5f1] transition-all cursor-pointer"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="flex-1 h-8 rounded-xl bg-[#0e1f17] text-[11px] font-bold text-white hover:bg-[#143d1d] transition-all cursor-pointer"
                      >
                        Authorize
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CASH POSITION — compact, no sparklines */}
          <div className="bg-white rounded-2xl border border-[#e3e1da] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#e3e1da]">
              <h2 className="text-sm font-bold text-[#0e1f17]" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>Cash Position</h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Live bank balances</p>
            </div>
            <div className="px-5 py-4 space-y-4">
              {bankAccounts.map(b => (
                <div key={b.id}>
                  <div className="flex items-end justify-between mb-1.5">
                    <div>
                      <p className="text-[11px] font-bold text-[#0e1f17]">{b.bankName}</p>
                      <p className="text-[10px] text-slate-400">{b.currency} · {b.accountType}</p>
                    </div>
                    <p className="text-[11px] font-extrabold text-[#0e1f17] tabular-nums">
                      {b.balance.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-full h-1 bg-[#f0efeb] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-300"
                      style={{ width: `${Math.min((b.balance / 12000000) * 100, 100).toFixed(0)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GMP STATUS — dark anchor card, same as dashboard */}
          <div className="bg-[#0e1f17] rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-slate-300" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">GMP Audit Status</p>
                <p className="text-[10px] text-slate-400 mt-0.5">WHO Prequalification</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Financial Records',    val: 'Compliant' },
                { label: 'Annex 11 Electronic',  val: 'Verified'  },
                { label: 'Batch Cost Tracing',   val: 'Active'    },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{item.label}</span>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}