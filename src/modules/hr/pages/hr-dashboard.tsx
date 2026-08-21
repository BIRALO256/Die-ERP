import { useState } from 'react'
import {
  Users, ShieldCheck, AlertTriangle, CheckCircle2, Clock,
  DollarSign, Award, Plus, ChevronRight, Heart
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Button } from '../../../shared/components/ui/button'
import { useHRStore } from '../stores/hr-store'
import { usePayrollStore } from '../stores/payroll-store'
import { useFacilityStore } from '../../../shared/stores/facility-store'
import { usePermission } from '../../../shared/hooks/use-permission'
import { OnboardEmployeeModal } from '../components/onboard-employee-modal'

export default function HRDashboard() {
  const { employees, addEmployee } = useHRStore()
  const { runs } = usePayrollStore()
  const { activeFacilityId, getActiveFacility } = useFacilityStore()
  const { roleTitle } = usePermission()
  const activeFacility = getActiveFacility()

  const [showOnboardModal, setShowOnboardModal] = useState(false)

  const facilityEmployees =
    activeFacilityId === 'fac_corporate'
      ? employees
      : employees.filter((e) => e.organizationUnitId === activeFacilityId)

  const expiringCerts = facilityEmployees.flatMap((emp) =>
    emp.certifications
      .filter((c) => c.verificationStatus === 'EXPIRING_SOON' || c.verificationStatus === 'EXPIRED')
      .map((c) => ({ ...c, employeeName: emp.fullName, employeeId: emp.id }))
  )

  const totalDependents = facilityEmployees.reduce((s, e) => s + e.dependents.length, 0)
  const onDutyCount =
    facilityEmployees.filter((e) => e.currentShift?.status === 'ON_DUTY').length ||
    Math.round(facilityEmployees.length * 0.7)

  // Dept distribution from live data
  const deptCounts: Record<string, number> = {}
  facilityEmployees.forEach((e) => {
    const key = e.department.split(' & ')[0].split(' ').slice(0, 2).join(' ')
    deptCounts[key] = (deptCounts[key] || 0) + 1
  })
  const deptRows = Object.entries(deptCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      pct: Math.round((count / Math.max(facilityEmployees.length, 1)) * 100),
    }))

  return (
    <div className="space-y-4">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-border">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1
            className="text-lg font-bold text-foreground tracking-tight"
            style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
          >
            Human Capital & Workforce
          </h1>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500 font-medium">{activeFacility?.name}</span>
          <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/60 px-2 py-0.5 rounded-md">
            {roleTitle}
          </span>
          {expiringCerts.length === 0 && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              All Certs Valid
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => setShowOnboardModal(true)}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-3 py-1.5 h-auto shadow-2xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Onboard Personnel
          </Button>

          <NavLink to="/hr/payroll">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="text-xs border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <DollarSign className="h-3.5 w-3.5 mr-1 text-emerald-600" />
              Payroll Ledger
            </Button>
          </NavLink>
        </div>
      </div>

      {/* KPI Strip — all warm canvas */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: 'Facility Headcount',
            value: activeFacility?.staffOnDuty ?? facilityEmployees.length,
            sub: 'Bio-data records on file',
          },
          {
            label: 'On-Duty Shift Strength',
            value: `${onDutyCount}`,
            sub: 'Bioreactor & cleanroom active',
            live: true,
          },
          {
            label: 'Compliance Alerts',
            value: expiringCerts.length,
            sub: expiringCerts.length > 0 ? 'Certs expiring / expired' : 'All credentials in order',
            alert: expiringCerts.length > 0,
          },
          {
            label: 'Registered Dependents',
            value: totalDependents,
            sub: 'Spouses, children & family',
          },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#f6f5f1] rounded-xl border border-border p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                {kpi.label}
              </p>
              {kpi.live && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              )}
              {kpi.alert && <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />}
            </div>
            <div className="mt-2">
              <p className={[
                'text-2xl font-black tracking-tight font-mono',
                kpi.alert ? 'text-amber-700' : 'text-slate-900',
              ].join(' ')}>
                {kpi.value}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{kpi.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left 2 cols */}
        <div className="lg:col-span-2 space-y-4">

          {/* Compliance Radar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900">Credential & Certification Radar</h3>
              </div>
              <NavLink to="/hr/employees" className="text-xs text-primary font-semibold hover:underline flex items-center gap-0.5">
                All Certs <ChevronRight className="h-3.5 w-3.5" />
              </NavLink>
            </div>

            {expiringCerts.length === 0 ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
                <p className="text-sm font-semibold text-slate-700">All Credentials Up to Date</p>
                <p className="text-xs text-slate-400 mt-1">
                  No audit risks across {activeFacility?.name}.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {expiringCerts.map((cert, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-amber-50/60 border border-amber-200/80 rounded-xl px-4 py-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900">{cert.employeeName}</span>
                        <span className={[
                          'text-[10px] font-bold px-1.5 py-0.5 rounded-md border',
                          cert.verificationStatus === 'EXPIRED'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200',
                        ].join(' ')}>
                          {cert.verificationStatus.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {cert.certName} · Expires:{' '}
                        <span className="font-semibold text-slate-700">{cert.expiryDate}</span>
                      </p>
                    </div>
                    <NavLink to="/hr/employees" className="shrink-0">
                      <button
                        type="button"
                        className="px-3 py-1.5 text-[11px] font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-white hover:border-emerald-400 hover:text-emerald-700 transition-colors cursor-pointer"
                      >
                        Requalify
                      </button>
                    </NavLink>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shift Coverage */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <h3 className="text-xs font-bold text-slate-900">24/7 Shift Coverage</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Continuous 3-shift cycle</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                {
                  label: 'Shift A — Morning',
                  time: '06:00 – 14:00',
                  desc: 'Fermentation & Extraction',
                  lead: 'Dr. Sarah Nakato (Grade A)',
                  active: true,
                },
                {
                  label: 'Shift B — Evening',
                  time: '14:00 – 22:00',
                  desc: 'Purification & Lyophilization',
                  lead: 'Nanziri Dianah',
                  active: false,
                },
                {
                  label: 'Shift C — Night',
                  time: '22:00 – 06:00',
                  desc: 'Automated Perfusion & Bioreactor Telemetry',
                  lead: 'SCADA Engineering Team',
                  active: false,
                },
              ].map((shift) => (
                <div
                  key={shift.label}
                  className={[
                    'rounded-xl p-3 border',
                    shift.active ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200',
                  ].join(' ')}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{shift.label}</span>
                    {shift.active && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{shift.time} · {shift.desc}</p>
                  <p className="text-[11px] font-semibold text-slate-700 mt-1.5">Lead: {shift.lead}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right col — Dept Distribution */}
        <div>
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-xs font-bold text-slate-900">Workforce by Department</h3>
              <Users className="h-4 w-4 text-slate-300" />
            </div>

            <div className="space-y-3.5 text-xs">
              {deptRows.map((dept) => (
                <div key={dept.name}>
                  <div className="flex items-center justify-between text-slate-700 mb-1.5">
                    <span className="font-semibold truncate max-w-[170px]">{dept.name}</span>
                    <span className="font-mono text-slate-500 shrink-0 ml-2">
                      {dept.count} · {dept.pct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-700 rounded-full transition-all"
                      style={{ width: `${dept.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <NavLink to="/hr/employees">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-primary font-semibold hover:bg-primary/5 cursor-pointer"
                >
                  View Full Personnel Directory →
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <OnboardEmployeeModal
        isOpen={showOnboardModal}
        onClose={() => setShowOnboardModal(false)}
        onSave={(data) => addEmployee(data)}
        defaultFacilityId={activeFacilityId}
      />
    </div>
  )
}