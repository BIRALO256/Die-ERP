import { type ReactNode } from 'react'
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

// Zustand Store
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
      login: (user, tenant, token) =>
        set({
          user,
          tenant,
          token,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          tenant: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setUser: (user) => set({ user }),

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

// Context for component access
const AuthContext = createContext<AuthState & AuthActions | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthStore()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}