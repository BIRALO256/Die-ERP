import { useState } from 'react'
import {
  X, User, Briefcase, Heart, GraduationCap, ShieldCheck,
  Plus, Trash2, ChevronLeft, ChevronRight, Check, Sparkles, Layers
} from 'lucide-react'
import { FACILITIES } from '../../../shared/constants/facilities'
import { useSchemaStore } from '../stores/schema-store'
import type { Employee, Dependent, EmergencyContact, FormSection, FormField, FormSchema } from '../types'

// Map icon name strings from schema to actual components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  User, Briefcase, Heart, GraduationCap, ShieldCheck,
}

interface OnboardEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => void
  defaultFacilityId: string
}

// ============================================================
// FIELD RENDERER — renders any FormField declaratively
// ============================================================
function FieldRenderer({
  field,
  value,
  onChange,
  facilityType,
}: {
  field: FormField
  value: any
  onChange: (val: any) => void
  facilityType: string
}) {
  // Facility-type gate
  if (field.facilityTypes && field.facilityTypes.length > 0) {
    if (!field.facilityTypes.includes(facilityType)) return null
  }

  const base =
    'w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary transition-colors'

  switch (field.type) {
    case 'text':
    case 'phone':
      return (
        <input
          type="text"
          required={field.required}
          placeholder={field.placeholder}
          value={value ?? field.defaultValue ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )
    case 'email':
      return (
        <input
          type="email"
          required={field.required}
          placeholder={field.placeholder}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )
    case 'date':
      return (
        <input
          type="date"
          required={field.required}
          value={value ?? field.defaultValue ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )
    case 'number':
      return (
        <input
          type="number"
          required={field.required}
          placeholder={field.placeholder}
          value={value ?? field.defaultValue ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} font-mono`}
        />
      )
    case 'textarea':
      return (
        <textarea
          required={field.required}
          placeholder={field.placeholder}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={base}
        />
      )
    case 'select':
      return (
        <select
          required={field.required}
          value={value ?? field.defaultValue ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        >
          <option value="">Select...</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )
    default:
      return null
  }
}

// ============================================================
// DEPENDENT LIST RENDERER
// ============================================================
function DependentListRenderer({
  items,
  onChange,
}: {
  items: Omit<Dependent, 'id'>[]
  onChange: (items: Omit<Dependent, 'id'>[]) => void
}) {
  const add = () =>
    onChange([...items, { fullName: '', relationshipType: 'CHILD', gender: 'FEMALE' }])

  const update = (i: number, key: string, val: any) => {
    const next = [...items]
    next[i] = { ...next[i], [key]: val }
    onChange(next)
  }

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))

  const base = 'px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary'

  return (
    <div className="space-y-2">
      {items.map((dep, i) => (
        <div
          key={i}
          className="grid grid-cols-12 gap-2 items-center bg-slate-50 border border-slate-200/80 rounded-xl p-2.5"
        >
          <div className="col-span-4">
            <input
              type="text"
              placeholder="Full Name"
              value={dep.fullName}
              onChange={(e) => update(i, 'fullName', e.target.value)}
              className={`${base} w-full`}
            />
          </div>
          <div className="col-span-2">
            <select
              value={dep.relationshipType}
              onChange={(e) => update(i, 'relationshipType', e.target.value)}
              className={`${base} w-full`}
            >
              <option value="CHILD">Child</option>
              <option value="PARENT">Parent</option>
              <option value="SIBLING">Sibling</option>
              <option value="LEGAL_DEPENDENT">Legal Dependent</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="col-span-2">
            <input
              type="date"
              value={dep.dateOfBirth ?? ''}
              onChange={(e) => update(i, 'dateOfBirth', e.target.value)}
              className={`${base} w-full`}
            />
          </div>
          <div className="col-span-1">
            <input
              type="number"
              placeholder="Age"
              value={dep.age ?? ''}
              onChange={(e) => update(i, 'age', Number(e.target.value))}
              className={`${base} w-full`}
            />
          </div>
          <div className="col-span-2">
            <select
              value={dep.gender ?? 'FEMALE'}
              onChange={(e) => update(i, 'gender', e.target.value)}
              className={`${base} w-full`}
            >
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="col-span-1 flex justify-end">
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 text-xs text-primary font-semibold border border-dashed border-primary/40 rounded-xl px-3 py-2 hover:bg-primary/5 transition-colors w-full justify-center cursor-pointer"
      >
        <Plus className="h-3.5 w-3.5" />
        Add Dependent (Child, Parent, Sibling…)
      </button>
    </div>
  )
}

// ============================================================
// EMERGENCY CONTACT RENDERER
// ============================================================
function EmergencyContactRenderer({
  label,
  value,
  onChange,
}: {
  label: string
  value: Partial<EmergencyContact>
  onChange: (val: Partial<EmergencyContact>) => void
}) {
  const base = 'w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary'

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-2">
      <p className="text-[11px] font-bold text-slate-700">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Contact Full Name"
          value={value.contactName ?? ''}
          onChange={(e) => onChange({ ...value, contactName: e.target.value })}
          className={base}
        />
        <input
          type="text"
          placeholder="Relationship (e.g. Spouse, Brother)"
          value={value.relationship ?? ''}
          onChange={(e) => onChange({ ...value, relationship: e.target.value })}
          className={base}
        />
        <input
          type="text"
          placeholder="+256 701 000 000 (Primary)"
          value={value.primaryPhone ?? ''}
          onChange={(e) => onChange({ ...value, primaryPhone: e.target.value })}
          className={`${base} font-mono`}
        />
        <input
          type="text"
          placeholder="+256 752 ... (Alternate)"
          value={value.alternatePhone ?? ''}
          onChange={(e) => onChange({ ...value, alternatePhone: e.target.value })}
          className={`${base} font-mono`}
        />
      </div>
    </div>
  )
}

// ============================================================
// MAIN MODAL
// ============================================================
export function OnboardEmployeeModal({
  isOpen,
  onClose,
  onSave,
  defaultFacilityId,
}: OnboardEmployeeModalProps) {
  const { schemas } = useSchemaStore()
  const [selectedSchemaVersion, setSelectedSchemaVersion] = useState<string>('v1.0')
  const activeSchema: FormSchema = schemas.find((s) => s.version === selectedSchemaVersion) || schemas[0]

  const [stepIndex, setStepIndex] = useState(0)

  // Flat form values store — all fields live here
  const [formValues, setFormValues] = useState<Record<string, any>>({
    organizationUnitId: defaultFacilityId,
    hireDate: new Date().toISOString().split('T')[0],
    employmentStatus: 'FULL_TIME',
    employmentType: 'PERMANENT',
    baseCurrency: 'USD',
    cleanroomGowningGrade: 'Grade A (Sterile Core)',
    biosafetyLevel: 'BSL-3',
    certExpiry: '2027-08-30',
    certName: 'Grade A Sterile Cleanroom Qualification',
    certLicense: 'GMP-MAT-2026-',
  })

  // Dependents list
  const [dependents, setDependents] = useState<Omit<Dependent, 'id'>[]>([])

  // Emergency contacts
  const [ec1, setEc1] = useState<Partial<EmergencyContact>>({})
  const [ec2, setEc2] = useState<Partial<EmergencyContact>>({})

  const setField = (id: string, val: any) =>
    setFormValues((prev) => ({ ...prev, [id]: val }))

  if (!isOpen) return null

  // Derive active facility type for facility-specific fields
  const activeFacilityId = formValues.organizationUnitId || defaultFacilityId
  const activeFacility = FACILITIES.find((f) => f.id === activeFacilityId) || FACILITIES[0]
  const facilityType = activeFacility.type

  const currentSection: FormSection = activeSchema.sections[stepIndex] || activeSchema.sections[0]
  const totalSteps = activeSchema.sections.length

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (stepIndex < totalSteps - 1) {
      setStepIndex(stepIndex + 1)
      return
    }

    const empNumber = `DEI-${activeFacility.code.slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`

    // Compile dependents
    const finalDependents: Dependent[] = []
    if (formValues.spouseName?.trim()) {
      finalDependents.push({
        id: `dep_${Date.now()}_spouse`,
        fullName: formValues.spouseName,
        relationshipType: 'SPOUSE',
        phoneNumber: formValues.spousePhone,
        isEmergencyContact: true,
      })
    }
    dependents.forEach((d, i) => {
      if (d.fullName?.trim()) {
        finalDependents.push({ ...d, id: `dep_${Date.now()}_${i}` })
      }
    })

    // Compile emergency contacts
    const emergencyContacts: EmergencyContact[] = []
    if (ec1.contactName?.trim()) {
      emergencyContacts.push({ id: `ec_${Date.now()}_1`, priority: 1, ...ec1 } as EmergencyContact)
    }
    if (ec2.contactName?.trim()) {
      emergencyContacts.push({ id: `ec_${Date.now()}_2`, priority: 2, ...ec2 } as EmergencyContact)
    }

    // Compile education
    const educationRecords = formValues.degreeTitle?.trim()
      ? [{
          id: `edu_${Date.now()}`,
          degreeTitle: formValues.degreeTitle,
          institution: formValues.institution || 'Makerere University',
          graduationYear: parseInt(formValues.graduationYear) || 2020,
        }]
      : []

    // Compile initial certification
    const certifications = formValues.certName?.trim()
      ? [{
          id: `cert_${Date.now()}`,
          certType: facilityType === 'CLINICAL' ? ('GCP_CLINICAL' as const) : ('GMP_CLEANROOM' as const),
          certName: formValues.certName,
          issuingBody: 'Uganda National Drug Authority (NDA) / WHO',
          licenseNumber: formValues.certLicense || `LIC-${Date.now().toString().slice(-4)}`,
          issueDate: new Date().toISOString().split('T')[0],
          expiryDate: formValues.certExpiry || '2027-08-30',
          verificationStatus: 'VALID' as const,
        }]
      : []

    // Collect custom schema fields (e.g. bloodGroup, biometricBadgeId, healthInsurancePolicyNo)
    const customFields: Record<string, any> = {}
    if (formValues.bloodGroup) customFields.bloodGroup = formValues.bloodGroup
    if (formValues.biometricBadgeId) customFields.biometricBadgeId = formValues.biometricBadgeId
    if (formValues.healthInsurancePolicyNo) customFields.healthInsurancePolicyNo = formValues.healthInsurancePolicyNo

    onSave({
      employeeNumber: empNumber,
      organizationUnitId: activeFacilityId,
      facilityName: activeFacility.name,
      fullName: formValues.fullName || '',
      nationalIdNin: (formValues.nationalIdNin || '').toUpperCase(),
      dateOfBirth: formValues.dateOfBirth || '1992-01-01',
      gender: formValues.gender || 'FEMALE',
      maritalStatus: formValues.maritalStatus || 'SINGLE',
      placeOfResidence: formValues.placeOfResidence || '',
      city: formValues.city || 'Kampala City',
      phoneNumber: formValues.phoneNumber || '+256 ',
      personalEmail: formValues.personalEmail || `${(formValues.fullName || 'staff').toLowerCase().replace(/\s+/g, '.')}@deibiopharma.com`,
      languagesSpoken: (formValues.languagesSpoken || 'English').split(',').map((s: string) => s.trim()),
      jobTitle: formValues.jobTitle || '',
      department: formValues.department || '',
      managerSupervisorName: formValues.managerSupervisorName || '',
      hireDate: formValues.hireDate || new Date().toISOString().split('T')[0],
      employmentStatus: formValues.employmentStatus || 'FULL_TIME',
      employmentType: formValues.employmentType || 'PERMANENT',
      baseCurrency: formValues.baseCurrency || 'USD',
      baseSalary: parseFloat(formValues.baseSalary) || 5000,
      hazardAllowance: parseFloat(formValues.hazardAllowance) || 0,
      status: 'ACTIVE',
      cleanroomGowningGrade: formValues.cleanroomGowningGrade,
      biosafetyLevel: formValues.biosafetyLevel,
      medicalLicenseNo: formValues.medicalLicenseNo,
      agriculturalZone: formValues.agriculturalZone,
      dependents: finalDependents,
      emergencyContacts,
      educationRecords,
      employmentHistory: [],
      certifications,
      formVersion: activeSchema.version,
      customFields,
    })

    onClose()
    setStepIndex(0)
    setFormValues({ organizationUnitId: defaultFacilityId })
    setDependents([])
    setEc1({})
    setEc2({})
  }

  const SectionIcon = currentSection.iconName ? (ICON_MAP[currentSection.iconName] || User) : User

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-150">

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Onboard Personnel</h2>
              {/* Schema Version Selector */}
              <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-lg text-[11px]">
                <Layers className="h-3 w-3 text-slate-500" />
                <span className="text-slate-500 font-medium">Schema:</span>
                <select
                  value={selectedSchemaVersion}
                  onChange={(e) => {
                    setSelectedSchemaVersion(e.target.value)
                    setStepIndex(0)
                  }}
                  className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  {schemas.map((s) => (
                    <option key={s.version} value={s.version}>
                      {s.version} — {s.version === 'v1.0' ? 'Standard Baseline' : s.version === 'v2.0' ? 'Extended Clinical & Bio' : s.title || s.description.slice(0, 30)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {activeFacility.name} · {activeSchema.description.slice(0, 65)}…
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto">
          {activeSchema.sections.map((section, i) => {
            const Icon = section.iconName ? (ICON_MAP[section.iconName] || User) : User
            const done = i < stepIndex
            const active = i === stepIndex
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setStepIndex(i)}
                className={[
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer',
                  active ? 'bg-slate-900 text-white' : done ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50',
                ].join(' ')}
              >
                {done ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
                {section.title.split(' & ')[0]}
              </button>
            )
          })}
        </div>

        {/* Section Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-0.5">
                <SectionIcon className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-slate-900">{currentSection.title}</h3>
              </div>
              {currentSection.subtitle && (
                <p className="text-xs text-slate-400 ml-6">{currentSection.subtitle}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {currentSection.fields.map((field) => {
                // Facility-type gate
                if (field.facilityTypes && field.facilityTypes.length > 0) {
                  if (!field.facilityTypes.includes(facilityType)) return null
                }

                const colClass = field.colSpan === 2 ? 'col-span-2' : 'col-span-1'

                // Special renderers
                if (field.type === 'dependent_list') {
                  return (
                    <div key={field.id} className={colClass}>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">{field.label}</label>
                      <DependentListRenderer items={dependents} onChange={setDependents} />
                      {field.helpText && (
                        <p className="text-[11px] text-slate-400 mt-1">{field.helpText}</p>
                      )}
                    </div>
                  )
                }

                if (field.type === 'emergency_contact') {
                  const isFirst = field.id === 'emergencyContact1'
                  return (
                    <div key={field.id} className={colClass}>
                      <EmergencyContactRenderer
                        label={field.label}
                        value={isFirst ? ec1 : ec2}
                        onChange={isFirst ? setEc1 : setEc2}
                      />
                    </div>
                  )
                }

                return (
                  <div key={field.id} className={colClass}>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {field.label}
                      {field.required && <span className="text-rose-500 ml-0.5">*</span>}
                    </label>
                    <FieldRenderer
                      field={field}
                      value={formValues[field.id]}
                      onChange={(val) => setField(field.id, val)}
                      facilityType={facilityType}
                    />
                    {field.helpText && (
                      <p className="text-[11px] text-slate-400 mt-1">{field.helpText}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => stepIndex > 0 && setStepIndex(stepIndex - 1)}
              disabled={stepIndex === 0}
              className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold disabled:opacity-30 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Previous
            </button>

            <span className="text-[11px] text-slate-400 font-mono">
              Step {stepIndex + 1} of {totalSteps} · Schema {activeSchema.version}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {stepIndex < totalSteps - 1 ? (
                  <>Next <ChevronRight className="h-3.5 w-3.5" /></>
                ) : (
                  <>Complete Onboarding <Check className="h-3.5 w-3.5" /></>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
