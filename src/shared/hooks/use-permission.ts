import { useFacilityStore } from '../stores/facility-store'
import { useAuthStore } from '../../infrastructure/auth/auth-store'
import type { PermissionAction, FacilityMembership } from '../types/permission'

export interface UsePermissionReturn {
  can: (action: PermissionAction) => boolean
  canAny: (actions: PermissionAction[]) => boolean
  canAll: (actions: PermissionAction[]) => boolean
  hasRole: (roleIdOrTitle: string) => boolean
  membership: FacilityMembership | undefined
  roleTitle: string
  clearanceLevel: string
  clearanceBadgeText: string
  isGlobalSuperAdmin: boolean
  activeFacilityId: string
}

export function usePermission(): UsePermissionReturn {
  const { activeFacilityId } = useFacilityStore()
  const { user, getUserMembership } = useAuthStore()

  const membership = getUserMembership(activeFacilityId)
  const isGlobalSuperAdmin = Boolean(user?.isGlobalSuperAdmin)

  const can = (action: PermissionAction): boolean => {
    if (!user) return false
    if (isGlobalSuperAdmin) return true
    if (!membership) return false

    if (membership.permissions.includes('admin:*')) return true
    return membership.permissions.includes(action)
  }

  const canAny = (actions: PermissionAction[]): boolean => {
    return actions.some((action) => can(action))
  }

  const canAll = (actions: PermissionAction[]): boolean => {
    return actions.every((action) => can(action))
  }

  const hasRole = (roleIdOrTitle: string): boolean => {
    if (!membership) return false
    return (
      membership.roleId.toLowerCase() === roleIdOrTitle.toLowerCase() ||
      membership.roleTitle.toLowerCase() === roleIdOrTitle.toLowerCase()
    )
  }

  return {
    can,
    canAny,
    canAll,
    hasRole,
    membership,
    roleTitle: membership?.roleTitle || 'Observer',
    clearanceLevel: membership?.clearanceLevel || 'STANDARD',
    clearanceBadgeText: membership?.clearanceBadgeText || 'Standard Access',
    isGlobalSuperAdmin,
    activeFacilityId,
  }
}
