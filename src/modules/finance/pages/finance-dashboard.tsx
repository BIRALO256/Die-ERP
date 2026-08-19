import {
  DollarSign,
  TrendingUp,
  CreditCard,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  Download,
  Filter
} from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'

export default function FinanceDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="medical-title">Financial Operations & Treasury</h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#143d1d]/10 text-[#166534] dark:text-[#4ade80] border border-[#143d1d]/20">
              Q3 FY2026 Fiscal
            </span>
          </div>
          <p className="medical-body mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Enterprise ledger, clinical batch invoicing, capital expenditures & liquidity overview
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button
            variant="outline"
            size="sm"
            className="text-xs font-semibold border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            <Download className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
            Export Ledger
          </Button>
          <Button
            size="sm"
            className="bg-[#c8102e] hover:bg-[#a80e27] text-white text-xs font-semibold shadow-xs"
          >
            <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <div className="pharmacy-stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="medical-caption uppercase tracking-wider text-slate-500">Gross Revenue</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                $245,231
              </h2>
            </div>
            <div className="h-9 w-9 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg flex items-center justify-center text-[#166534] dark:text-[#4ade80]">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1 font-semibold text-[#166534] dark:text-[#4ade80]">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+20.1% vs last month</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#166534] h-full rounded-full w-[85%]"></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="pharmacy-stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="medical-caption uppercase tracking-wider text-slate-500">Total OPEX & Materials</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                $54,231
              </h2>
            </div>
            <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-[#c8102e]">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1 font-semibold text-slate-600 dark:text-slate-400">
              <span>+4.2% within budget</span>
            </div>
            <span className="text-slate-400 text-[11px]">Cap: $65K</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#c8102e] h-full rounded-full w-[60%]"></div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="pharmacy-stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="medical-caption uppercase tracking-wider text-slate-500">Net Operating Income</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                $191,000
              </h2>
            </div>
            <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-[#143d1d] dark:text-[#22c55e]">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1 font-semibold text-[#166534] dark:text-[#4ade80]">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>77.8% Net Margin</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#143d1d] dark:bg-[#22c55e] h-full rounded-full w-[78%]"></div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="pharmacy-stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="medical-caption uppercase tracking-wider text-slate-500">Cash Reserves & Liquid</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                $89,432
              </h2>
            </div>
            <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-300">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-300 font-medium">Standard Chartered & Stanbic</span>
            <span className="text-emerald-600 font-semibold">Healthy</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-slate-800 dark:bg-slate-200 h-full rounded-full w-[90%]"></div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Transactions Table */}
        <div className="pharmacy-card p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="medical-subtitle">Recent Financial Transactions</h2>
              <p className="medical-caption mt-0.5">Real-time ledger audit trail</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-slate-500 h-8">
              <Filter className="h-3 w-3 mr-1" />
              Filter
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-red-50 dark:bg-red-950/40 text-[#c8102e] flex items-center justify-center shrink-0">
                  <ArrowDownRight className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Cleanroom Consumables & Reagents</p>
                  <p className="text-[11px] text-slate-500">Matugga Lab Supplies • Today, 09:14</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#c8102e]">-$234.50</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#166534] dark:text-[#4ade80] flex items-center justify-center shrink-0">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Ministry of Health Vaccine Contract Batch</p>
                  <p className="text-[11px] text-slate-500">Direct Wire Inflow • Yesterday</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#166534] dark:text-[#4ade80]">+$5,230.00</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-red-50 dark:bg-red-950/40 text-[#c8102e] flex items-center justify-center shrink-0">
                  <ArrowDownRight className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Substation Power Grid & Backup Generators</p>
                  <p className="text-[11px] text-slate-500">Facility Operations • 2 days ago</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#c8102e]">-$892.10</span>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="pharmacy-card p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="medical-subtitle">Pending Executive Authorizations</h2>
              <p className="medical-caption mt-0.5">Invoices & expense claims requiring sign-off</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
              2 Pending
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Vendor Invoice #INV-001234
                  </p>
                  <p className="text-[11px] text-slate-500">
                    RNA Synthesis Reagents • Lonza Pharma Supplies
                  </p>
                </div>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                  $3,450.00
                </span>
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-500 hover:text-slate-700">
                  Reject
                </Button>
                <Button size="sm" className="h-7 text-xs bg-[#143d1d] hover:bg-[#0f2e16] text-white">
                  Approve Invoice
                </Button>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Expense Report #EXP-005678
                  </p>
                  <p className="text-[11px] text-slate-500">
                    WHO GMP Regulatory Inspection Team Travel
                  </p>
                </div>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                  $567.80
                </span>
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-500 hover:text-slate-700">
                  Reject
                </Button>
                <Button size="sm" className="h-7 text-xs bg-[#143d1d] hover:bg-[#0f2e16] text-white">
                  Authorize Claim
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}