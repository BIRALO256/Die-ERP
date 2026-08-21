import { useState } from 'react'
import { Users, Plus, Search, ShieldCheck, AlertTriangle, XCircle, Layers, ChevronRight } from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'
import { useHRStore } from '../stores/hr-store'
import { useFacilityStore } from '../../../shared/stores/facility-store'
import { usePermission } from '../../../shared/hooks/use-permission'
import { OnboardEmployeeModal } from '../components/onboard-employee-modal'
import { EmployeeDetailModal } from '../components/employee-detail-modal'
import { CertRenewalModal } from '../components/cert-renewal-modal'
import { FormSchemaModal } from '../components/form-schema-modal'
import type { Employee } from '../types'

// ─── Compliance Badge ────────────────────────────────────────────────────────
function ComplianceBadge({ employee }: { employee: Employee }) {
  const expired = employee.certifications.some((c) => c.verificationStatus === 'EXPIRED')
  const expiring = employee.certifications.some((c) => c.verificationStatus === 'EXPIRING_SOON')

  if (expired) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
        <XCircle className="h-2.5 w-2.5" />
        Cert Expired
      </span>
    )
  }
  if (expiring) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
        <AlertTriangle className="h-2.5 w-2.5" />
        Action Needed
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
      <ShieldCheck className="h-2.5 w-2.5" />
      Compliant
    </span>
  )
}

