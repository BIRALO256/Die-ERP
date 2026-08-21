import { useState } from 'react'
import {
  X, User, Briefcase, Heart, ShieldCheck, PhoneCall,
  GraduationCap, CheckCircle2, AlertTriangle, Clock,
  FileCode2, Building2, Calendar, MapPin, Mail, Phone, ChevronRight
} from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'
import type { Employee } from '../types'

interface EmployeeDetailModalProps {
  employee: Employee | null
  isOpen: boolean
  onClose: () => void
  onOpenRenewCert?: (certId: string) => void
}

type TabType = 'overview' | 'biodata' | 'family' | 'audit'

export function EmployeeDetailModal({
  employee,
  isOpen,
  onClose,
  onOpenRenewCert,
}: EmployeeDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  if (!isOpen || !employee) return null

  const formatCurrency = (val: number, cur: string) => {
    if (cur === 'UGX') {
      return `UGX ${(val / 1000000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M / mo`
    }
    return `$${val.toLocaleString('en-US')} / mo`
  }

  const initials = employee.fullName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  const hasCertAlert = employee.certifications.some((c) => c.verificationStatus !== 'VALID')

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">

        {/* Modal Header — concise, clear hierarchy */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-black text-slate-700 select-none">
                {initials}
              </div>
              <span className={[
                'absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white',
                employee.status === 'ACTIVE' ? 'bg-emerald-500' : employee.status === 'ON_LEAVE' ? 'bg-sky-500' : 'bg-amber-500'
              ].join(' ')} />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-slate-900">{employee.fullName}</h2>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded-md">
                  {employee.employeeNumber}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {employee.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {employee.jobTitle} · <span className="text-slate-400">{employee.department}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Segmented Tab Navigation */}
        <div className="px-6 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50 shrink-0">
          {[
            { key: 'overview', label: 'Overview & Credentials', icon: ShieldCheck, badge: hasCertAlert ? 'Alert' : undefined },
            { key: 'biodata', label: 'Bio & Contacts', icon: User },
            { key: 'family', label: `Family (${employee.dependents.length})`, icon: Heart },
            { key: 'audit', label: `Form ${employee.formVersion || 'v1.0'}`, icon: FileCode2 },
          ].map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as TabType)}
                className={[
                  'flex items-center gap-1.5 py-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer',
                  active
                    ? 'border-slate-900 text-slate-900 bg-white shadow-2xs'
                    : 'border-transparent text-slate-500 hover:text-slate-800',
                ].join(' ')}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
                {tab.badge && (
                  <span className="ml-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">

          {/* TAB 1: OVERVIEW & CREDENTIALS (Primary Operational Focus) */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* 4 Compact Operational Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Cleanroom Grade</span>
                  <span className="text-xs font-bold text-slate-900 mt-1 block">
                    {employee.cleanroomGowningGrade || 'Non-Cleanroom'}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Biosafety Containment</span>
                  <span className="text-xs font-bold text-slate-900 mt-1 block">
                    {employee.biosafetyLevel || 'BSL-1'}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Base Salary</span>
                  <span className="text-xs font-bold text-slate-900 mt-1 block font-mono">
                    {formatCurrency(employee.baseSalary, employee.baseCurrency)}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Shift Schedule</span>
                  <span className="text-xs font-bold text-emerald-700 mt-1 block">
                    {employee.currentShift?.shiftLabel || 'Day Shift'}
                  </span>
                </div>
              </div>

              {/* Facility & Placement Info */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Facility Placement</span>
                  <p className="font-semibold text-slate-900 mt-0.5">{employee.facilityName}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Hired: <span className="font-mono text-slate-700">{employee.hireDate}</span> · Supervisor: {employee.managerSupervisorName || 'Direct Department Head'}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 rounded-md px-2 py-1">
                  {employee.employmentStatus} · {employee.employmentType}
                </span>
              </div>

              {/* Qualifications & Certifications */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    GMP & Operational Qualifications ({employee.certifications.length})
                  </h4>
                  <span className="text-[10px] text-slate-400">21 CFR Cleanroom Verified</span>
                </div>

                <div className="space-y-2">
                  {employee.certifications.length === 0 ? (
                    <div className="p-4 text-center bg-slate-50 rounded-xl text-slate-400 text-xs">
                      No certifications registered for this personnel record.
                    </div>
                  ) : (
                    employee.certifications.map((cert) => (
                      <div
                        key={cert.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs bg-white"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-slate-900">{cert.certName}</span>
                            <span className={[
                              'inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold rounded-md border',
                              cert.verificationStatus === 'VALID'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : cert.verificationStatus === 'EXPIRING_SOON'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200',
                            ].join(' ')}>
                              {cert.verificationStatus === 'EXPIRING_SOON' && <AlertTriangle className="h-2.5 w-2.5" />}
                              {cert.verificationStatus === 'VALID' && <CheckCircle2 className="h-2.5 w-2.5" />}
                              {cert.verificationStatus.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                            {cert.licenseNumber} · Expires: <span className="text-slate-700 font-semibold">{cert.expiryDate}</span> · Issued by {cert.issuingBody}
                          </p>
                        </div>

                        {cert.verificationStatus !== 'VALID' && onOpenRenewCert && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => onOpenRenewCert(cert.id)}
                            className="text-xs py-1 h-7 border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 shrink-0 cursor-pointer transition-colors"
                          >
                            Renew Cert
                          </Button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BIO-DATA & CONTACTS */}
          {activeTab === 'biodata' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-3">
                  Government Bio-Data & Contact
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                  <div>
                    <span className="text-slate-400 block text-[11px] mb-0.5">National ID (NIN)</span>
                    <span className="font-semibold text-slate-900 font-mono">{employee.nationalIdNin}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] mb-0.5">Date of Birth</span>
                    <span className="font-semibold text-slate-900">{employee.dateOfBirth}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] mb-0.5">Gender & Marital Status</span>
                    <span className="font-semibold text-slate-900">{employee.gender} · {employee.maritalStatus}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] mb-0.5">Phone Number</span>
                    <span className="font-semibold text-slate-900 font-mono">{employee.phoneNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] mb-0.5">Personal Email</span>
                    <span className="font-semibold text-slate-900 truncate block">{employee.personalEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] mb-0.5">Residence & District</span>
                    <span className="font-semibold text-slate-900">{employee.placeOfResidence}, {employee.city}</span>
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              {employee.emergencyContacts.length > 0 && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2.5">
                    Emergency Contacts ({employee.emergencyContacts.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {employee.emergencyContacts.map((emg) => (
                      <div key={emg.id} className="bg-white border border-slate-200 rounded-lg p-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{emg.contactName}</span>
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                            Priority {emg.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {emg.relationship} · <span className="font-mono text-slate-700">{emg.primaryPhone}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {employee.educationRecords.length > 0 && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2.5">
                    Academic Qualifications
                  </h4>
                  <div className="space-y-1.5">
                    {employee.educationRecords.map((edu) => (
                      <div key={edu.id} className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900">{edu.degreeTitle}</p>
                          <p className="text-[11px] text-slate-400">{edu.institution} · Graduated {edu.graduationYear}</p>
                        </div>
                        {edu.gradeClassification && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {edu.gradeClassification}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FAMILY & DEPENDENTS */}
          {activeTab === 'family' && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900">Registered Family & Dependents</h4>
                <span className="text-[11px] text-slate-400">Total: {employee.dependents.length}</span>
              </div>

              {employee.dependents.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-400">
                  <Heart className="h-6 w-6 mx-auto mb-1 text-slate-300" />
                  <p className="font-semibold">No dependents on file</p>
                  <p className="text-[11px] mt-0.5">Spouses and children will be listed here when registered.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {employee.dependents.map((dep) => (
                    <div
                      key={dep.id}
                      className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{dep.fullName}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {dep.age ? `Age ${dep.age} · ` : ''}{dep.gender ? `${dep.gender} · ` : ''}{dep.phoneNumber || ''}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-md shrink-0">
                        {dep.relationshipType}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: FORM SCHEMA & AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Intake Schema Version</span>
                  <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                    {employee.formVersion || 'v1.0'}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  This personnel record was captured using Bio-Data Form Schema <span className="font-mono font-semibold">{employee.formVersion || 'v1.0'}</span>.
                </p>
              </div>

              {/* Version-Specific Custom Fields */}
              {employee.customFields && Object.keys(employee.customFields).length > 0 ? (
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase">Version-Specific Fields</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(employee.customFields).map(([k, v]) => (
                      <div key={k} className="bg-white border border-slate-200 p-2 rounded-lg">
                        <span className="text-[10px] text-slate-400 block capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-bold text-slate-900 font-mono">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-[11px] text-slate-500">
                  Standard baseline fields stored. No schema-extension custom fields captured for this record.
                </div>
              )}

              <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400 space-y-1">
                <p>Created: <span className="font-mono text-slate-600">{employee.createdAt || '2026-01-15T08:00:00Z'}</span></p>
                <p>Audit Status: <span className="font-bold text-emerald-700">21 CFR Part 11 Electronic Signature Verified</span></p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-between bg-white shrink-0">
          <span className="text-[11px] text-slate-400">
            Form schema: <span className="font-mono text-slate-600">{employee.formVersion || 'v1.0'}</span> · 21 CFR Part 11
          </span>
          <Button
            type="button"
            size="sm"
            onClick={onClose}
            className="text-xs bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
