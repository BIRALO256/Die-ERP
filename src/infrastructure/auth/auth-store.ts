import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Auth Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  roles: string[]
  tenantId: string
}

export interface Tenant {
  id: string
  name: string
  slug: string
  plan: string
  settings: Record<string, any>
}

export interface AuthState {
  user: User | null
  tenant: Tenant | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
}

export interface AuthActions {
  login: (user: User, tenant: Tenant, token: string) => void
  logout: () => void
  setUser: (user: User) => void
  setTenant: (tenant: Tenant) => void
  setLoading: (loading: boolean) => void
}

// Pure Zustand Store - No Context needed
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      tenant: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,

      // Actions
      login: (user, tenant, token) => {
        set({
          user,
          tenant,
          token,
          isAuthenticated: true,
          isLoading: false,
        })
        
        // Refresh permissions after login
        setTimeout(() => {
          const { usePermissionStore } = require('../permissions/permission-store')
          usePermissionStore.getState().refreshPermissions(user.roles)
        }, 0)
      },

      logout: () => {
        set({
          user: null,
          tenant: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
        
        // Clear permissions on logout
        setTimeout(() => {
          const { usePermissionStore } = require('../permissions/permission-store')
          usePermissionStore.getState().refreshPermissions([])
        }, 0)
      },

      setUser: (user) => {
        set({ user })
        
        // Refresh permissions when user changes
        setTimeout(() => {
          const { usePermissionStore } = require('../permissions/permission-store')
          usePermissionStore.getState().refreshPermissions(user.roles)
        }, 0)
      },

      setTenant: (tenant) => set({ tenant }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        tenant: state.tenant,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)