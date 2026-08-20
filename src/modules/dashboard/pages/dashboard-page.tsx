import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Upload,
  CheckCircle2,
  ArrowUpRight,
  AlertTriangle,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { useFacilityStore } from '../../../shared/stores/facility-store'

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
  { id: 1, title: 'mRNA-1273 Lot #BP-2024-8847 released',      detail: 'Matugga GMP Line 3',              time: '15 min', alert: false },
  { id: 2, title: 'Bioreactor STR-04 temperature excursion',   detail: 'Auto-corrected · monitoring',     time: '1 hr',   alert: true  },
  { id: 3, title: 'Oncology Gene Therapy QC Assay passed',     detail: 'Sterility & potency · Kakiika',   time: '2 hr',   alert: false },
  { id: 4, title: 'LNP Order #1247 cleared incoming QC',       detail: 'Lonza batch cert verified',       time: '3 hr',   alert: false },
  { id: 5, title: 'Pediatric Batch #BP-2026-1090 created',     detail: 'Nakaseke · 50,000 vial run',      time: '4 hr',   alert: false },
]

const scientists = [
  { rank: 1, initials: 'ND', name: 'Nanziri Dianah', role: 'Lead mRNA Scientist',      batches: 42, delta: +4 },
  { rank: 2, initials: 'JB', name: 'Jovic Biralo',   role: 'QA & Compliance Director', batches: 38, delta: +2 },
  { rank: 3, initials: 'GO', name: 'Gibson Oluka',   role: 'Bioreactor Ops Lead',      batches: 35, delta: -1 },
]

