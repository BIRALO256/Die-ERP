import { create } from 'zustand'

export interface Permission {
  module: string
  action: string // 'read', 'write', 'delete', 'admin'
  resource?: string // optional specific resource
}

export interface PermissionState {
  permissions: Permission[]
}

export interface PermissionActions {
  hasPermission: (module: string, action: string, resource?: string) => boolean
  hasAnyPermission: (permissions: Permission[]) => boolean
  hasAllPermissions: (permissions: Permission[]) => boolean
  refreshPermissions: (userRoles?: string[]) => void
}

export const usePermissionStore = create<PermissionState & PermissionActions>((set, get) => ({
  permissions: [],

  hasPermission: (module: string, action: string, resource?: string) => {
    const { permissions } = get()
    
    // Check for wildcard permissions (admin)
    const hasWildcard = permissions.some(
      (p) => (p.module === '*' && p.action === '*')
    )
    if (hasWildcard) return true

    // Check specific permissions
    return permissions.some((p) => {
      const moduleMatch = p.module === module || p.module === '*'
      const actionMatch = p.action === action || p.action === '*'
      const resourceMatch = !resource || !p.resource || p.resource === resource
      
      return moduleMatch && actionMatch && resourceMatch
    })
  },

  hasAnyPermission: (permissions: Permission[]) => {
    const { hasPermission } = get()
    return permissions.some((p) => hasPermission(p.module, p.action, p.resource))
  },

  hasAllPermissions: (permissions: Permission[]) => {
    const { hasPermission } = get()
    return permissions.every((p) => hasPermission(p.module, p.action, p.resource))
  },

  refreshPermissions: (userRoles?: string[]) => {
    if (!userRoles || userRoles.length === 0) {
      set({ permissions: [] })
      return
    }

    // Derive permissions from roles
    const permissions: Permission[] = []
    
    userRoles.forEach((role) => {
      switch (role.toLowerCase()) {
        case 'admin':
          permissions.push({ module: '*', action: '*' })
          break
        case 'financial_manager':
          permissions.push(
            { module: 'finance', action: 'read' },
            { module: 'finance', action: 'write' },
            { module: 'finance', action: 'admin' }
          )
          break
        case 'hr_manager':
          permissions.push(
            { module: 'hr', action: 'read' },
            { module: 'hr', action: 'write' },
            { module: 'hr', action: 'admin' }
          )
          break
        case 'procurement_manager':
          permissions.push(
            { module: 'procurement', action: 'read' },
            { module: 'procurement', action: 'write' },
            { module: 'procurement', action: 'admin' }
          )
          break
        case 'financial_user':
          permissions.push(
            { module: 'finance', action: 'read' },
            { module: 'finance', action: 'write' }
          )
          break
        default:
          permissions.push({ module: 'dashboard', action: 'read' })
          break
      }
    })
    
    set({ permissions })
  },
}))