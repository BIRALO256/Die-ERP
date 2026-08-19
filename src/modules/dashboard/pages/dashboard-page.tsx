import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  UserCheck,
  Upload,
  FileText,
  Users,
  DollarSign,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Microscope,
  AlertTriangle,
  Clock,
  Activity,
  ChevronRight,
  Thermometer,
  FlaskConical,
  Beaker,
  ShieldCheck
} from 'lucide-react'

// ─── DATA ─────────────────────────────────────────────────────────────────────
const weeklyBatches = [
  { day: 'Mon', completed: 9,  pending: 3 },
  { day: 'Tue', completed: 7,  pending: 4 },
  { day: 'Wed', completed: 11, pending: 2 },
  { day: 'Thu', completed: 12, pending: 3 },
  { day: 'Fri', completed: 13, pending: 2 },
  { day: 'Sat', completed: 11, pending: 3 },
  { day: 'Sun', completed: 8,  pending: 2 },
]
const maxBatch = Math.max(...weeklyBatches.map(d => d.completed + d.pending))

const activities = [
  { id: 1, title: 'mRNA-1273 Lot #BP-2024-8847 released',     detail: 'QC release · Matugga GMP Line 3',              time: '15 min ago', alert: false, icon: CheckCircle2 },
  { id: 2, title: 'Bioreactor STR-04 temperature excursion',  detail: 'Alert · 37.8°C vs 36.5°C spec — auto-corrected', time: '1 hr ago',   alert: true,  icon: Thermometer  },
  { id: 3, title: 'Oncology Gene Therapy QC Assay passed',    detail: 'Sterility & potency confirmed · Kakiika',        time: '2 hr ago',   alert: false, icon: FlaskConical  },
  { id: 4, title: 'LNP Order #1247 cleared incoming QC',      detail: 'Lipid nanoparticles · Lonza batch cert verified', time: '3 hr ago',   alert: false, icon: Beaker        },
  { id: 5, title: 'Pediatric Batch #BP-2026-1090 created',    detail: 'Nakaseke facility · 50,000 vial run',            time: '4 hr ago',   alert: false, icon: Plus          },
]

const scientists = [
  { rank: 1, initials: 'ND', name: 'Nanziri Dianah', role: 'Lead mRNA Scientist',      batches: 42, delta: +4 },
  { rank: 2, initials: 'JB', name: 'Jovic Biralo',   role: 'QA & Compliance Director', batches: 38, delta: +2 },
  { rank: 3, initials: 'GO', name: 'Gibson Oluka',   role: 'Bioreactor Ops Lead',      batches: 35, delta: -1 },
  { rank: 4, initials: 'AM', name: 'Amina Mutenyo',  role: 'Regulatory Affairs Lead',  batches: 29, delta: +3 },
]