export default function DashboardPage() {
  const [activeDay, setActiveDay] = useState<number | null>(4)
  const { getActiveFacility } = useFacilityStore()
  const activeFacility = getActiveFacility()

  const todayData = weeklyBatches[activeDay ?? 4]

  return (
    <div className="space-y-8">

      {/* ── HEADER ─────────────────────────────────────────────────────────
          Rationale: Greeting + ONE action button. Everything else removed.
          Fitts's Law — primary CTA is the only red element in view.
          The greeting establishes context; the subtitle is the only status
          line the user needs before scanning down.
      */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            {activeFacility.name} · Tuesday, Aug 19
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Good morning, Dr. Nakato
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            {activeFacility.headlineStatus || 'Operational monitoring active'}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer">
            <Plus className="h-3.5 w-3.5" />
            New Batch
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-border bg-background hover:bg-muted text-slate-600 text-xs font-semibold rounded-xl transition-all cursor-pointer">
            <Upload className="h-3.5 w-3.5 text-slate-400" />
            QC Report
          </button>
        </div>
      </div>

      {/* ── HERO METRIC + 3 SECONDARY ──────────────────────────────────────
          Rationale: Inverted Pyramid principle (journalism → dashboard design).
          ONE dominant number answers "how are we doing today?" immediately.
          3 supporting numbers sit below it at smaller scale — hierarchy
          through SIZE alone, not color or decoration.
          
          Fitts's Law: the primary metric is the largest element on the page.
          Miller's Law: 4 total numbers (1 hero + 3 secondary) stays within 
          the 7±2 chunk limit for immediate comprehension.
      */}
      <div className="bg-[#f6f5f1] rounded-2xl border border-[#e3e1da] overflow-hidden">
        <div className="grid sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#e3e1da]">

          {/* Hero — weekly batch output */}
          <div className="sm:col-span-1 p-5 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                This Week
              </p>
              <p className="text-4xl font-extrabold text-foreground mt-2 leading-none tracking-tight">
                {weeklyBatches.reduce((s, d) => s + d.completed, 0)}
              </p>
              <p className="text-xs font-semibold text-slate-400 mt-1.5">batches released</p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +8% vs last week
            </div>
          </div>

          {/* 3 supporting KPIs — same card, smaller type */}
          {[
            { label: 'Active Staff',       value: String(activeFacility.staffOnDuty || 847), sub: '100% on duty',           ok: true  },
            { label: 'Monthly Revenue',    value: '$2.45M',                                  sub: '+18.3% vs July',          ok: true  },
            { label: activeFacility.type === 'MANUFACTURING' ? 'Bioreactors Active' : 'Operating Lines', value: `${activeFacility.activeLinesCount || 12}/${activeFacility.activeLinesCount || 12}`, sub: 'Active monitoring', ok: true },
          ].map(item => (
            <div key={item.label} className="p-5 flex flex-col justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.label}</p>
              <div>
                <p className="text-2xl font-extrabold text-foreground mt-2 leading-none tracking-tight">
                  {item.value}
                </p>
                <p className={`text-[11px] font-semibold mt-1.5 ${item.ok ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN GRID ──────────────────────────────────────────────────────
          Rationale: 2/3 + 1/3 asymmetric — primary work area vs. supporting
          feed. Gestalt proximity: related items grouped. The chart is the
          centrepiece — given full 2/3 width and maximum breathing room.
      */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* LEFT 2/3 — Chart + Scientists */}
        <div className="lg:col-span-2 space-y-6">

          {/* BATCH CHART
              Rationale: Interactive bar with click-to-reveal detail.
              Progressive Disclosure (Krug, 2000) — the total is shown on
              hover/click, not always visible. Reduces cognitive load at rest.
              Bars are intentionally minimal — two shades of slate, nothing else.
          */}
          <div className="bg-[#f6f5f1] rounded-2xl border border-[#e3e1da]">
            <div className="px-6 pt-5 pb-0 flex items-start justify-between">
              <div>
                <h2 className="text-sm font-bold text-foreground" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                  Batch Output — This Week
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">GMP Lines 1–12 · click a day to inspect</p>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-[#0e1f17]" /> Released
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-slate-200" /> Pending QC
                </span>
              </div>
            </div>

            <div className="px-6 pb-5 pt-4">
              <div className="flex gap-3 sm:gap-5 items-end" style={{ height: 140 }}>
                {weeklyBatches.map((d, i) => {
                  const isActive = activeDay === i
                  const compH = Math.round((d.completed / maxBatch) * 140)
                  const pendH = Math.round((d.pending   / maxBatch) * 140)
                  return (
                    <div
                      key={d.day}
                      onClick={() => setActiveDay(isActive ? null : i)}
                      className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                    >
                      <span className={`text-[10px] font-bold mb-0.5 transition-opacity ${isActive ? 'opacity-100 text-[#0e1f17]' : 'opacity-0 group-hover:opacity-60 text-slate-500'}`}>
                        {d.completed + d.pending}
                      </span>
                      <div className="w-full flex flex-col justify-end gap-px overflow-hidden rounded-md" style={{ height: 140 }}>
                        <div className={`w-full rounded-t-sm transition-colors ${isActive ? 'bg-slate-300' : 'bg-slate-200 group-hover:bg-slate-300'}`} style={{ height: pendH }} />
                        <div className={`w-full transition-colors ${isActive ? 'bg-[#0e1f17]' : 'bg-slate-300 group-hover:bg-[#0e1f17]/80'}`} style={{ height: compH }} />
                      </div>
                      <span className={`text-[10px] font-bold mt-1 ${isActive ? 'text-[#0e1f17]' : 'text-slate-400'}`}>{d.day}</span>
                    </div>
                  )
                })}
              </div>

              {/* Detail row — visible only when a day is selected */}
              {activeDay !== null && (
                <div className="mt-4 flex items-center justify-between pt-3.5 border-t border-border animate-in fade-in duration-150">
                  <div className="flex items-center gap-5 text-[11px]">
                    <span className="font-extrabold text-foreground uppercase tracking-wider">{todayData.day}</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      {todayData.completed} released
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Clock className="h-3 w-3 text-amber-500" />
                      {todayData.pending} pending
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Total: <strong className="text-foreground">{todayData.completed + todayData.pending}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* LEADERBOARD
              Rationale: Reduced to top 3 only. Research (Festinger, 1954) shows
              social comparison is most effective with 3 reference points —
              adding more dilutes the motivational effect. 
              Rank order through position (Cleveland & McGill, 1984).
              Progress bar width carries the comparison — no numbers needed.
          */}
          <div className="bg-[#f6f5f1] rounded-2xl border border-[#e3e1da]">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-foreground" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                  Lead Scientists
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Batch completions this week</p>
              </div>
              <Link to="/hr" className="text-[11px] font-semibold text-slate-400 hover:text-foreground flex items-center gap-0.5 transition-colors cursor-pointer">
                All staff <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="px-6 py-5 space-y-5">
              {scientists.map((s, i) => (
                <div key={s.rank} className="flex items-center gap-4">
                  <span className="w-4 text-xs font-bold text-slate-200 shrink-0 tabular-nums text-right">
                    {s.rank}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center text-[11px] font-extrabold text-foreground shrink-0">
                    {s.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <p className="text-xs font-bold text-foreground">{s.name}</p>
                      <span className="text-xs font-extrabold text-foreground tabular-nums ml-2">{s.batches}</span>
                    </div>
                    <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-foreground transition-all duration-500"
                        style={{ width: `${(s.batches / scientists[0].batches) * 100}%`, opacity: 1 - i * 0.25 }}
                      />
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold shrink-0 ${s.delta >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {s.delta >= 0 ? `+${s.delta}` : s.delta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT 1/3 — Activity only
            Rationale: The right column is a single focused element.
            Removed "Quick Access" — the sidebar already does navigation.
            Duplication violates Don't Repeat Yourself in UI — it adds visual
            mass without adding information (Tufte, "data-ink ratio", 1983).
        */}
        <div className="bg-[#f6f5f1] rounded-2xl border border-[#e3e1da] overflow-hidden h-fit">
          <div className="px-5 py-4 border-b border-[#e3e1da] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#0e1f17]" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                Activity
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Live facility events</p>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>

          {/*
            Alert item has amber bg — the ONE color break in this column.
            Figure-ground (Gestalt): the amber item "pops" precisely because
            everything else is white. If multiple items were amber, none would.
          */}
          <div className="divide-y divide-border">
            {activities.map(a => (
              <div key={a.id} className={`px-5 py-3.5 ${a.alert ? 'bg-amber-50/60' : 'hover:bg-muted/50'} transition-colors`}>
                <div className="flex items-start gap-2.5">
                  {a.alert
                    ? <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                    : <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-1.5" />
                  }
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-semibold leading-snug ${a.alert ? 'text-amber-900' : 'text-foreground'}`}>
                      {a.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{a.detail}</p>
                    <p className="text-[10px] text-slate-300 mt-1 font-medium">{a.time} ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}