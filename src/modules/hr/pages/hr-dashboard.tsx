import { useFacilityStore } from '../../../shared/stores/facility-store'
import { usePermission } from '../../../shared/hooks/use-permission'

export default function HRDashboard() {
  const { getActiveFacility } = useFacilityStore()
  const { roleTitle } = usePermission()
  const activeFacility = getActiveFacility()

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-border">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-lg font-bold text-foreground tracking-tight" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Human Capital & Staffing
          </h1>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500 font-medium">{activeFacility.name}</span>
          <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-md">
            {roleTitle}
          </span>
        </div>
      </div>

      {/* Compact KPI Strip */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-500">Active Staff</p>
            <span className="text-[10px] font-semibold text-emerald-600">100% on duty</span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-bold text-foreground leading-none tracking-tight tabular-nums">
              {activeFacility.staffOnDuty || 847}
            </p>
          </div>
        </div>

        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-500">Open Requisitions</p>
            <span className="text-[10px] font-medium text-slate-400">Recruiting</span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-bold text-foreground leading-none tracking-tight tabular-nums">
              8 Positions
            </p>
          </div>
        </div>

        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-500">Monthly Payroll</p>
            <span className="text-[10px] font-semibold text-emerald-600">Processed</span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-bold text-foreground leading-none tracking-tight tabular-nums">
              $89,432
            </p>
          </div>
        </div>

        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-500">Leave Requests</p>
            <span className="text-[10px] font-medium text-slate-400">Pending Review</span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-bold text-foreground leading-none tracking-tight tabular-nums">
              12 Requests
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 text-center text-slate-400 text-xs">
        Employee personnel registry, 21 CFR gowning certifications, and shift rosters live view.
      </div>
    </div>
  )
}