export default function DashboardPage() {
  const [activeDay, setActiveDay] = useState<number | null>(4)

  return (
    <div className="space-y-6">

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
            Good morning, Dr. Nakato 👋
          </h1>
          <p className="text-[13px] text-slate-400 mt-1.5">
            Matugga GMP Plant · Tuesday, Aug 19 ·{' '}
            {/* Emerald used ONLY here because it is a genuine operational status */}
            <span className="text-emerald-600 font-semibold">All 12 bioreactors running</span>
          </p>
        </div>

        {/* Actions: one red primary, rest are plain borders — Fitts's Law priority */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-[#c8102e] hover:bg-[#a80e27] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer">
            <Plus className="h-3.5 w-3.5" />
            New Batch
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer">
            <UserCheck className="h-3.5 w-3.5 text-slate-400" />
            Assign Task
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer">
            <Upload className="h-3.5 w-3.5 text-slate-400" />
            QC Report
          </button>
        </div>
      </div>

      {/* ── FACILITY STATUS STRIP ───────────────────────────────────────────
          Dots: green = all clear, amber = needs attention.
          Everything else stays slate. No blue, no teal, no purple.
      */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-100 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {[
          { label: 'GMP Lines Active', value: '1–12', note: 'All lines running',     dot: 'ok'   },
          { label: 'Sterility Alerts', value: '0',    note: 'Clean last 30 days',    dot: 'ok'   },
          { label: 'Cold Chain',       value: '-80°C', note: '±0.2°C deviation',     dot: 'ok'   },
          { label: 'Open QC Issues',   value: '1',    note: 'STR-04 auto-corrected', dot: 'warn' },
        ].map(item => (
          <div key={item.label} className="px-5 py-3.5 flex items-start gap-3">
            <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.dot === 'ok' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.label}</p>
              <p className="text-2xl font-extrabold text-slate-900 leading-tight mt-0.5">{item.value}</p>
              <p className={`text-[11px] font-medium mt-0.5 ${item.dot === 'warn' ? 'text-amber-600' : 'text-slate-400'}`}>{item.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── KPI CARDS ───────────────────────────────────────────────────────
          All icons are slate-500 on slate-100 backgrounds.
          Green appears ONLY on positive delta text.
          Amber appears ONLY on the bioreactor warning card.
          No blue, no brand red, no purple on icons.
      */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'Batch Instructions',
            value: '4',
            sub: '1 pending release · 0 under review',
            delta: 'All within SLA',
            positive: true,
            icon: FileText,
            bar: 75
          },
          {
            label: 'Active Research Staff',
            value: '847',
            sub: '847 of 847 on duty',
            delta: '100% attendance today',
            positive: true,
            icon: Users,
            bar: 100
          },
          {
            label: 'Monthly Revenue',
            value: '$2.45M',
            sub: 'August to date · target $2.6M',
            delta: '+18.3% vs July',
            positive: true,
            icon: DollarSign,
            bar: 94
          },
          {
            label: 'Active Bioreactors',
            value: '12 / 12',
            sub: 'STR-04 excursion auto-corrected',
            delta: '1 deviation — monitoring',
            positive: false,
            icon: Activity,
            bar: 100
          },
        ].map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col gap-3 hover:shadow-sm hover:border-slate-300 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Icon className="h-3.5 w-3.5 text-slate-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{card.label}</span>
                </div>
              </div>

              <div>
                <p className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">{card.value}</p>
                <p className="text-[11px] text-slate-400 mt-1.5">{card.sub}</p>
              </div>

              {/* Delta — only two colors here: emerald positive, amber for "needs watch" */}
              <p className={`text-[11px] font-bold flex items-center gap-1 ${card.positive ? 'text-emerald-600' : 'text-amber-600'}`}>
                {card.positive ? <ArrowUpRight className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                {card.delta}
              </p>

              {/* Bar — monochrome, proportional only */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-slate-400 transition-all duration-500" style={{ width: `${card.bar}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* ── MAIN GRID ───────────────────────────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-3">

        {/* LEFT 2/3 */}
        <div className="lg:col-span-2 space-y-5">

          {/* BATCH OUTPUT CHART
              Bars: slate-800 = completed, slate-300 = pending QC.
              Active day uses slate-900 (darker) for completed, slate-400 for pending.
              No green, no yellow — position and saturation carry the meaning.
          */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-slate-400" />
                  <h2 className="text-sm font-bold text-slate-900">Weekly Batch Output</h2>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">GMP Lines 1–12 · Click a day for detail</p>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-700" /> Released
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-300" /> Pending QC
                </span>
              </div>
            </div>

            <div className="px-6 pb-5 pt-4">
              <div className="flex gap-2 sm:gap-4 items-end" style={{ height: 160 }}>
                {weeklyBatches.map((d, i) => {
                  const isActive = activeDay === i
                  const totalPx  = 160
                  const compH    = Math.round((d.completed / maxBatch) * totalPx)
                  const pendH    = Math.round((d.pending   / maxBatch) * totalPx)

                  return (
                    <div
                      key={d.day}
                      className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                      onClick={() => setActiveDay(isActive ? null : i)}
                    >
                      <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded mb-1 transition-all ${isActive ? 'bg-slate-900 text-white' : 'opacity-0 group-hover:opacity-100 bg-slate-100 text-slate-600'}`}>
                        {d.completed + d.pending}
                      </div>
                      <div className="w-full flex flex-col justify-end gap-px rounded overflow-hidden" style={{ height: totalPx }}>
                        <div className={`w-full rounded-t-sm transition-all duration-300 ${isActive ? 'bg-slate-300' : 'bg-slate-200 group-hover:bg-slate-300'}`} style={{ height: pendH }} />
                        <div className={`w-full transition-all duration-300 ${isActive ? 'bg-slate-800' : 'bg-slate-300 group-hover:bg-slate-700'}`} style={{ height: compH }} />
                      </div>
                      <span className={`text-[11px] font-bold mt-1.5 transition-colors ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{d.day}</span>
                    </div>
                  )
                })}
              </div>

              {activeDay !== null && (
                <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="flex gap-4">
                    <span className="font-bold text-slate-700">{weeklyBatches[activeDay].day}</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      {weeklyBatches[activeDay].completed} released
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Clock className="h-3 w-3 text-amber-500" />
                      {weeklyBatches[activeDay].pending} pending
                    </span>
                  </div>
                  <span className="text-slate-400">
                    Total: <strong className="text-slate-800">{weeklyBatches[activeDay].completed + weeklyBatches[activeDay].pending}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* LEADERBOARD */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Microscope className="h-4 w-4 text-slate-400" />
                  <h2 className="text-sm font-bold text-slate-900">Lead Scientists · This Week</h2>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Batch completions · ↑↓ vs last week</p>
              </div>
              <Link to="/hr/employees" className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-0.5 cursor-pointer transition-colors">
                Full roster <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="px-6 py-4 space-y-4">
              {scientists.map(s => (
                <div key={s.rank} className="flex items-center gap-4">
                  <span className="w-5 text-[11px] font-bold text-slate-300 tabular-nums shrink-0">#{s.rank}</span>
                  {/* All avatars: slate backgrounds — no red/green/blue avatar rings */}
                  <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-extrabold text-xs text-slate-700 shrink-0">
                    {s.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold text-slate-900">{s.name}</p>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-xs font-extrabold text-slate-800 tabular-nums">{s.batches}</span>
                        {/* Delta: emerald up, amber down — semantic only */}
                        <span className={`text-[10px] font-bold ${s.delta >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {s.delta >= 0 ? `+${s.delta}` : s.delta}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mb-1.5">{s.role}</p>
                    {/* Bar: all slate, proportional to top performer */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-slate-400 transition-all duration-500"
                        style={{ width: `${(s.batches / scientists[0].batches) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT 1/3 */}
        <div className="space-y-5">

          {/* ACTIVITY FEED
              Alert event: gets a faint bg-amber-50 background AND amber icon.
              That's it — no other color differentiation needed.
          */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Live Activity</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Real-time facility events</p>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {activities.map(a => {
                const Icon = a.icon
                return (
                  <div key={a.id} className={`px-5 py-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors ${a.alert ? 'bg-amber-50/40' : ''}`}>
                    <div className={`h-7 w-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${a.alert ? 'bg-amber-100' : 'bg-slate-100'}`}>
                      <Icon className={`h-3.5 w-3.5 ${a.alert ? 'text-amber-600' : 'text-slate-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold leading-snug ${a.alert ? 'text-amber-900' : 'text-slate-900'}`}>{a.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{a.detail}</p>
                      <p className="text-[10px] text-slate-300 font-medium mt-1">{a.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* QUICK ACCESS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Quick Access</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { to: '/finance',     icon: DollarSign, label: 'Finance & Treasury', sub: '$23.3M Q3 · live' },
                { to: '/hr',          icon: Users,       label: 'HR & Workforce',     sub: '847 active staff' },
                { to: '/procurement', icon: ShieldCheck, label: 'Procurement',        sub: '2 POs pending' },
              ].map(({ to, icon: Icon, label, sub }) => (
                <Link key={to} to={to} className="px-5 py-3.5 flex items-center gap-3 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="h-7 w-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#c8102e] group-hover:text-white transition-all duration-200 shrink-0">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900">{label}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}