export type FacilityType = 
  | 'MANUFACTURING'
  | 'CLINICAL'
  | 'AGRICULTURE'
  | 'LOGISTICS'
  | 'CORPORATE'

export type ComplianceLevel = 
  | 'WHO_GMP_GRADE_A'
  | 'EU_GMP'
  | 'ISO_9001'
  | 'CLINICAL_TRIAL_GCP'
  | 'ORGANIC_GAP'
  | 'STANDARD'

export type FacilityStatus = 
  | 'ACTIVE'
  | 'MAINTENANCE_SHUTDOWN'
  | 'AUDIT_HOLD'
  | 'DEVIATION_MONITORED'

export interface Facility {
  id: string
  name: string
  shortName: string
  code: string
  type: FacilityType
  location: string
  region: string
  isGmpCertified: boolean
  complianceLevel: ComplianceLevel
  status: FacilityStatus
  statusLabel: string
  currency: string
  timezone: string
  activeLinesCount?: number
  staffOnDuty?: number
  badgeText?: string
  headlineStatus?: string
}
