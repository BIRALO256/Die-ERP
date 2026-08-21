export type ClearanceLevel = 
  | 'TIER_1_GMP' 
  | 'TIER_2_CLINICAL' 
  | 'TIER_3_OPERATIONS'
  | 'STANDARD'

export type PermissionAction =
  // Manufacturing & MES
  | 'batch:create'
  | 'batch:read'
  | 'batch:edit'
  | 'batch:release_qc'
  | 'bioreactor:control'
  | 'cleanroom:access'
  // Clinical Trials
  | 'clinical:view_trials'
  | 'clinical:edit_protocol'
  | 'clinical:inspect_assays'
  // Bio-Agro & Extraction
  | 'agro:log_harvest'
  | 'agro:inspect_yield'
  // Procurement & Supply Chain
  | 'procurement:create_po'
  | 'procurement:approve_po'
  | 'procurement:manage_vendors'
  // Human Capital & HR
  | 'hr:view_employees'
  | 'hr:create_employee'
  | 'hr:view_payroll'
  | 'hr:verify_gmp_cert'
  // Finance & Treasury
  | 'finance:view_accounts'
  | 'finance:post_journal'
  | 'finance:export_reports'
  // Global & Admin
  | 'global:executive_view'
  | 'admin:*'

export interface FacilityMembership {
  facilityId: string
  roleId: string
  roleTitle: string
  department: string
  clearanceLevel: ClearanceLevel
  clearanceBadgeText: string
  permissions: PermissionAction[]
  isPrimary?: boolean
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  isGlobalSuperAdmin?: boolean
  memberships: FacilityMembership[]
}
