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

// ─── MICRO SPARKLINE ─────────────────────────────────────────────────────────
// Monochromatic bars — color is not used here because these charts are
// contextual, not categorical. Using a single slate tone prevents the chart
// from competing with the primary data point above it.
function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values)
  return (
    <div className="flex items-end gap-[3px] h-7">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${(v / max) * 100}%`,
            backgroundColor: i === values.length - 1 ? '#0f172a' : '#e2e8f0'
          }}
        />
      ))}
    </div>
  )
}

const revenueSparkline = [12.4, 14.1, 13.8, 16.2, 17.5, 19.1, 23.3]
const cashSparkline    = [3.1,  4.5,  5.8,  4.2,  6.1,  6.9,  7.13]

export default function FinanceDashboard() {
  const [pendingExpenses, setPendingExpenses] = useState(
    initialExpenses.filter(e => e.status === 'pending_approval')
  )

  const handleApprove = (id: string) => setPendingExpenses(prev => prev.filter(e => e.id !== id))
  const handleReject  = (id: string) => setPendingExpenses(prev => prev.filter(e => e.id !== id))

  return (
    <div className="space-y-6">

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
              Finance & Treasury
            </h1>
            {/* Single semantic badge — green only because it confirms positive operational status */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Q3 FY2026 · Live
            </span>
          </div>
          <p className="mt-1.5 text-[13px] text-slate-400">
            Matugga Facility · IFRS & WHO GMP audit-ready financials
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link to="/finance/reports">
            <Button variant="outline" size="sm" className="text-xs font-semibold h-8 border-slate-200 text-slate-600 cursor-pointer">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
              Statements
            </Button>
          </Link>
          {/* Red CTA — the ONLY red element on this page besides alerts */}
          <Link to="/finance/incomes">
            <Button size="sm" className="bg-[#c8102e] hover:bg-[#a80e27] text-white text-xs font-semibold h-8 shadow-sm cursor-pointer">
              <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
              New Invoice
            </Button>
          </Link>
        </div>
      </div>

      {/* ── FISCAL RATIOS STRIP ──────────────────────────────────────────
          All text is slate. Green arrows appear ONLY on positive deltas —
          that semantic distinction requires restraint everywhere else.
          (Dual Coding Theory, Paivio 1971: color encodes category, not style.)
      */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-100 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {[
          { label: 'Gross Margin', value: '80.4%', delta: 'vs 74.1% last Q', up: true  },
          { label: 'Net Margin',   value: '71.7%', delta: 'vs 66.3% last Q', up: true  },
          { label: 'Burn Rate',    value: '$880K', delta: 'per month OpEx',  up: null  },
          { label: 'Runway',       value: '8.1 mo',delta: 'at current burn', up: null  }
        ].map(item => (
          <div key={item.label} className="px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.label}</p>
            <p className="text-2xl font-extrabold text-slate-900 leading-none mt-1.5">{item.value}</p>
            <p className={`text-[11px] font-semibold mt-1 flex items-center gap-1 ${item.up === true ? 'text-emerald-600' : 'text-slate-400'}`}>
              {item.up === true && <ArrowUpRight className="h-3 w-3" />}
              {item.delta}
            </p>
          </div>
        ))}
      </div>

      {/* ── PRIMARY KPI CARDS ────────────────────────────────────────────
          Icons: all slate — no colored icon backgrounds.
          Color only appears on delta arrows (green = positive, nothing for neutral).
          The sparkline uses slate-100 for past bars, slate-900 for latest bar.
          This focuses attention on the most recent data point automatically.
      */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Revenue */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center">
                <TrendingUp className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Gross Revenue</span>
            </div>
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="h-3 w-3" />+20.1%
            </span>
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">$23.3M</p>
            <p className="text-[11px] text-slate-400 mt-1">Vaccine contracts + CDMO · Q3 FY2026</p>
          </div>
          <Sparkline values={revenueSparkline} />
          <div className="flex justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-slate-400">Q2 was $19.4M</span>
            <span className="font-bold text-slate-700">Target: $24M</span>
          </div>
        </div>

        {/* OpEx */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center">
                <Receipt className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total OpEx</span>
            </div>
            <span className="text-[11px] font-bold text-slate-400">+4.2% MoM</span>
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">$6.6M</p>
            <p className="text-[11px] text-slate-400 mt-1">Cleanroom + materials + logistics</p>
          </div>
          {/* Budget bar — slate to avoid misreading red as "danger". 
              Amber only appears if over-budget (currently under). */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-slate-500 h-full rounded-full" style={{ width: '91.7%' }} />
          </div>
          <div className="flex justify-between text-[11px] pt-0.5 border-t border-slate-100">
            <span className="text-slate-400">$6.6M of $7.2M cap</span>
            <span className="font-bold text-slate-600">91.7% used</span>
          </div>
        </div>

        {/* Net Surplus */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center">
                <Banknote className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Net Surplus</span>
            </div>
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="h-3 w-3" />71.7%
            </span>
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">$16.25M</p>
            <p className="text-[11px] text-slate-400 mt-1">After depreciation · IFRS</p>
          </div>
          {/* Revenue mix — stripped of color coding, uses weight instead */}
          <div className="space-y-1.5 pt-1 border-t border-slate-100">
            {[
              { label: 'MoH Uganda',  pct: 53 },
              { label: 'KEMSA Kenya', pct: 22 },
              { label: 'CDMO',        pct: 15 },
              { label: 'Africa CDC',  pct: 10 },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2 text-[11px]">
                <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-slate-700 h-full rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
                <span className="text-slate-500 w-24 text-right">{s.label} {s.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Treasury */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center">
                <Landmark className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Treasury</span>
            </div>
            {/* Emerald only because this is genuinely positive status */}
            <span className="text-[11px] font-bold text-emerald-600">Healthy</span>
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">$7.13M</p>
            <p className="text-[11px] text-slate-400 mt-1">Liquid across 3 accounts</p>
          </div>
          <Sparkline values={cashSparkline} />
          <div className="space-y-1 pt-1 border-t border-slate-100">
            {bankAccounts.slice(0, 2).map(b => (
              <div key={b.id} className="flex justify-between text-[11px]">
                <span className="text-slate-400">{b.bankName}</span>
                <span className="font-bold text-slate-700">{b.currency} {b.balance.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN GRID ───────────────────────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-3">

        {/* LEFT 2/3 */}
        <div className="lg:col-span-2 space-y-5">

          {/* MODULE NAV — no colored metric pips, status encoded in text weight only.
              Hover reveals brand red — one surprise moment is more memorable
              than a constant rainbow (Von Restorff Effect, 1933). */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Finance Modules</h2>
              <span className="text-[11px] text-slate-400">Click to navigate</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-slate-100">
              {[
                { to: '/finance/accounts',  icon: Building2,      label: 'Chart of Accounts', sub: 'Ledger 1010–6020',    meta: '12 accounts' },
                { to: '/finance/incomes',   icon: TrendingUp,     label: 'Incomes',            sub: '4 active contracts',  meta: '$23.3M Q3' },
                { to: '/finance/expenses',  icon: Receipt,        label: 'Expenses',           sub: 'OpEx & CapEx',        meta: `${pendingExpenses.length} pending`, warn: pendingExpenses.length > 0 },
                { to: '/finance/journals',  icon: BookOpen,       label: 'General Ledger',     sub: 'Double-entry audit',  meta: '3 entries' },
                { to: '/finance/reports',   icon: FileSpreadsheet,label: 'Reports & P&L',      sub: 'IFRS statements',     meta: 'GMP Ready' },
                { to: '/finance/accounts',  icon: ShieldCheck,    label: 'Audit Trail',        sub: 'WHO Annex 11 log',    meta: 'Compliant' },
              ].map(({ to, icon: Icon, label, sub, meta, warn }) => (
                <Link
                  key={to + label}
                  to={to}
                  className="p-4 hover:bg-slate-50 transition-colors group flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#c8102e] group-hover:text-white transition-all duration-200">
                      <Icon className="h-4 w-4" />
                    </div>
                    <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all mt-1" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{label}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>
                  </div>
                  {/* Amber only if genuinely actionable (pending items) */}
                  <span className={`self-start text-[10px] font-bold ${warn ? 'text-amber-600' : 'text-slate-400'}`}>
                    {meta}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* RECENT JOURNAL ENTRIES */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Recent Ledger Entries</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Double-entry · batch lot linked</p>
              </div>
              <Link to="/finance/journals">
                <button className="text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors">
                  View all <ArrowRight className="h-3 w-3" />
                </button>
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {initialJournalEntries.map((je, i) => (
                <div key={je.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <span className="text-[11px] font-mono text-slate-300 w-5 shrink-0 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <BookOpen className="h-3.5 w-3.5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{je.description}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{je.reference} · {je.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-extrabold text-slate-900">${je.totalAmount.toLocaleString()}</p>
                    {/* Green only for confirmed posted status, never decorative */}
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
        <div className="space-y-5">

          {/* AUTHORIZATION QUEUE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Authorization Queue</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Awaiting sign-off</p>
              </div>
              {/* Amber badge — one of the only two alert colors in the entire app */}
              {pendingExpenses.length > 0 ? (
                <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                  <Clock className="h-3 w-3" />
                  {pendingExpenses.length}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <CheckCircle2 className="h-3 w-3" />
                  Clear
                </span>
              )}
            </div>

            {pendingExpenses.length === 0 ? (
              <div className="px-4 py-10 flex flex-col items-center gap-2 text-center">
                <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                <p className="text-xs font-bold text-slate-700 mt-1">All sign-offs complete</p>
                <p className="text-[11px] text-slate-400">No pending disbursements</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {pendingExpenses.map(item => (
                  <div key={item.id} className="px-4 py-4">
                    <div className="flex items-start gap-2.5 mb-3">
                      <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 leading-snug">{item.vendor}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{item.description}</p>
                        <p className="text-sm font-extrabold text-slate-900 mt-1.5">
                          ${item.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReject(item.id)}
                        className="flex-1 h-8 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="flex-1 h-8 rounded-xl bg-slate-900 text-[11px] font-bold text-white hover:bg-slate-800 transition-all cursor-pointer"
                      >
                        Authorize
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CASH POSITION */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-4 py-3.5 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Cash Position</h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Live bank balances</p>
            </div>
            <div className="px-4 py-4 space-y-4">
              {bankAccounts.map(b => (
                <div key={b.id}>
                  <div className="flex items-end justify-between mb-1.5">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{b.bankName}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{b.currency} Account</p>
                    </div>
                    <p className="text-xs font-extrabold text-slate-900">
                      {b.balance.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-400"
                      style={{ width: `${Math.min((b.balance / 12000000) * 100, 100).toFixed(0)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GMP STATUS — dark card is the visual anchor, used sparingly.
              Dark backgrounds reserved for "critical infrastructure" status
              so the eye naturally rests here last (closure principle). */}
          <div className="bg-slate-900 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-slate-300" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">GMP Audit Status</p>
                <p className="text-[11px] text-slate-400 mt-0.5">WHO Prequalification</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Financial Records', val: 'Compliant' },
                { label: 'Annex 11 Electronic', val: 'Verified' },
                { label: 'Batch Cost Tracing', val: 'Active' }
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