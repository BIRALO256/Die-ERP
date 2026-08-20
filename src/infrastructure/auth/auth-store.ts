import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, FacilityMembership } from '../../shared/types/permission'

export const DEFAULT_USER: UserProfile = {
  id: 'usr_sarah_nakato_01',
  name: 'Dr. Sarah Nakato',
  email: 'sarah.nakato@deibiopharma.com',
  isGlobalSuperAdmin: false,
  memberships: [
    {
      facilityId: 'fac_matugga',
      roleId: 'role_qa_director',
      roleTitle: 'QA Director & Lead Bioprocess Scientist',
      department: 'Quality Assurance & Manufacturing',
      clearanceLevel: 'TIER_1_GMP',
      clearanceBadgeText: 'Tier 1 GMP Clearance',
      permissions: [
        'batch:create',
        'batch:read',
        'batch:edit',
        'batch:release_qc',
        'bioreactor:control',
        'cleanroom:access',
        'hr:verify_gmp_cert',
        'procurement:create_po',
        'procurement:approve_po',
        'procurement:manage_vendors',
        'hr:view_employees',
        'finance:view_accounts',
        'finance:export_reports',
      ],
      isPrimary: true,
    },
    {
      facilityId: 'fac_kakiika',
      roleId: 'role_clinical_monitor',
      roleTitle: 'Clinical Research Monitor',
      department: 'Oncology & Clinical Trials',
      clearanceLevel: 'TIER_2_CLINICAL',
      clearanceBadgeText: 'GCP Clinical Access',
      permissions: [
        'clinical:view_trials',
        'clinical:inspect_assays',
        'batch:read',
        'hr:view_employees',
        'finance:view_accounts',
      ],
    },
    {
      facilityId: 'fac_nakaseke',
      roleId: 'role_agro_inspector',
      roleTitle: 'Botanical Quality Inspector',
      department: 'Agricultural Raw Extraction',
      clearanceLevel: 'TIER_3_OPERATIONS',
      clearanceBadgeText: 'GAP Organic Inspection',
      permissions: [
        'agro:log_harvest',
        'agro:inspect_yield',
        'batch:read',
        'hr:view_employees',
      ],
    },
    {
      facilityId: 'fac_corporate',
      roleId: 'role_exec_observer',
      roleTitle: 'Executive Board Observer',
      department: 'Corporate Governance & Treasury',
      clearanceLevel: 'STANDARD',
      clearanceBadgeText: 'Executive Governance',
      permissions: [
        'global:executive_view',
        'finance:view_accounts',
        'finance:export_reports',
        'hr:view_employees',
        'batch:read',
      ],
    },
  ],
}

export interface Tenant {
  id: string
  name: string
  slug: string
  plan: string
  settings: Record<string, any>
}

export interface AuthState {
  user: UserProfile | null
  tenant: Tenant | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
}

export interface AuthActions {
  login: (user: UserProfile, tenant: Tenant, token: string) => void
  logout: () => void
  setUser: (user: UserProfile) => void
  setTenant: (tenant: Tenant) => void
  setLoading: (loading: boolean) => void
  getUserMembership: (facilityId: string) => FacilityMembership | undefined
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      tenant: {
        id: 'tnt_dei_global',
        name: 'Dei BioPharma Group Ltd',
        slug: 'dei-biopharma',
        plan: 'Enterprise GMP',
        settings: {},
      },
      isAuthenticated: true,
      isLoading: false,
      token: 'jwt_mock_token_sarah_nakato_2026',

      login: (user, tenant, token) => {
        set({
          user,
          tenant,
          token,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      logout: () => {
        set({
          user: null,
          tenant: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },

      setUser: (user) => set({ user }),
      setTenant: (tenant) => set({ tenant }),
      setLoading: (isLoading) => set({ isLoading }),

      getUserMembership: (facilityId: string) => {
        const { user } = get()
        if (!user) return undefined
        return user.memberships.find((m) => m.facilityId === facilityId)
      },
    }),
    {
      name: 'dei-auth-storage',
      partialize: (state) => ({
        user: state.user,
        tenant: state.tenant,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)