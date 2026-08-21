import { useState } from 'react'
import {
  DollarSign, FileSpreadsheet, CheckCircle2, Send, Eye,
  Receipt, Play, ArrowRight, AlertCircle
} from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'
import { usePayrollStore } from '../stores/payroll-store'
import { useHRStore } from '../stores/hr-store'
import { useFacilityStore } from '../../../shared/stores/facility-store'
import { usePermission } from '../../../shared/hooks/use-permission'
import { PayslipModal } from '../components/payslip-modal'
import type { Payslip, PayrollRun } from '../types'

// ─── Workflow Status Stepper ─────────────────────────────────────────────────
const WORKFLOW_STEPS: Array<{ key: PayrollRun['status']; label: string }> = [
  { key: 'DRAFT', label: 'Draft' },
  { key: 'REVIEWED', label: 'Reviewed' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'DISBURSED', label: 'Disbursed' },
]

function WorkflowStepper({
  run,
  onApprove,
  onDisburse,
}: {
  run: PayrollRun
  onApprove: () => void
  onDisburse: () => void
}) {
  const currentIndex = WORKFLOW_STEPS.findIndex((s) => s.key === run.status)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      {/* Step track */}
      <div className="flex items-center gap-0">
        {WORKFLOW_STEPS.map((step, i) => {
          const done = i < currentIndex
          const active = i === currentIndex
          return (
            <div key={step.key} className="flex items-center">
              <div className={[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all',
                done ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' :
                active ? 'text-slate-900 bg-slate-100 border border-slate-300' :
                'text-slate-400 bg-transparent',
              ].join(' ')}>
                {done
                  ? <CheckCircle2 className="h-3 w-3" />
                  : <span className="w-3 h-3 rounded-full border-2 inline-block" style={{ borderColor: active ? '#1e293b' : '#cbd5e1' }} />
                }
                {step.label}
              </div>
              {i < WORKFLOW_STEPS.length - 1 && (
                <ArrowRight className="h-3 w-3 text-slate-200 mx-1" />
              )}
            </div>
          )
        })}
      </div>

      {/* Active step action button */}
      {run.status === 'DRAFT' && (
        <button
          type="button"
          onClick={onApprove}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Approve Run
        </button>
      )}
      {run.status === 'APPROVED' && (
        <button
          type="button"
          onClick={onDisburse}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 transition-colors cursor-pointer whitespace-nowrap"
        >
          <Send className="h-3.5 w-3.5" />
          Disburse Transfers
        </button>
      )}
      {run.status === 'REVIEWED' && (
        <button
          type="button"
          onClick={onApprove}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Final Approve
        </button>
      )}
    </div>
  )
}