export default function EmployeesPage() {
  const {
    employees,
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    selectedStatus,
    setSelectedStatus,
    addEmployee,
    renewCertification,
  } = useHRStore()

  const { activeFacilityId, getActiveFacility } = useFacilityStore()
  const { can } = usePermission()
  const activeFacility = getActiveFacility()

  const [showOnboardModal, setShowOnboardModal] = useState(false)
  const [showSchemaModal, setShowSchemaModal] = useState(false)
  const [selectedEmpForDetail, setSelectedEmpForDetail] = useState<Employee | null>(null)
  const [renewingCertInfo, setRenewingCertInfo] = useState<{
    certId: string
    certName: string
    employeeName: string
    employeeId: string
  } | null>(null)

  // ─── Filter Employees ──────────────────────────────────────────────────────
  const filteredEmployees = employees.filter((emp) => {
    const matchesFacility = activeFacilityId === 'fac_corporate' || emp.organizationUnitId === activeFacilityId
    if (!matchesFacility) return false

    const q = (searchTerm || '').trim().toLowerCase()
    const matchesSearch =
      !q ||
      emp.fullName.toLowerCase().includes(q) ||
      emp.employeeNumber.toLowerCase().includes(q) ||
      emp.jobTitle.toLowerCase().includes(q) ||
      emp.department.toLowerCase().includes(q) ||
      emp.nationalIdNin.toLowerCase().includes(q)

    const matchesDept =
      !selectedDepartment ||
      selectedDepartment === 'all' ||
      emp.department === selectedDepartment

    const matchesStatus =
      !selectedStatus ||
      selectedStatus === 'all' ||
      emp.status === selectedStatus

    return matchesSearch && matchesDept && matchesStatus
  })

  // Compute unique departments for the current facility scope
  const scopedEmployees = employees.filter(
    (e) => activeFacilityId === 'fac_corporate' || e.organizationUnitId === activeFacilityId
  )
  const departments = Array.from(new Set(scopedEmployees.map((e) => e.department))).filter(Boolean).slice(0, 8)

  // Stats
  const activeCount = scopedEmployees.filter((e) => e.status === 'ACTIVE').length
  const certIssues = scopedEmployees.filter((e) =>
    e.certifications.some((c) => c.verificationStatus !== 'VALID')
  ).length

  return (
    <div className="space-y-4">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-border">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-lg font-bold text-foreground tracking-tight" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Personnel Records
          </h1>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500 font-medium">{activeFacility?.name}</span>
          <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 border border-sky-200/60 px-2 py-0.5 rounded-md">
            WHO GMP Compliant
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowOnboardModal(true)}
            size="sm"
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-3 py-1.5 h-auto shadow-2xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Onboard Personnel
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Total Personnel</span>
          <div className="mt-1.5">
            <span className="text-xl font-bold text-slate-900 leading-tight tracking-tight">
              {scopedEmployees.length}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">In facility scope</p>
          </div>
        </div>

        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Active Staff</span>
          <div className="mt-1.5">
            <span className="text-xl font-bold text-slate-900 leading-tight tracking-tight">
              {activeCount}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">{Math.round((activeCount / Math.max(scopedEmployees.length, 1)) * 100)}% of roster</p>
          </div>
        </div>

        <div className="bg-[#f6f5f1] rounded-xl border border-border p-3.5 flex flex-col justify-between">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Compliance Issues</span>
          <div className="mt-1.5">
            <span className={['text-xl font-bold leading-tight tracking-tight', certIssues > 0 ? 'text-amber-600' : 'text-slate-900'].join(' ')}>
              {certIssues}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">{certIssues > 0 ? 'Requires attention' : 'All certs valid'}</p>
          </div>
        </div>

        {/* Interactive Form Schema Card */}
        <div
          onClick={() => setShowSchemaModal(true)}
          className="bg-[#f6f5f1] hover:bg-[#eae8e1] transition-all rounded-xl border border-border p-3.5 flex flex-col justify-between cursor-pointer group"
          title="Click to view and switch form schemas"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Form Schema</span>
            <span className="text-[9px] font-bold bg-white text-slate-600 border border-slate-200 px-1.5 py-0.2 rounded group-hover:border-primary group-hover:text-primary transition-colors">
              Manage
            </span>
          </div>
          <div className="mt-1.5">
            <span className="text-base font-mono font-bold text-slate-900 leading-tight tracking-tight">
              v1.0 & v2.0
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5 group-hover:text-slate-600 flex items-center gap-0.5">
              Multi-version engine <ChevronRight className="h-2.5 w-2.5" />
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Row */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, role, NIN…"
              className="w-full pl-8.5 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { key: 'all', label: 'All' },
              { key: 'ACTIVE', label: 'Active' },
              { key: 'ON_LEAVE', label: 'On Leave' },
              { key: 'SUSPENDED', label: 'Suspended' },
            ].map((s) => {
              const isSelected = selectedStatus === s.key || (!selectedStatus && s.key === 'all')
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSelectedStatus(s.key)}
                  className={[
                    'px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer',
                    isSelected ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70',
                  ].join(' ')}
                >
                  {s.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Department tabs */}
        {departments.length > 0 && (
          <div className="flex gap-1 flex-wrap pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setSelectedDepartment('all')}
              className={[
                'px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer',
                (!selectedDepartment || selectedDepartment === 'all')
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100',
              ].join(' ')}
            >
              All Departments
            </button>
            {departments.map((dept) => {
              const isDeptActive = selectedDepartment === dept
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDepartment(isDeptActive ? 'all' : dept)}
                  className={[
                    'px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer',
                    isDeptActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100',
                  ].join(' ')}
                >
                  {dept.split(' & ')[0].split(' ').slice(0, 2).join(' ')}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Employees Table — 4 columns, clean visual weight */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Table header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-900">
              {filteredEmployees.length} Personnel Found
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {filteredEmployees.filter((e) => e.status === 'ACTIVE').length} active · 
              {' '}{filteredEmployees.filter((e) => e.certifications.some((c) => c.verificationStatus !== 'VALID')).length} compliance alerts
            </p>
          </div>
          <Users className="h-4 w-4 text-slate-300" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-5 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[38%]">
                  Personnel
                </th>
                <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[32%]">
                  Role & Placement
                </th>
                <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[18%]">
                  Compliance
                </th>
                <th className="px-4 py-2.5 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[12%]">
                  {/* Actions */}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => {
                const initials = emp.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')
                return (
                  <tr
                    key={emp.id}
                    onClick={() => setSelectedEmpForDetail(emp)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Personnel column — avatar with status dot (no noisy stacked buttons) */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[11px] font-black text-slate-700 select-none">
                            {initials}
                          </div>
                          {/* Clean subtle status dot */}
                          <span
                            className={[
                              'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white',
                              emp.status === 'ACTIVE'
                                ? 'bg-emerald-500'
                                : emp.status === 'ON_LEAVE'
                                ? 'bg-sky-500'
                                : 'bg-amber-500',
                            ].join(' ')}
                            title={`Status: ${emp.status}`}
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-slate-900 group-hover:text-primary transition-colors truncate max-w-[200px]">
                              {emp.fullName}
                            </p>
                            {emp.status !== 'ACTIVE' && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-50 text-sky-700 border border-sky-200">
                                {emp.status === 'ON_LEAVE' ? 'On Leave' : emp.status}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {emp.employeeNumber} · {emp.nationalIdNin}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role column */}
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-slate-900 truncate max-w-[220px]">{emp.jobTitle}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{emp.department}</p>
                      {activeFacilityId === 'fac_corporate' && (
                        <span className="inline-block text-[10px] font-semibold text-sky-600 bg-sky-50 border border-sky-200 rounded-md px-1.5 py-0.5 mt-1">
                          {emp.facilityName.split(' ')[0]}
                        </span>
                      )}
                    </td>

                    {/* Compliance column */}
                    <td className="px-4 py-3.5">
                      <ComplianceBadge employee={emp} />
                      <p className="text-[10px] text-slate-400 mt-1">
                        {emp.certifications.length} cert{emp.certifications.length !== 1 ? 's' : ''} · {emp.formVersion || 'v1.0'}
                      </p>
                    </td>

                    {/* Action column — sleek ghost link */}
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedEmpForDetail(emp)
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 group-hover:text-primary transition-colors cursor-pointer"
                      >
                        View <ChevronRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {filteredEmployees.length === 0 && (
            <div className="px-5 py-12 text-center">
              <Users className="h-8 w-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-400">No personnel found</p>
              <p className="text-xs text-slate-300 mt-1">Adjust your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <OnboardEmployeeModal
        isOpen={showOnboardModal}
        onClose={() => setShowOnboardModal(false)}
        onSave={(data) => addEmployee(data)}
        defaultFacilityId={activeFacilityId || 'fac_matugga'}
      />

      <FormSchemaModal
        isOpen={showSchemaModal}
        onClose={() => setShowSchemaModal(false)}
      />

      <EmployeeDetailModal
        employee={selectedEmpForDetail}
        isOpen={!!selectedEmpForDetail}
        onClose={() => setSelectedEmpForDetail(null)}
        onOpenRenewCert={(certId) => {
          if (!selectedEmpForDetail) return
          const cert = selectedEmpForDetail.certifications.find((c) => c.id === certId)
          if (!cert) return
          setRenewingCertInfo({
            certId: cert.id,
            certName: cert.certName,
            employeeName: selectedEmpForDetail.fullName,
            employeeId: selectedEmpForDetail.id,
          })
          setSelectedEmpForDetail(null)
        }}
      />

      {renewingCertInfo && (
        <CertRenewalModal
          isOpen={!!renewingCertInfo}
          certInfo={renewingCertInfo}
          onClose={() => setRenewingCertInfo(null)}
          onRenew={(certId, newExpiry) => {
            renewCertification(renewingCertInfo.employeeId, certId, newExpiry)
            setRenewingCertInfo(null)
          }}
        />
      )}
    </div>
  )
}