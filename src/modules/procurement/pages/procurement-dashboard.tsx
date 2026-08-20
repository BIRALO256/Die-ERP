import { useFacilityStore } from '../../../shared/stores/facility-store'
import { usePermission } from '../../../shared/hooks/use-permission'

export default function ProcurementDashboard() {
  const { getActiveFacility } = useFacilityStore()
  const { roleTitle } = usePermission()
  const activeFacility = getActiveFacility()

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-border">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-lg font-bold text-foreground tracking-tight" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Supply Chain & Procurement
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
            <p className="text-[11px] font-medium text-slate-500">Active Purchase Orders</p>
            <span className="text-[10px] font-semibold text-emerald-600">In Transit</span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-bold text-foreground leading-none tracking-tight tabular-nums">
              23 POs
            </p>
          </div>
        </div>

        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-500">Pending Approvals</p>
            <span className="text-[10px] font-bold text-primary">7 Orders</span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-bold text-primary leading-none tracking-tight tabular-nums">
              $54,231
            </p>
          </div>
        </div>

        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-500">Total Spend (Month)</p>
            <span className="text-[10px] font-medium text-slate-400">Raw & Reagents</span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-bold text-foreground leading-none tracking-tight tabular-nums">
              $248,500
            </p>
          </div>
        </div>

        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-500">Qualified Vendors</p>
            <span className="text-[10px] font-semibold text-emerald-600">GMP Verified</span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-bold text-foreground leading-none tracking-tight tabular-nums">
              42 Vendors
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 text-center text-slate-400 text-xs">
        Vendor quality audits, raw material cold-chain receipts, and dual-authorization purchase workflows.
      </div>
    </div>
  )
}