import React, { createContext, useContext, ReactNode, useMemo } from 'react'
import { useAuth } from '../auth/auth-context'

export interface Permission {
  module: string
  action: string // 'read', 'write', 'delete', 'admin'
  resource?: string // optional specific resource
}

export interface PermissionContextType {
  hasPermission: (module: string, action: string, resource?: string) => boolean
  hasAnyPermission: (permissions: Permission[]) => boolean
  hasAllPermissions: (permissions: Permission[]) => boolean
  userPermissions: Permission[]
}

const PermissionContext = createContext<PermissionContextType | null>(null)

export function PermissionProvider({ children }: { children: ReactNode }) {
  const { user, tenant } = useAuth()

  const userPermissions = useMemo(() => {
    if (!user || !tenant) return []
    
    // In a real app, this would be fetched from an API
    // For now, we'll derive permissions from roles
    const permissions: Permission[] = []
    
    user.roles.forEach((role) => {
      switch (role.toLowerCase()) {
        case 'admin':
          permissions.push(
            { module: '*', action: '*' } // Admin has all permissions
          )
          break
        case 'financial_manager':
          permissions.push(
            { module: 'financial', action: 'read' },
            { module: 'financial', action: 'write' },
            { module: 'financial', action: 'admin' }
          )
          break
        case 'financial_user':
          permissions.push(
            { module: 'financial', action: 'read' },
            { module: 'financial', action: 'write' }
          )
          break
        case 'workflow_admin':
          permissions.push(
            { module: 'workflow', action: 'read' },
            { module: 'workflow', action: 'write' },
            { module: 'workflow', action: 'admin' }
          )
          break
        case 'user':
          permissions.push(
            { module: 'dashboard', action: 'read' }
          )
          break
        default:
          break
      }
    })
    
    return permissions
  }, [user, tenant])

  const hasPermission = (module: string, action: string, resource?: string) => {
    if (!user) return false
    
    // Check for wildcard permissions (admin)
    const hasWildcard = userPermissions.some(
      (p) => (p.module === '*' && p.action === '*')
    )
    if (hasWildcard) return true

    // Check specific permissions
    return userPermissions.some((p) => {
      const moduleMatch = p.module === module || p.module === '*'
      const actionMatch = p.action === action || p.action === '*'
      const resourceMatch = !resource || !p.resource || p.resource === resource
      
      return moduleMatch && actionMatch && resourceMatch
    })
  }

  const hasAnyPermission = (permissions: Permission[]) => {
    return permissions.some((p) => hasPermission(p.module, p.action, p.resource))
  }

  const hasAllPermissions = (permissions: Permission[]) => {
    return permissions.every((p) => hasPermission(p.module, p.action, p.resource))
  }

  const value = {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    userPermissions,
  }

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  )
}

export function usePermissions() {
  const context = useContext(PermissionContext)
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionProvider')
  }
  return context
}