export default function PayrollPage() {
  const { runs, selectedRunId, setSelectedRunId, generateRun, updateRunStatus, disburseRun } = usePayrollStore()
  const { employees } = useHRStore()
  const { activeFacilityId, getActiveFacility } = useFacilityStore()
  const { roleTitle } = usePermission()
  const activeFacility = getActiveFacility()

  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'UGX'>('USD')

  const activeRun = runs.find((r) => r.id === selectedRunId) || runs[0]

  const displayedPayslips = activeRun
    ? activeFacilityId === 'fac_corporate'
      ? activeRun.payslips
      : activeRun.payslips.filter((p) => p.facilityId === activeFacilityId)
    : []

  const totalGross = displayedPayslips.reduce((s, p) => s + p.grossPay, 0)
  const totalNssfEmployer = displayedPayslips.reduce((s, p) => s + p.nssfEmployerContribution, 0)
  const totalNssEmployee = displayedPayslips.reduce((s, p) => s + p.nssfEmployeeDeduction, 0)
  const totalPaye = displayedPayslips.reduce((s, p) => s + p.payeTaxDeduction, 0)
  const totalDeductions = totalNssEmployee + totalPaye
  const totalNet = displayedPayslips.reduce((s, p) => s + p.netPay, 0)

  const cur = activeRun?.currency || 'USD'

  const fmt = (val: number) => {
    if (cur === 'UGX') return `UGX ${(val / 1_000_000).toFixed(2)}M`
    return `$${val.toLocaleString('en-US')}`
  }

  const handleNewRun = () => {
    generateRun(activeFacilityId, activeFacility.name, 'August 2026', selectedCurrency, employees)
  }

  return (
    <div className="space-y-4">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-border">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-lg font-bold text-foreground tracking-tight" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Payroll & Statutory Compensation
          </h1>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500 font-medium">{activeFacility?.name}</span>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
            URA PAYE Compliant
          </span>
        </div>

        {/* Currency + Generate Run */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            {(['USD', 'UGX'] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCurrency(c)}
                className={[
                  'px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer',
                  selectedCurrency === c ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700',
                ].join(' ')}
              >
                {c}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleNewRun}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            <Play className="h-3.5 w-3.5 text-primary" />
            New Run
          </button>
        </div>
      </div>

      {/* Workflow Stepper (only when there's an active run) */}
      {activeRun && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs px-5 py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Batch · {activeRun.batchNumber}
              </p>
              <WorkflowStepper
                run={activeRun}
                onApprove={() => updateRunStatus(activeRun.id, activeRun.status === 'DRAFT' ? 'APPROVED' : 'APPROVED')}
                onDisburse={() => disburseRun(activeRun.id)}
              />
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400">{activeRun.periodMonthYear}</p>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">{displayedPayslips.length} staff on batch</p>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards — all warm canvas except Net Pay callout */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {[
          { label: 'Gross Payroll', value: fmt(totalGross), sub: `${displayedPayslips.length} staff` },
          { label: 'Employer NSSF (10%)', value: fmt(totalNssfEmployer), sub: 'Company pension match' },
          { label: 'Employee NSSF (5%)', value: fmt(totalNssEmployee), sub: 'Staff contribution' },
          { label: 'PAYE Tax (URA)', value: fmt(totalPaye), sub: 'Income tax remittance' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#f6f5f1] rounded-xl border border-border p-3.5">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{kpi.label}</p>
            <p className="text-base font-bold text-slate-900 mt-1.5 font-mono tracking-tight">{kpi.value}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{kpi.sub}</p>
          </div>
        ))}

        {/* Net Pay — dark callout */}
        <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-3.5 shadow-xs col-span-2 sm:col-span-1">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Net Take-Home</p>
          <p className="text-base font-bold text-emerald-400 mt-1.5 font-mono tracking-tight">{fmt(totalNet)}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Bank transfers to staff</p>
        </div>
      </div>

      {/* Deduction summary bar — compact, replaces noisy per-column colors */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs px-5 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0">Deduction Breakdown</p>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div>
            <span className="text-slate-400">NSSF Employee: </span>
            <span className="font-mono font-semibold text-slate-700">{fmt(totalNssEmployee)}</span>
          </div>
          <div>
            <span className="text-slate-400">PAYE Tax: </span>
            <span className="font-mono font-semibold text-slate-700">{fmt(totalPaye)}</span>
          </div>
          <div>
            <span className="text-slate-400">Total Withheld: </span>
            <span className="font-mono font-bold text-slate-900">{fmt(totalDeductions)}</span>
          </div>
          <div>
            <span className="text-slate-400">Employer NSSF (separate liability): </span>
            <span className="font-mono font-semibold text-slate-700">{fmt(totalNssfEmployer)}</span>
          </div>
        </div>
      </div>

      {/* Salary Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs font-bold text-slate-900">
                {activeRun?.periodMonthYear || 'August 2026'} Salary Ledger
              </p>
              <p className="text-[11px] text-slate-400">
                Batch: <span className="font-mono">{activeRun?.batchNumber || '—'}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-5 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[30%]">
                  Employee
                </th>
                <th className="px-4 py-2.5 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Gross Pay
                </th>
                <th className="px-4 py-2.5 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Total Deductions
                </th>
                <th className="px-4 py-2.5 text-right text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                  Net Pay
                </th>
                <th className="px-4 py-2.5 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-4 py-2.5 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {/* Payslip */}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedPayslips.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <FileSpreadsheet className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-400">No payroll data</p>
                    <p className="text-xs text-slate-300 mt-1">Generate a new run to calculate payroll</p>
                  </td>
                </tr>
              ) : (
                displayedPayslips.map((slip) => {
                  const slipDeductions = slip.nssfEmployeeDeduction + slip.payeTaxDeduction + slip.localServiceTax
                  return (
                    <tr key={slip.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Employee */}
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-slate-900">{slip.employeeName}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {slip.employeeNumber} · {slip.jobTitle}
                        </p>
                      </td>

                      {/* Gross Pay */}
                      <td className="px-4 py-3.5 text-right font-mono text-slate-700 font-medium">
                        {fmt(slip.grossPay)}
                      </td>

                      {/* Total Deductions — monochrome, no red */}
                      <td className="px-4 py-3.5 text-right font-mono text-slate-500">
                        <span className="font-medium">{fmt(slipDeductions)}</span>
                        <p className="text-[10px] text-slate-300 mt-0.5">NSSF + PAYE + LST</p>
                      </td>

                      {/* Net Pay — primary focus */}
                      <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900 text-[13px]">
                        {fmt(slip.netPay)}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5 text-center">
                        <span className={[
                          'inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md border',
                          slip.status === 'PAID'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200',
                        ].join(' ')}>
                          {slip.status}
                        </span>
                      </td>

                      {/* Payslip */}
                      <td className="px-4 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedPayslip(slip)}
                          className="flex items-center gap-1 ml-auto px-2.5 py-1 text-[11px] font-semibold rounded-lg border border-slate-200 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PayslipModal
        payslip={selectedPayslip}
        isOpen={Boolean(selectedPayslip)}
        onClose={() => setSelectedPayslip(null)}
      />
    </div>
  )
}