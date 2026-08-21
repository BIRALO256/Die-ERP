// ============================================================
// EMPLOYEE CORE TYPES
// ============================================================
export type Gender = 'MALE' | 'FEMALE' | 'OTHER'
export type MaritalStatus = 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED' | 'SEPARATED'
export type EmploymentStatus = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT'
export type EmploymentType = 'PERMANENT' | 'EXPATRIATE' | 'SEASONAL'
export type EmployeeStatus = 'ACTIVE' | 'ON_LEAVE' | 'SUSPENDED' | 'TERMINATED'
export type RelationshipType = 'SPOUSE' | 'CHILD' | 'PARENT' | 'SIBLING' | 'LEGAL_DEPENDENT' | 'OTHER'
export type CertType =
  | 'GMP_CLEANROOM'
  | 'GCP_CLINICAL'
  | 'GAP_ORGANIC'
  | 'BSL3_BIOHAZARD'
  | 'MEDICAL_LICENSE'
  | 'ASEPTIC_GOWNING'
  | '21_CFR_PART_11'
export type CertStatus = 'VALID' | 'EXPIRING_SOON' | 'EXPIRED'

// ============================================================
// DYNAMIC FORM SCHEMA TYPES
// (Schema-driven, versioned employee registration form)
// ============================================================

/** Supported field input types in the form renderer */
export type FormFieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'date'
  | 'number'
  | 'textarea'
  | 'select'
  | 'dependent_list'   // Renders the dynamic children/dependents table
  | 'emergency_contact' // Renders an emergency contact block

/** One option within a select field */
export interface FormFieldOption {
  value: string
  label: string
}

/**
 * A single field definition inside a form section.
 * Adding a field here automatically renders it in the modal
 * and captures its value — no hardcoded JSX needed.
 */
export interface FormField {
  id: string           // Maps to the key in formValues / Employee
  label: string
  type: FormFieldType
  placeholder?: string
  required?: boolean
  options?: FormFieldOption[]
  /** Help text shown below the input */
  helpText?: string
  /** Default value pre-filled in the form */
  defaultValue?: string
  /**
   * If set, this field ONLY renders when the active facility type
   * matches one of these strings. Empty/undefined = always shown.
   */
  facilityTypes?: string[]
  /** Column span within the 2-col grid: 1 (half) or 2 (full). Default 1. */
  colSpan?: 1 | 2
}

/** A named section of the form — rendered as one wizard step */
export interface FormSection {
  id: string
  title: string
  subtitle?: string
  /** Lucide icon name string (used for display, not dynamic import) */
  iconName?: string
  fields: FormField[]
}

/** The versioned root schema — one version per HR form revision */
export interface FormSchema {
  version: string          // e.g. 'v1.0'
  title?: string            // e.g. 'Standard WHO GMP Bio-Data'
  effectiveDate: string    // ISO date the version was adopted
  description?: string
  sections: FormSection[]
}

// ============================================================
// EMPLOYEE SUB-COLLECTIONS
// ============================================================
export interface Dependent {
  id: string
  fullName: string
  relationshipType: RelationshipType
  dateOfBirth?: string
  age?: number
  gender?: Gender
  phoneNumber?: string
  isEmergencyContact?: boolean
}

export interface EmergencyContact {
  id: string
  priority: 1 | 2
  contactName: string
  relationship: string
  primaryPhone: string
  alternatePhone?: string
}

export interface EducationRecord {
  id: string
  degreeTitle: string
  institution: string
  graduationYear: number
  gradeClassification?: string
}

export interface EmploymentHistory {
  id: string
  previousEmployer: string
  jobTitle: string
  durationFromTo: string
  keyResponsibilities?: string
}

export interface EmployeeCertification {
  id: string
  certType: CertType
  certName: string
  issuingBody: string
  licenseNumber: string
  issueDate: string
  expiryDate: string
  verificationStatus: CertStatus
}

export interface ShiftSchedule {
  id: string
  shiftCode: 'SHIFT_A_MORNING' | 'SHIFT_B_EVENING' | 'SHIFT_C_NIGHT'
  shiftLabel: string
  timeRange: string
  productionLine: string
  status: 'SCHEDULED' | 'ON_DUTY' | 'COMPLETED' | 'ABSENT'
}

// ============================================================
// MAIN EMPLOYEE RECORD
// ============================================================
export interface Employee {
  id: string
  employeeNumber: string
  userId?: string
  organizationUnitId: string
  facilityName: string

  // Personal Bio-Data (mapped from form fields)
  fullName: string
  nationalIdNin: string
  dateOfBirth: string
  gender: Gender
  maritalStatus: MaritalStatus
  placeOfResidence: string
  city: string
  phoneNumber: string
  personalEmail: string
  languagesSpoken: string[]

  // Job & Organization
  jobTitle: string
  department: string
  managerSupervisorId?: string
  managerSupervisorName?: string
  hireDate: string
  employmentStatus: EmploymentStatus
  employmentType: EmploymentType
  baseCurrency: 'USD' | 'UGX'
  baseSalary: number
  hazardAllowance: number
  status: EmployeeStatus

  // Facility-Adaptive Compliance
  cleanroomGowningGrade?: string
  biosafetyLevel?: string
  medicalLicenseNo?: string
  agriculturalZone?: string

  // Sub-collections
  dependents: Dependent[]
  emergencyContacts: EmergencyContact[]
  educationRecords: EducationRecord[]
  employmentHistory: EmploymentHistory[]
  certifications: EmployeeCertification[]
  currentShift?: ShiftSchedule

  // Form versioning metadata
  formVersion: string      // Which FormSchema version was used to capture this record
  /**
   * Any fields that existed in a future schema version but not in formVersion
   * are stored here as a flat key-value bag — the JSONB equivalent.
   */
  customFields?: Record<string, any>

  createdAt: string
  updatedAt: string
}

// ============================================================
// PAYROLL TYPES
// ============================================================
export interface Payslip {
  id: string
  payrollRunId: string
  employeeId: string
  employeeNumber: string
  employeeName: string
  nationalIdNin: string
  jobTitle: string
  department: string
  facilityId: string
  facilityName: string
  currency: 'USD' | 'UGX'
  baseSalary: number
  hazardAllowance: number
  overtimeAllowance: number
  grossPay: number
  nssfEmployeeDeduction: number
  nssfEmployerContribution: number
  payeTaxDeduction: number
  localServiceTax: number
  otherDeductions: number
  totalDeductions: number
  netPay: number
  paymentMethod: 'BANK_TRANSFER' | 'MOBILE_MONEY'
  bankName?: string
  bankAccountNo?: string
  mobileMoneyNumber?: string
  status: 'GENERATED' | 'PAID'
  disbursedAt?: string
}

export interface PayrollRun {
  id: string
  batchNumber: string
  organizationUnitId: string
  facilityName: string
  periodMonthYear: string
  currency: 'USD' | 'UGX'
  totalEmployeesCount: number
  totalGrossPay: number
  totalNssfEmployer: number
  totalNssfEmployee: number
  totalPayeTax: number
  totalNetDisbursed: number
  status: 'DRAFT' | 'REVIEWED' | 'APPROVED' | 'DISBURSED'
  createdAt: string
  processedAt?: string
  payslips: Payslip[]
}
